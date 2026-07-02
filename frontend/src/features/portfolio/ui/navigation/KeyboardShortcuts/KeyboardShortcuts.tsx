'use client'

import { useCallback, useEffect, memo } from 'react'
import { useKeyPress, useSectionNavigation, useIsClient } from '@/shared/hooks'
import { GlassButton } from '@/shared/components/ui'
import { usePanel } from '@/app/providers/PanelProvider'
import { useTheme } from '@/app/providers/ThemeProvider'
import { scrollToTop, cn, playSound } from '@/shared/utils'
import { BASE_SHORTCUTS, PALETTE_COLORS } from '@/shared/config'
import styles from './KeyboardShortcuts.module.css'

const prevent = (fn: () => void) => (e: KeyboardEvent) => {
    e.preventDefault()
    fn()
}

export const KeyboardShortcuts = memo(function KeyboardShortcuts() {
    const { isOpen: isPanelOpen, toggle: togglePanel, close: closePanel } = usePanel()
    const { scrollToNext, scrollToPrev } = useSectionNavigation()
    const { theme } = useTheme()
    const isClient = useIsClient()
    const accent = PALETTE_COLORS[theme][3]
    const isOpen = isPanelOpen('keyboard')

    const toggle = useCallback(() => {
        playSound('/sounds/laptop-touchpad.mp3')
        togglePanel('keyboard')
    }, [togglePanel])
    const close = useCallback(() => closePanel(), [closePanel])

    useKeyPress({
        t: prevent(scrollToTop),
        '?': prevent(toggle),
        escape: prevent(close),
        j: prevent(scrollToNext),
        k: prevent(scrollToPrev),
        d: (e) => {
            if (e.metaKey || e.ctrlKey) return
            e.preventDefault()
            togglePanel('theme')
        },
        c: (e) => {
            if (e.metaKey || e.ctrlKey) return
            e.preventDefault()
            togglePanel('clock')
        },
    })

    return (
        <>
            <div className={styles.wrapper}>
                <GlassButton
                    className={styles.trigger}
                    onClick={toggle}
                    aria-label="Toggle keyboard shortcuts"
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
                        <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                    </svg>
                </GlassButton>

                {isOpen && <div className={styles.backdrop} onClick={close} aria-hidden />}

                <div
                    className={cn(styles.panel, isOpen && styles.open)}
                    role="dialog"
                    aria-modal={isOpen}
                    aria-label="Keyboard shortcuts"
                >
                    <h2 className={styles.title}>Keyboard Shortcuts</h2>
                    <ul className={styles.list}>
                        {BASE_SHORTCUTS.map((s) => (
                            <li key={s.key} className={styles.item}>
                                <kbd className={styles.kbd}>{s.key}</kbd>
                                <span>{s.description}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
})
