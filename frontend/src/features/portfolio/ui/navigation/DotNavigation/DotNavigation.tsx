'use client'

import { useCallback, useRef } from 'react'
import { useSections, useReducedMotion } from '@/shared/hooks'
import { cn } from '@/shared/utils'
import styles from './DotNavigation.module.css'

export function DotNavigation() {
    const sections = useSections()
    const prefersReducedMotion = useReducedMotion()
    const navRef = useRef<HTMLDivElement>(null)

    const scrollTo = useCallback(
        (index: number, instant?: boolean) => {
            const el = document.getElementById(sections[index].id)
            if (el) {
                el.scrollIntoView({ behavior: instant || prefersReducedMotion ? 'instant' : 'smooth' })
            }
        },
        [sections, prefersReducedMotion],
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
            const active = sections.findIndex((s) => s.isActive)
            const next = ((active + dir) % sections.length + sections.length) % sections.length
            const wrapped = dir === 1 ? next <= active : next >= active
            scrollTo(next, wrapped)
            const btn = navRef.current?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)
            btn?.focus()
        },
        [sections, scrollTo],
    )

    return (
        <nav
            ref={navRef}
            className={styles.nav}
            aria-label="Section navigation"
            onKeyDown={handleKeyDown}
            role="tablist"
        >
            {sections.map((section, i) => (
                <button
                    key={section.id}
                    data-index={i}
                    className={cn(
                        styles.dot,
                        section.isActive && styles.active,
                        section.level === 1 && styles.sub,
                    )}
                    onClick={() => scrollTo(i)}
                    aria-label={`Go to ${section.label}`}
                    aria-selected={section.isActive}
                    role="tab"
                    type="button"
                >
                    <span className={cn(styles.label, section.isActive && styles.labelActive)}>
                        {section.label}
                    </span>
                </button>
            ))}
        </nav>
    )
}
