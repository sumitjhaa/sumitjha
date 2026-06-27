'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface ScrollProgress {
    progress: number
    show: boolean
}

const THROTTLE_MS = 50

function getScrollProgress(): ScrollProgress {
    const total = document.documentElement.scrollHeight - window.innerHeight
    if (total <= 0 || typeof window === 'undefined') return { progress: 0, show: false }
    const progress = Math.min(window.scrollY / total, 1)
    return { progress, show: window.scrollY > 100 }
}

export function useScrollProgress(): ScrollProgress {
    const [state, setState] = useState<ScrollProgress>({ progress: 0, show: false })
    const lastCall = useRef(0)
    const rafId = useRef<number>(0)

    const update = useCallback(() => {
        setState(getScrollProgress())
    }, [])

    useEffect(() => {
        const throttled = () => {
            const now = Date.now()
            if (now - lastCall.current >= THROTTLE_MS) {
                lastCall.current = now
                update()
            } else {
                cancelAnimationFrame(rafId.current)
                rafId.current = requestAnimationFrame(update)
            }
        }

        window.addEventListener('scroll', throttled, { passive: true })
        window.addEventListener('resize', throttled, { passive: true })

        return () => {
            window.removeEventListener('scroll', throttled)
            window.removeEventListener('resize', throttled)
            cancelAnimationFrame(rafId.current)
        }
    }, [update])

    return state
}
