'use client'

import { memo } from 'react'
import { PALETTE_COLORS } from '@/shared/config'
import type { Theme } from '@/shared/types'
import styles from './ThemeToggle.module.css'

interface ThemeSwatchesProps {
    theme: Theme
}

export const ThemeSwatches = memo(function ThemeSwatches({ theme }: ThemeSwatchesProps) {
    const colors = PALETTE_COLORS[theme]
    return (
        <div className={styles.colors} aria-hidden>
            {colors.map((c) => (
                <span key={c} className={styles.dot} style={{ background: c }} />
            ))}
        </div>
    )
})
