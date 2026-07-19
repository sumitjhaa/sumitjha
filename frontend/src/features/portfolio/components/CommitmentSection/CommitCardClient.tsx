'use client'

import { useEffect } from 'react'
import { GitHubAvatar } from './GitHubAvatar'
import styles from './CommitmentCard.module.css'
import { useCountUp } from './hooks'
import { formatAbsolute, formatRelative, splitMessage, truncateMessage } from './utils'
import type { CommitData } from './types'
import { CACHE_KEY, CACHE_TTL } from './constants'

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

function saveCachedCommit(commit: CommitData): void {
    if (typeof window === 'undefined') return
    try {
        const data: CachedCommit = { fetchedAt: Date.now(), commit }
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch {
        // localStorage may be full or disabled
    }
}

export type { CommitData }

export function CommitCardClient({
    initial,
    totalCommits,
}: {
    initial: CommitData
    totalCommits?: number
}) {
    // Keep local cache fresh whenever server data changes
    useEffect(() => {
        saveCachedCommit(initial)
    }, [initial])

    const { title, body } = splitMessage(initial.message)
    const truncatedTitle = truncateMessage(title)
    const shortSha = initial.sha.slice(0, 7)
    const displayName = initial.authorUser?.name || initial.author.name
    const showCommitter =
        initial.committer.email !== initial.author.email ||
        initial.committer.name !== initial.author.name

    const animatedAdditions = useCountUp(initial.additions, 900, 550)
    const animatedDeletions = useCountUp(initial.deletions, 900, 600)

    return (
        <article className={styles.card}>
            <div className={styles.cardInner}>
                <aside className={styles.leftColumn}>
                    <div className={styles.profileWrapper}>
                        {initial.authorUser && (
                            <a
                                href={initial.authorUser.html_url}
                                className={styles.avatarLinkRight}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${displayName} on GitHub`}
                            >
                                <GitHubAvatar
                                    src={initial.authorUser.avatar_url}
                                    fallback={initial.authorUser.login}
                                    username={initial.authorUser.login}
                                    fullName={displayName}
                                />
                            </a>
                        )}
                        <div className={styles.identityTextRight}>
                            <div className={styles.identityNameRight}>{displayName}</div>
                            {initial.authorUser && (
                                <a
                                    href={initial.authorUser.html_url}
                                    className={styles.identityHandleRight}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    @{initial.authorUser.login}
                                    {initial.authorUser.site_admin && (
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
                                        {initial.committer.name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                <main className={styles.rightColumn}>
                    {totalCommits !== undefined && (
                        <div className={styles.contributionCount}>
                            <span className={styles.contributionCountLabel}>
                                total contributions
                            </span>
                            <span className={styles.contributionCountNumber}>
                                {totalCommits}
                            </span>
                        </div>
                    )}
                    <div className={styles.headerRow}>
                        <span className={styles.headerLabel}>last committed</span>
                        <time
                            className={styles.time}
                            dateTime={initial.author.date}
                            title={formatAbsolute(initial.author.date)}
                        >
                            {formatRelative(initial.author.date)}
                        </time>
                    </div>
                    <div className={styles.branchRow}>
                        <a
                            href={initial.url}
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
                    <a
                        href={initial.url}
                        className={styles.message}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={title}
                    >
                        <span className={styles.messageText}>{truncatedTitle}</span>
                    </a>
                </main>
            </div>
        </article>
    )
}
