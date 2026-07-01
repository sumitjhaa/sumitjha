'use client'

import { memo } from 'react'
import { AnalogClock, KeyboardShortcuts, ThemeToggle } from '@/features/portfolio/ui'
import styles from './Navbar.module.css'

const Navbar = memo(function Navbar() {
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
})

export { Navbar }
