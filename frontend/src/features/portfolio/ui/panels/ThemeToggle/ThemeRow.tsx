'use client'

import { memo } from 'react'
import { ThemeItem } from './ThemeItem'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

interface ThemeRowProps {
    themes: [Theme, Theme]
    onSelect: (theme: Theme) => void
}

export const ThemeRow = memo(function ThemeRow({ themes, onSelect }: ThemeRowProps) {
    return (
        <div
            className={styles.row}
            role="group"
            aria-label={`${themes[0]} and ${themes[1]} themes`}
        >
            {themes.map((t) => (
                <ThemeItem key={t} theme={t} onSelect={onSelect} />
            ))}
        </div>
    )
})
