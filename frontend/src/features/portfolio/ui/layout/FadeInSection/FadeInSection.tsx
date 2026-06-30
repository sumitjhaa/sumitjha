import type { ReactNode } from 'react'
import { cn } from '@/shared/utils'
import styles from './FadeInSection.module.css'

interface FadeInSectionProps {
    children: ReactNode
    className?: string
}

export function FadeInSection({ children, className }: FadeInSectionProps) {
    return <div className={cn(styles.wrapper, className)}>{children}</div>
}
