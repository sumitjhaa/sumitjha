'use client'

import { memo } from 'react'
import { ThemeSwatches } from './ThemeSwatches'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

interface ThemeItemProps {
    theme: Theme
    onSelect: (theme: Theme) => void
}

export const ThemeItem = memo(function ThemeItem({ theme, onSelect }: ThemeItemProps) {
    const handleClick = () => onSelect(theme)
    return (
        <button
            className={styles.item}
            onClick={handleClick}
            type="button"
            aria-label={`Switch to ${theme} theme`}
        >
            <ThemeSwatches theme={theme} />
            <span className={styles.name}>{theme}</span>
        </button>
    )
})
