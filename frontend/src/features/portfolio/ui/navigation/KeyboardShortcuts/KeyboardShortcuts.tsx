'use client'

import { useState, useCallback, useRef, memo } from 'react'
import { useSyncExternalStore } from 'react'
import { useKeyPress, useSectionNavigation } from '@/shared/hooks'
import { GlassButton } from '@/shared/components/ui'
import { usePanel } from '@/app/providers/PanelProvider'
import { useTheme } from '@/app/providers/ThemeProvider'
import { scrollToTop, cn } from '@/shared/utils'
import { BASE_SHORTCUTS, VIM_SHORTCUTS } from '@/shared/config/keyboard'
import { PALETTE_COLORS } from '@/shared/config/themes'
import { VimKeyHandler } from './VimKeyHandler'
import styles from './KeyboardShortcuts.module.css'

const prevent = (fn: () => void) => (e: KeyboardEvent) => {
    e.preventDefault()
    fn()
}

export const KeyboardShortcuts = memo(function KeyboardShortcuts() {
    const [vimMode, setVimMode] = useState(false)
    const vimModeRef = useRef(vimMode)
    vimModeRef.current = vimMode
    const { isOpen: isPanelOpen, toggle: togglePanel, close: closePanel } = usePanel()
    const { last, scrollToSection, scrollToNext, scrollToPrev } = useSectionNavigation()
    const { theme } = useTheme()
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    )
    const accent = PALETTE_COLORS[theme][3]
    const isOpen = isPanelOpen('keyboard')

    const toggle = useCallback(() => togglePanel('keyboard'), [togglePanel])
    const close = useCallback(() => closePanel(), [closePanel])

    const toggleVimMode = useCallback(() => setVimMode((p) => !p), [])

    useKeyPress({
        h: prevent(useCallback(() => scrollToSection(0), [scrollToSection])),
        a: prevent(useCallback(() => scrollToSection(1), [scrollToSection])),
        t: prevent(scrollToTop),
        '?': prevent(toggle),
        escape: prevent(close),
        j: prevent(scrollToNext),
        k: prevent(scrollToPrev),
        1: prevent(useCallback(() => scrollToSection(0), [scrollToSection])),
        2: prevent(useCallback(() => scrollToSection(1), [scrollToSection])),
        3: prevent(useCallback(() => scrollToSection(2), [scrollToSection])),
        4: prevent(useCallback(() => scrollToSection(3), [scrollToSection])),
        5: prevent(useCallback(() => scrollToSection(4), [scrollToSection])),
        6: prevent(useCallback(() => scrollToSection(5), [scrollToSection])),
        7: prevent(useCallback(() => scrollToSection(6), [scrollToSection])),
        w: prevent(
            useCallback(() => {
                if (!vimModeRef.current) return
                scrollToNext()
            }, [scrollToNext]),
        ),
        b: prevent(
            useCallback(() => {
                if (!vimModeRef.current) return
                scrollToPrev()
            }, [scrollToPrev]),
        ),
        m: (e) => {
            if (e.metaKey || e.ctrlKey) return
            e.preventDefault()
            toggleVimMode()
        },
        d: (e) => {
            if (e.ctrlKey || e.metaKey) return
            e.preventDefault()
            togglePanel('theme')
        },
    })

    return (
        <>
            <GlassButton
                className={cn(styles.trigger, vimMode && styles.vimActive)}
                onClick={toggle}
                aria-label="Toggle keyboard shortcuts"
                style={
                    isClient
                        ? { color: `color-mix(in srgb, ${accent} 45%, var(--base-100))` }
                        : undefined
                }
            >
                {vimMode ? (
                    <span className={styles.vimBadge}>VIM</span>
                ) : (
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
                )}
            </GlassButton>

            {isOpen && <div className={styles.backdrop} onClick={close} aria-hidden />}

            <div
                className={cn(styles.panel, isOpen && styles.open)}
                role="dialog"
                aria-modal={isOpen}
                aria-label="Keyboard shortcuts"
            >
                <h2 className={styles.title}>Keyboard Shortcuts</h2>
                <div className={styles.vimStatus}>
                    <span className={vimMode ? styles.vimOn : styles.vimOff}>
                        {vimMode ? 'VIM ON' : 'VIM OFF'}
                    </span>
                    <span className={styles.vimHint}>press m to toggle</span>
                </div>
                <ul className={styles.list}>
                    {BASE_SHORTCUTS.map((s) => (
                        <li key={s.key} className={styles.item}>
                            <kbd className={styles.kbd}>{s.key}</kbd>
                            <span>{s.description}</span>
                        </li>
                    ))}
                </ul>
                {vimMode && (
                    <>
                        <h3 className={styles.vimSection}>VIM</h3>
                        <ul className={styles.list}>
                            {VIM_SHORTCUTS.map((s) => (
                                <li key={s.key} className={styles.item}>
                                    <kbd className={styles.kbd}>{s.display ?? s.key}</kbd>
                                    <span>{s.description}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>

            {vimMode && <VimKeyHandler last={last} />}
        </>
    )
})
