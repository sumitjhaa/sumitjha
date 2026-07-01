'use client'

import { memo, useCallback, type ReactNode, type MouseEvent } from 'react'
import { playSound } from '@/shared/utils'

interface SoundButtonProps {
    children: ReactNode
    className?: string
    onClick?: (e: MouseEvent<HTMLElement>) => void
    as?: 'button' | 'a' | 'div'
    href?: string
    target?: string
    rel?: string
    type?: 'button' | 'submit' | 'reset'
}

export const SoundButton = memo(function SoundButton({
    children,
    className,
    onClick,
    as: Tag = 'button',
    ...rest
}: SoundButtonProps) {
    const handleClick = useCallback(
        (e: MouseEvent<HTMLElement>) => {
            playSound('/sounds/mouse-click.mp3')
            onClick?.(e)
        },
        [onClick],
    )

    return (
        <Tag className={className} onClick={handleClick} {...rest}>
            {children}
        </Tag>
    )
})