'use client'

import { AnalogClock, KeyboardShortcuts, ThemeToggle } from '@/features/portfolio/ui'
import styles from './Navbar.module.css'

export function Navbar() {
    return (
        <div className={styles.outer}>
            <nav className={styles.navbar}>
                <div className={styles.buttons}>
                    <AnalogClock />
                    <KeyboardShortcuts />
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    )
}
