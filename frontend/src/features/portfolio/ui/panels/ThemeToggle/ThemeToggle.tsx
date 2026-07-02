'use client'

import { useState, useEffect, useMemo, memo, useCallback } from 'react'
import { cn, playSound } from '@/shared/utils'
import { useTheme, isLightTheme } from '@/app/providers/ThemeProvider'
import { GlassButton } from '@/shared/components/ui'
import { usePanel } from '@/app/providers/PanelProvider'
import { useIsClient, PALETTE_COLORS, THEMES } from '@/shared'
import { ThemeItem } from './ThemeItem'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

interface Group {
    label: string
    themes: Theme[]
}

function buildGroups(): Group[] {
    const light = THEMES.filter(isLightTheme)
    const dark = THEMES.filter((t) => !isLightTheme(t))
    return [
        { label: 'light', themes: light },
        { label: 'dark', themes: dark },
    ]
}

const GROUPS = buildGroups()

export const ThemeToggle = memo(function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const { isOpen, toggle, close } = usePanel()
    const open = isOpen('theme')
    const isClient = useIsClient()
    const [query, setQuery] = useState('')

    useEffect(() => { if (!open) setQuery('') }, [open])

    const filteredGroups = useMemo(() => {
        if (!query.trim()) return GROUPS
        const q = query.toLowerCase()
        return GROUPS.filter((g) =>
            g.themes.some((t) => t.includes(q)),
        ).map((g) => ({
            ...g,
            themes: g.themes.filter((t) => t.includes(q)),
        }))
    }, [query])

    const togglePanel = useCallback(() => {
        playSound('/sounds/laptop-touchpad.mp3')
        toggle('theme')
    }, [toggle])

    const selectTheme = useCallback((t: Theme) => setTheme(t), [setTheme])

    const accent = PALETTE_COLORS[theme][3]

    return (
        <>
            <div className={styles.wrapper}>
                <GlassButton
                    className={styles.trigger}
                    onClick={togglePanel}
                    aria-label="Change theme"
                    style={
                        isClient
                            ? { color: `color-mix(in srgb, ${accent} 45%, var(--base-100))` }
                            : undefined
                    }
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m14.622 17.897-10.68-2.913" />
                        <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
                        <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
                    </svg>
                </GlassButton>

                {open && <div className={styles.backdrop} onClick={() => close()} aria-hidden />}

                <div
                    className={cn(styles.panel, open && styles.open)}
                    role="dialog"
                    aria-modal={open}
                    aria-label="Theme selection"
                >
                    <div className={styles.searchWrap}>
                        <input
                            className={styles.search}
                            type="text"
                            placeholder="Search themes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search themes"
                        />
                    </div>
                    <div className={styles.groups}>
                        {filteredGroups.length > 0 ? (
                            filteredGroups.map((g) => (
                                <div key={g.label} className={styles.group}>
                                    <span className={styles.groupLabel}>{g.label}</span>
                                    <div className={styles.grid}>
                                        {g.themes.map((t) => (
                                            <ThemeItem key={t} theme={t} onSelect={selectTheme} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className={styles.noResults}>No themes found</span>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
})
