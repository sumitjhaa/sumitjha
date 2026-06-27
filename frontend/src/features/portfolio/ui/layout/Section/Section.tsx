import { memo, type ReactNode } from 'react'
import { cn } from '@/shared/utils'
import styles from './Section.module.css'

interface SectionProps {
    children: ReactNode
    className?: string
    as?: 'section' | 'footer'
    id?: string
}

function Section({ children, className, as: Tag = 'section', id }: SectionProps) {
    return (
        <Tag id={id} className={cn(styles.section, className)}>
            {children}
        </Tag>
    )
}

export default memo(Section)
