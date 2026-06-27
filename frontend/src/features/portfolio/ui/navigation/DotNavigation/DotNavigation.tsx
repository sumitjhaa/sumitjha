'use client'

import { useCallback, useRef } from 'react'
import { SECTIONS } from '@/shared/config/navigation'
import { useReducedMotion, useActiveSection } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import styles from './DotNavigation.module.css'

const SECTION_IDS = SECTIONS.map((s) => s.id)

export function DotNavigation() {
    const active = useActiveSection(SECTION_IDS)
    const prefersReducedMotion = useReducedMotion()
    const navRef = useRef<HTMLDivElement>(null)

    const scrollTo = useCallback(
        (index: number) => {
            const el = document.getElementById(SECTION_IDS[index])
            if (el) {
                el.scrollIntoView({ behavior: prefersReducedMotion ? 'instant' : 'smooth' })
            }
        },
        [prefersReducedMotion],
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            const dir =
                e.key === 'ArrowDown' || e.key === 'ArrowRight'
                    ? 1
                    : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
                      ? -1
                      : 0
            if (dir === 0) return
            e.preventDefault()
            const next = Math.max(0, Math.min(active + dir, SECTIONS.length - 1))
            scrollTo(next)
            const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)
            btn?.focus()
        },
        [active, scrollTo],
    )

    return (
        <nav
            ref={navRef}
            className={styles.nav}
            aria-label="Section navigation"
            onKeyDown={handleKeyDown}
            role="tablist"
        >
            {SECTIONS.map((section, i) => (
                <button
                    key={section.id}
                    data-index={i}
                    className={cn(styles.dot, i === active && styles.active)}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to ${section.label}`}
                    aria-selected={i === active}
                    role="tab"
                    type="button"
                >
                    <span className={styles.tooltip}>{section.label}</span>
                </button>
            ))}
        </nav>
    )
}
