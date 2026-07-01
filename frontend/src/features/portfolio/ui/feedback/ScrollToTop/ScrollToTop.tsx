'use client'

import { memo, useCallback } from 'react'
import { useScrollProgress } from '@/shared/hooks'
import { Icon } from '@/shared/components/ui'
import styles from './ScrollToTop.module.css'

const RADIUS = 45
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function ScrollToTop() {
    const { progress, show } = useScrollProgress()

    const dashoffset = CIRCUMFERENCE - progress * CIRCUMFERENCE

    const handleClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <div className={styles.container}>
            <svg className={styles.ring} viewBox="0 0 100 100" aria-hidden>
                <circle className={styles.track} cx="50" cy="50" r="45" />
                <circle
                    className={styles.progress}
                    cx="50"
                    cy="50"
                    r="45"
                    style={{ strokeDashoffset: dashoffset }}
                />
            </svg>
            <button
                className={styles.button}
                onClick={handleClick}
                aria-label="Scroll to top"
                style={{ opacity: show ? 1 : 0 }}
            >
                <Icon name="arrow" />
            </button>
        </div>
    )
}

export default memo(ScrollToTop)
