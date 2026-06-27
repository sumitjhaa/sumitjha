'use client'

import { type ButtonHTMLAttributes, forwardRef, memo } from 'react'
import { cn } from '@/shared/utils'
import styles from './GlassButton.module.css'

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    'aria-label': string
}

export const GlassButton = memo(
    forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
        { className, children, ...props },
        ref,
    ) {
        return (
            <button ref={ref} className={cn(styles.button, className)} type="button" {...props}>
                {children}
            </button>
        )
    }),
)
