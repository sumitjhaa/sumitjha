'use client'

import { type ReactNode } from 'react'
import { cn } from '@/shared/utils'
import styles from './LinkHighlight.module.css'

interface LinkHighlightProps {
    children: ReactNode
    href?: string
    className?: string
    color?: string
}

export function LinkHighlight({
    children,
    href,
    className,
    color = '#f59e0b44',
}: LinkHighlightProps) {
    const isLink = typeof href === 'string' && href.length > 0

    if (isLink) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.base, className)}
                style={{ '--highlight': color } as React.CSSProperties}
            >
                {children}
            </a>
        )
    }

    return (
        <span
            className={cn(styles.base, className)}
            style={{ '--highlight': color } as React.CSSProperties}
        >
            {children}
        </span>
    )
}
