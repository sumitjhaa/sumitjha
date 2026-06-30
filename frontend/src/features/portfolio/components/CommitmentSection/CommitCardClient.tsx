'use client'

import { useEffect, useRef, useState } from 'react'
import { GitHubAvatar } from './GitHubAvatar'
import styles from './CommitmentSection.module.css'

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

export interface CommitData {
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

const CACHE_KEY = 'commitment-last-commit-v1'
const PARENT_CACHE_PREFIX = 'commitment-parent-commit-'
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

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

interface CachedCommit {
    fetchedAt: number
    commit: CommitData
}

function loadCachedCommit(): CommitData | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as CachedCommit
        if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null
        return parsed.commit
    } catch {
        return null
    }
}

function saveCachedCommit(commit: CommitData) {
    if (typeof window === 'undefined') return
    try {
        const data: CachedCommit = { fetchedAt: Date.now(), commit }
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch {
        // localStorage may be full or disabled
    }
}

interface CachedParentStats {
    fetchedAt: number
    additions: number
    deletions: number
}

function loadCachedParentStats(sha: string): CachedParentStats | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(PARENT_CACHE_PREFIX + sha)
        if (!raw) return null
        const parsed = JSON.parse(raw) as CachedParentStats
        if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null
        return parsed
    } catch {
        return null
    }
}

function saveCachedParentStats(sha: string, additions: number, deletions: number) {
    if (typeof window === 'undefined') return
    try {
        const data: CachedParentStats = { fetchedAt: Date.now(), additions, deletions }
        localStorage.setItem(PARENT_CACHE_PREFIX + sha, JSON.stringify(data))
    } catch {
        // ignore
    }
}

async function fetchParentStats(
    repo: string,
    parentSha: string,
): Promise<{ additions: number; deletions: number } | null> {
    const cached = loadCachedParentStats(parentSha)
    if (cached) return { additions: cached.additions, deletions: cached.deletions }

    try {
        const res = await fetch(
            `https://api.github.com/repos/${repo}/commits/${parentSha}`,
            { headers: { Accept: 'application/vnd.github+json' } },
        )
        if (!res.ok) {
            // 403/429 = rate limited, 404 = repo or commit not found
            return null
        }
        const data = (await res.json()) as {
            stats?: { additions?: number; deletions?: number }
        }
        const additions = data.stats?.additions ?? 0
        const deletions = data.stats?.deletions ?? 0
        saveCachedParentStats(parentSha, additions, deletions)
        return { additions, deletions }
    } catch {
        return null
    }
}

