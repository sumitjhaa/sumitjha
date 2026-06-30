'use client'

import { useEffect, useRef } from 'react'

export function LoopedPaging() {
    const locked = useRef(false)

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (locked.current) return

            const scrollY = window.scrollY
            const innerH = window.innerHeight
            const maxScroll = document.documentElement.scrollHeight - innerH

            if (scrollY <= 0 && e.deltaY < 0) {
                e.preventDefault()
                locked.current = true
                window.scrollTo({ top: maxScroll, behavior: 'instant' })
                setTimeout(() => { locked.current = false }, 400)
            } else if (scrollY + innerH >= maxScroll - 1 && e.deltaY > 0) {
                e.preventDefault()
                locked.current = true
                window.scrollTo({ top: 0, behavior: 'instant' })
                setTimeout(() => { locked.current = false }, 400)
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [])

    return null
}
