'use client'

import { useSyncExternalStore, memo, useCallback } from 'react'
import { cn } from '@/shared/utils'
import { useTheme } from '@/app/providers/ThemeProvider'
import { GlassButton } from '@/shared/components/ui'
import { usePanel } from '@/app/providers/PanelProvider'
import { getThemeRows, PALETTE_COLORS, THEMES } from '@/shared/config/themes'
import { ThemeRow } from './ThemeRow'
import { ThemeSingleRow } from './ThemeSingleRow'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

const ROWS = getThemeRows(THEMES)

export const ThemeToggle = memo(function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const { isOpen, toggle, close } = usePanel()
    const open = isOpen('theme')
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    )

    const togglePanel = useCallback(() => toggle('theme'), [toggle])

    const selectTheme = useCallback(
        (t: Theme) => {
            setTheme(t)
        },
        [setTheme],
    )

    const accent = PALETTE_COLORS[theme][3]

    return (
        <>
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
                <div className={styles.grid}>
                    {ROWS.map((row, ri) => {
                        if (Array.isArray(row)) {
                            return <ThemeRow key={ri} themes={row} onSelect={selectTheme} />
                        }
                        return <ThemeSingleRow key={ri} theme={row} onSelect={selectTheme} />
                    })}
                </div>
            </div>
        </>
    )
})
