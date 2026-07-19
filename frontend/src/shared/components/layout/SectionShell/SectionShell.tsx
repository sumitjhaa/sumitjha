import { memo, type ReactNode } from 'react'
import { cn } from '@/shared/utils'
import styles from './SectionShell.module.css'

interface SectionShellProps {
    children?: ReactNode
    className?: string
    id?: string
    as?: 'section' | 'footer' | 'div' | 'article'
    heading?: ReactNode
    header?: ReactNode
    actions?: ReactNode
    footer?: ReactNode
    headingAs?: 'h1' | 'h2' | 'h3'
    style?: React.CSSProperties
}

export const SectionShell = memo(function SectionShell({
    children,
    className,
    id,
    as: Tag = 'section',
    heading,
    header,
    actions,
    footer,
    headingAs: HeadingTag = 'h1',
    style,
}: SectionShellProps) {
    return (
        <Tag id={id} className={cn(styles.shell, className)} style={style}>
            {header}
            {heading && <HeadingTag className={styles.heading}>{heading}</HeadingTag>}
            {children && <div className={styles.body}>{children}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
            {footer && <div className={styles.footer}>{footer}</div>}
        </Tag>
    )
})
