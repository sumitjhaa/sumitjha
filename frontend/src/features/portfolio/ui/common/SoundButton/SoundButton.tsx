'use client'

import { useRef, useCallback, memo, type ReactNode, type MouseEvent } from 'react'

interface SoundButtonProps {
    children: ReactNode
    className?: string
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
    type?: 'button' | 'submit' | 'reset'
}

export const SoundButton = memo(function SoundButton({
    children,
    className,
    onClick,
    type = 'button',
}: SoundButtonProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const playSound = useCallback(() => {
        let audio = audioRef.current
        if (!audio) {
            audio = new Audio('/sounds/mouse-click.mp3')
            audio.preload = 'auto'
            audioRef.current = audio
        }
        audio.currentTime = 0
        audio.play().catch(() => {})
    }, [])

    const handleClick = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            playSound()
            onClick?.(e)
        },
        [onClick, playSound],
    )

    return (
        <button type={type} className={className} onClick={handleClick}>
            {children}
        </button>
    )
})
