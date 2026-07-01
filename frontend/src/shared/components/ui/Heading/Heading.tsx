import { type ReactNode, type ElementType } from 'react'
import { cn } from '@/shared/utils'
import styles from './Heading.module.css'

interface HeadingProps {
    children: ReactNode
    className?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div'
    size?: 'sm' | 'md' | 'lg'
}

export function Heading({ children, className, as: Tag = 'h2', size = 'md' }: HeadingProps) {
    return (
        <Tag className={cn(styles.base, styles[size], className)}>
            {children}
        </Tag>
    )
}