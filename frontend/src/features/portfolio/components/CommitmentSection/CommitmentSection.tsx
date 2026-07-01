import styles from './CommitmentSection.module.css'
import { CommitCardClient, type CommitData } from './CommitCardClient'
import { MonthlyHeatmap } from './MonthlyHeatmap'

interface CommitAuthor {
    name: string
    email: string
    date: string
}

interface GitHubUser {
    login: string
    html_url: string
    avatar_url: string
    type: string
    site_admin: boolean
}

interface Parent {
    sha: string
    html_url: string
}

interface Verification {
    verified: boolean
    reason: string
}

interface CommitDetail {
    sha: string
    message: string
    author: CommitAuthor
    committer: CommitAuthor
    authorUser: GitHubUser | null
    committerUser: GitHubUser | null
    commentCount: number
    verification: Verification | null
    parents: Parent[]
    url: string
    repo: string
    additions: number
    deletions: number
}

const GITHUB_USER = 'sumitjhaa'
const REVALIDATE_SECONDS = 300
const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`

interface MonthData {
    year: number
    month: number
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

interface HeatmapData {
    years: number[]
    months: MonthData[]
    maxCount: number
    totalCommits: number
}

function computeLevel(count: number, max: number): 0 | 1 | 2 | 3 | 4 {
    if (count === 0) return 0
    if (max === 0) return 0
    const ratio = count / max
    if (ratio <= 0.25) return 1
    if (ratio <= 0.5) return 2
    if (ratio <= 0.75) return 3
    return 4
}

async function getMonthlyCommits(): Promise<HeatmapData | null> {
    try {
        const res = await fetch(CONTRIB_API, { next: { revalidate: REVALIDATE_SECONDS } })
        if (!res.ok) return null
        const json = (await res.json()) as {
            contributions?: Array<{ date: string; count: number }>
        }
        const contributions = json.contributions
        if (!Array.isArray(contributions) || !contributions.length) return null

        const monthlyMap = new Map<string, number>()
        for (const c of contributions) {
            const d = new Date(c.date)
            const key = `${d.getFullYear()}-${d.getMonth()}`
            monthlyMap.set(key, (monthlyMap.get(key) ?? 0) + c.count)
        }

        let maxCount = 0
        let totalCommits = 0
        const yearSet = new Set<number>()
        const months: MonthData[] = []

        for (const [key, count] of monthlyMap) {
            const [yearStr, monthStr] = key.split('-')
            const year = parseInt(yearStr, 10)
            const month = parseInt(monthStr, 10)
            yearSet.add(year)
            totalCommits += count
            if (count > maxCount) maxCount = count
            months.push({ year, month, count, level: 0 })
        }

        for (const m of months) {
            m.level = computeLevel(m.count, maxCount)
        }

        const years = Array.from(yearSet).sort((a, b) => a - b)

        return { years, months, maxCount, totalCommits }
    } catch {
        return null
    }
}

async function getLastCommit(): Promise<CommitDetail | null> {
    try {
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=1&type=owner`,
            { next: { revalidate: REVALIDATE_SECONDS } },
        )
        if (!reposRes.ok) return null
        const repos = (await reposRes.json()) as Array<{ full_name: string }>
        if (!repos.length) return null
        const repo = repos[0]

        const commitsRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits?per_page=1`,
            { next: { revalidate: REVALIDATE_SECONDS } },
        )
        if (!commitsRes.ok) return null
        const commits = (await commitsRes.json()) as Array<{
            sha: string
            html_url: string
            commit: { message: string; author: CommitAuthor; committer: CommitAuthor; comment_count: number }
            author: GitHubUser | null
            committer: GitHubUser | null
            parents: Parent[]
        }>
        if (!commits.length) return null
        const commit = commits[0]

        const detailRes = await fetch(
            `https://api.github.com/repos/${repo.full_name}/commits/${commit.sha}`,
            { next: { revalidate: REVALIDATE_SECONDS } },
        )
        const detail = detailRes.ok
            ? ((await detailRes.json()) as {
                  verification?: Verification
                  stats?: { additions?: number; deletions?: number }
              })
            : null

        return {
            sha: commit.sha,
            message: commit.commit.message,
            author: commit.commit.author,
            committer: commit.commit.committer,
            authorUser: commit.author,
            committerUser: commit.committer,
            commentCount: commit.commit.comment_count,
            verification: detail?.verification ?? null,
            parents: commit.parents,
            url: commit.html_url,
            repo: repo.full_name,
            additions: detail?.stats?.additions ?? 0,
            deletions: detail?.stats?.deletions ?? 0,
        }
    } catch {
        return null
    }
}

function formatRelative(dateString: string): string {
    const then = new Date(dateString).getTime()
    const now = Date.now()
    const diff = now - then
    const min = Math.floor(diff / 60_000)
    const hr = Math.floor(min / 60)
    const day = Math.floor(hr / 24)
    const week = Math.floor(day / 7)
    const month = Math.floor(day / 30)
    const year = Math.floor(day / 365)

    if (year > 0) return `${year} year${year > 1 ? 's' : ''} ago`
    if (month > 0) return `${month} month${month > 1 ? 's' : ''} ago`
    if (week > 0) return `${week} week${week > 1 ? 's' : ''} ago`
    if (day > 0) return `${day} day${day > 1 ? 's' : ''} ago`
    if (hr > 0) return `${hr} hour${hr > 1 ? 's' : ''} ago`
    if (min > 0) return `${min} minute${min > 1 ? 's' : ''} ago`
    return 'just now'
}

function formatAbsolute(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function CommitCard({ commit }: { commit: CommitData }) {
    return <CommitCardClient initial={commit} />
}

export default async function CommitmentSection() {
    const [commit, heatmap] = await Promise.all([getLastCommit(), getMonthlyCommits()])

    return (
        <section id="commitment" className={styles.page}>
            <h1 className={styles.heading}>Very Committed</h1>
            <div className={styles.scrollArea}>
            {commit ? (
                <CommitCard commit={commit} />
            ) : (
                    <p className={styles.fallback}>
                        Couldn&apos;t fetch the latest commit right now.{' '}
                        <a
                            href={`https://github.com/${GITHUB_USER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            See activity on GitHub →
                        </a>
                    </p>
                )}

                {heatmap ? (
                    <MonthlyHeatmap data={heatmap} />
                ) : (
                    <p className={styles.heatmapFallback}>
                        Contribution data unavailable right now.{' '}
                        <a
                            href={`https://github.com/${GITHUB_USER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on GitHub →
                        </a>
                    </p>
                )}
            </div>
        </section>
    )
}