/** Animates a number from 0 → target over `duration` ms, respecting reduced motion. */
function useCountUp(target: number, duration = 900, delay = 500): number {
    const [value, setValue] = useState(0)
    const rafRef = useRef<number | undefined>(undefined)
    const startRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        if (prefersReduced) {
            setValue(target)
            return
        }

        const tick = (now: number) => {
            if (startRef.current === undefined) startRef.current = now
            const elapsed = now - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out-cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        const startTimer = setTimeout(() => {
            rafRef.current = requestAnimationFrame(tick)
        }, delay)

        return () => {
            clearTimeout(startTimer)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [target, duration, delay])

    return value
}

export function CommitCardClient({ initial }: { initial: CommitData }) {
    // Use cached data on first render if available, then sync to initial
    const [commit, setCommit] = useState<CommitData>(() => loadCachedCommit() ?? initial)

    // Keep cache fresh — update if the server-provided data is newer
    useEffect(() => {
        const cached = loadCachedCommit()
        // If no cache or cache is older than server data, use server data and save it
        if (!cached) {
            saveCachedCommit(initial)
            setCommit(initial)
        } else {
            // Keep cache, but also save server data in case it has fresher fields
            saveCachedCommit(initial)
        }
    }, [initial])

    const lines = commit.message.split('\n')
    const title = lines[0]
    const body = lines.slice(1).join('\n').trim()
    const shortSha = commit.sha.slice(0, 7)
    const isMerge = commit.parents.length > 1
    const showCommitter =
        commit.committer.email !== commit.author.email || commit.committer.name !== commit.author.name
    const commentCount = commit.commentCount

    // Truncate long commit titles so they don't break the layout
    const MESSAGE_MAX_LEN = 120
    const truncatedTitle =
        title.length > MESSAGE_MAX_LEN ? title.slice(0, MESSAGE_MAX_LEN).trimEnd() + '…' : title

    // Count-up animations for the inline branch stats
    const animatedAdditions = useCountUp(commit.additions, 900, 550)
    const animatedDeletions = useCountUp(commit.deletions, 900, 600)

    // Parent stats fetching removed — kept the helpers for potential future use
    void loadCachedParentStats
    void fetchParentStats

    return (
        <article className={styles.card}>
            <div className={styles.cardInner}>
                {/* RIGHT side: identity (avatar + username) */}
                <aside className={styles.rightColumn}>
                    {commit.authorUser && (
                        <a
                            href={commit.authorUser.html_url}
                            className={styles.avatarLinkRight}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${commit.author.name} on GitHub`}
                        >
                            <GitHubAvatar
                                src={commit.authorUser.avatar_url}
                                fallback={commit.authorUser.login}
                                username={commit.authorUser.login}
                                fullName={commit.author.name}
                            />
                        </a>
                    )}
                    <div className={styles.identityTextRight}>
                        <div className={styles.identityNameRight}>{commit.author.name}</div>
                        {commit.authorUser && (
                            <a
                                href={commit.authorUser.html_url}
                                className={styles.identityHandleRight}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @{commit.authorUser.login}
                                {commit.authorUser.site_admin && (
                                    <span className={styles.staff} title="GitHub Staff">
                                        ★
                                    </span>
                                )}
                            </a>
                        )}
                        {showCommitter && (
                            <div className={styles.committerRight}>
                                <span className={styles.committerSep} aria-hidden="true">
                                    ↳
                                </span>
                                <span className={styles.committerName}>
                                    {commit.committer.name}
                                </span>
                            </div>
                        )}
                    </div>
                </aside>

                {/* LEFT side: commit data (message, body, time, branch) */}
                <main className={styles.leftColumn}>
                    {/* "Last commit" label with time on the same line */}
                    <div className={styles.headerRow}>
                        <div className={styles.lastCommitLabel}>last commit</div>
                        <time
                            className={styles.time}
                            dateTime={commit.author.date}
                            title={formatAbsolute(commit.author.date)}
                        >
                            {formatRelative(commit.author.date)}
                        </time>
                    </div>

                    {/* Message (primary) */}
                    <a
                        href={commit.url}
                        className={styles.message}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                    >
                        <span className={styles.messageText}>{truncatedTitle}</span>
                    </a>

                    {body && <p className={styles.body}>{body}</p>}

                    {/* Commit chain (compact list, no graph column) */}
                    <div className={styles.branch}>
                        <div className={styles.branchRow}>
                            <a
                                href={commit.url}
                                className={styles.branchSha}
                                data-current="true"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {shortSha}
                            </a>
                            <span className={styles.branchStats}>
                                <span className={`${styles.branchStatPos} ${styles.branchStatDoto}`}>
                                    +{animatedAdditions}
                                </span>
                                <span className={`${styles.branchStatNeg} ${styles.branchStatDoto}`}>
                                    −{animatedDeletions}
                                </span>
                            </span>
                        </div>
                        {commit.parents.map((p, i) => (
                            <div key={p.sha} className={styles.branchRow}>
                                <a
                                    href={p.html_url}
                                    className={styles.branchSha}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {p.sha.slice(0, 7)}
                                </a>
                                <span className={styles.branchLabel}>
                                    {commit.parents.length > 1 ? `parent ${i + 1}` : 'parent'}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </article>
    )
}
