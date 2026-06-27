'use client'

import { memo } from 'react'
import { ThemeItem } from './ThemeItem'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

interface ThemeSingleRowProps {
    theme: Theme
    onSelect: (theme: Theme) => void
}

export const ThemeSingleRow = memo(function ThemeSingleRow({
    theme,
    onSelect,
}: ThemeSingleRowProps) {
    return (
        <div className={styles.rowSingle} role="group" aria-label={`${theme} theme`}>
            <ThemeItem theme={theme} onSelect={onSelect} />
        </div>
    )
})
