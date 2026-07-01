import type { ReactNode } from 'react'
import styles from './VisuallyHidden.module.css'

interface VisuallyHiddenProps {
    children: ReactNode
}

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
    return <div className={styles.visuallyHidden}>{children}</div>
}
