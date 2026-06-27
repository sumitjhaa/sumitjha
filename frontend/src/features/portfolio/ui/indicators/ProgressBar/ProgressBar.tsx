'use client'

import { useScrollProgress } from '@/shared/hooks/scroll/useScrollProgress'
import styles from './ProgressBar.module.css'

export default function ProgressBar() {
    const { progress } = useScrollProgress()

    return (
        <div className={styles.container}>
            <div className={styles.bar} style={{ width: `${progress * 100}%` }} />
        </div>
    )
}
