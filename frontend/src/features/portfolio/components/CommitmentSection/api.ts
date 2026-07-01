import type { CommitAuthor, CommitData, CommitLevel, GitHubUser, HeatmapData, MonthData, Parent, Verification } from './types'
import { CONTRIB_API, GITHUB_USER, REVALIDATE_SECONDS } from './constants'

function computeLevel(count: number, max: number): CommitLevel {
    if (count === 0 || max === 0) return 0
    const ratio = count / max
    if (ratio <= 0.25) return 1
    if (ratio <= 0.5) return 2
    if (ratio <= 0.75) return 3
    return 4
}

export async function getMonthlyCommits(): Promise<HeatmapData | null> {
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

export async function getLastCommit(): Promise<CommitData | null> {
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
            commit: {
                message: string
                author: CommitAuthor
                committer: CommitAuthor
                comment_count: number
            }
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
