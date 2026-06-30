'use client'

import { useEffect, useRef } from 'react'
import { SECTIONS } from '@/shared/config'

export function LoopedPaging() {
    const locked = useRef(false)

    useEffect(() => {
        const firstId = SECTIONS.at(0)?.id
        const lastId = SECTIONS.at(-1)?.id
        if (!firstId || !lastId) return

        const first = document.getElementById(firstId)
        const last = document.getElementById(lastId)
        if (!first || !last) return

        const handleWheel = (e: WheelEvent) => {
            if (locked.current) return

            const scrollY = window.scrollY
            const innerH = window.innerHeight
            const maxScroll = document.documentElement.scrollHeight - innerH

            if (scrollY <= 0 && e.deltaY < 0) {
                const rect = first.getBoundingClientRect()
                if (rect.top >= -1) {
                    e.preventDefault()
                    locked.current = true
                    window.scrollTo({ top: maxScroll, behavior: 'instant' })
                    setTimeout(() => { locked.current = false }, 400)
                }
            } else if (scrollY + innerH >= maxScroll - 1 && e.deltaY > 0) {
                const rect = last.getBoundingClientRect()
                if (rect.bottom <= innerH + 1) {
                    e.preventDefault()
                    locked.current = true
                    window.scrollTo({ top: 0, behavior: 'instant' })
                    setTimeout(() => { locked.current = false }, 400)
                }
            }
        }

        window.addEventListener('wheel', handleWheel, { passive: false })
        return () => window.removeEventListener('wheel', handleWheel)
    }, [])

    return null
}
