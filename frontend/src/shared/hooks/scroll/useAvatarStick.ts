'use client'

import { useState, useEffect, useRef } from 'react'

export function useAvatarStick(): boolean {
    const [isStuck, setIsStuck] = useState(false)
    const prevStuck = useRef(false)

    useEffect(() => {
        const hero = document.querySelector<HTMLElement>('[data-section="hero"]')
        if (!hero) return

        const handleScroll = () => {
            const stuck = hero.getBoundingClientRect().top < 0
            if (stuck !== prevStuck.current) {
                prevStuck.current = stuck
                setIsStuck(stuck)
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return isStuck
}
