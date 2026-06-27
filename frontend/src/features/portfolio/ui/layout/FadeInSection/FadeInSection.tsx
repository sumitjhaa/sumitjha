'use client'

import type { ReactNode } from 'react'
import { useIntersectionObserver } from '@/shared/hooks/observer/useIntersectionObserver'
import { useReducedMotion } from '@/shared/hooks/media/useReducedMotion'
import { cn } from '@/shared/utils'
import styles from './FadeInSection.module.css'

interface FadeInSectionProps {
    children: ReactNode
    className?: string
    threshold?: number
    delay?: number
}

export function FadeInSection({
    children,
    className,
    threshold = 0.1,
    delay = 0,
}: FadeInSectionProps) {
    const { ref, isVisible } = useIntersectionObserver({ threshold })
    const prefersReducedMotion = useReducedMotion()

    return (
        <div
            ref={ref}
            className={cn(
                styles.wrapper,
                prefersReducedMotion ? styles.visible : isVisible ? styles.visible : styles.hidden,
                className,
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
