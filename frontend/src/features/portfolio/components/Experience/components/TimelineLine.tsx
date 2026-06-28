'use client'

import { TAIL_HEIGHT } from '../config'
import styles from '../Experience.module.css'

interface TimelineLineProps {
    lineHeight: number
    isLast?: boolean
}

export function TimelineLine({ lineHeight, isLast }: TimelineLineProps) {
    return (
        <div
            className={`${styles.line}${isLast ? ` ${styles['line--tail']}` : ''}`}
            style={{ height: lineHeight + (isLast ? TAIL_HEIGHT : 0) }}
            aria-hidden="true"
        />
    )
}
