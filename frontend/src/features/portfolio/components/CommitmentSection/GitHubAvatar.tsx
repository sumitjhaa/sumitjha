'use client'

import { useState } from 'react'
import styles from './CommitmentCard.module.css'

interface GitHubAvatarProps {
    src: string
    fallback: string
    username: string
    fullName: string
}

export function GitHubAvatar({ src, fallback, username, fullName }: GitHubAvatarProps) {
    const [failed, setFailed] = useState(false)
    const initial = fallback.charAt(0).toUpperCase()

    if (failed) {
        return (
            <span className={styles.avatar} aria-label={`${fullName} on GitHub`}>
                <span className={styles.avatarFallbackShow} aria-hidden="true">
                    {initial}
                </span>
            </span>
        )
    }

    return (
        <span className={styles.avatar} aria-label={`${fullName} on GitHub`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${src}&s=120`}
                alt=""
                className={styles.avatarImg}
                loading="lazy"
                decoding="async"
                onError={() => setFailed(true)}
            />
            <span className={styles.avatarFallback} aria-hidden="true">
                {initial}
            </span>
        </span>
    )
}
