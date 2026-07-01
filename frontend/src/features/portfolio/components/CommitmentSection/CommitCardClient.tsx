'use client'

import { useEffect } from 'react'
import { GitHubAvatar } from './GitHubAvatar'
import styles from './CommitmentSection.module.css'
import { saveCachedCommit } from './cache'
import { useCountUp } from './hooks'
import { formatAbsolute, formatRelative, splitMessage, truncateMessage } from './utils'
import type { CommitData } from './types'

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
    const showCommitter =
        initial.committer.email !== initial.author.email ||
        initial.committer.name !== initial.author.name

    const animatedAdditions = useCountUp(initial.additions, 900, 550)
    const animatedDeletions = useCountUp(initial.deletions, 900, 600)

    return (
        <article className={styles.card}>
            <div className={styles.cardInner}>
                <aside className={styles.rightColumn}>
                    {initial.authorUser && (
                        <a
                            href={initial.authorUser.html_url}
                            className={styles.avatarLinkRight}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${initial.author.name} on GitHub`}
                        >
                            <GitHubAvatar
                                src={initial.authorUser.avatar_url}
                                fallback={initial.authorUser.login}
                                username={initial.authorUser.login}
                                fullName={initial.author.name}
                            />
                        </a>
                    )}
                    <div className={styles.identityTextRight}>
                        <div className={styles.identityNameRight}>{initial.author.name}</div>
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
                        {totalCommits !== undefined && (
                            <div className={styles.contributionCount}>
                                <span className={styles.contributionCountNumber}>{totalCommits}</span>
                            </div>
                        )}
                        {showCommitter && (
                            <div className={styles.committerRight}>
                                <span className={styles.committerSep} aria-hidden="true">
                                    ↳
                                </span>
                                <span className={styles.committerName}>{initial.committer.name}</span>
                            </div>
                        )}
                    </div>
                </aside>

                <main className={styles.leftColumn}>
                    <div className={styles.headerRow}>
                        <div className={styles.lastCommitLabel}>last commit</div>
                        <time
                            className={styles.time}
                            dateTime={initial.author.date}
                            title={formatAbsolute(initial.author.date)}
                        >
                            {formatRelative(initial.author.date)}
                        </time>
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

                    {body && <p className={styles.body}>{body}</p>}

                    <div className={styles.branch}>
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
                        {initial.parents.map((p, i) => (
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
                                    {initial.parents.length > 1 ? `parent ${i + 1}` : 'parent'}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </article>
    )
}
