'use client'

import { useEffect, useRef, memo } from 'react'
import { scrollToElement } from '@/shared/utils'
import { SECTIONS } from '@/shared/config'

function getSectionEl(index: number): HTMLElement | null {
    return document.getElementById(SECTIONS[index]?.id) ?? null
}

interface VimKeyHandlerProps {
    last: number
}

export const VimKeyHandler = memo(function VimKeyHandler({ last }: VimKeyHandlerProps) {
    const activeRef = useRef(0)

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            )
                return

            if (e.key === 'G' && e.shiftKey) {
                e.preventDefault()
                activeRef.current = last
                scrollToElement(getSectionEl(last))
            } else if (e.key === 'g' && !e.shiftKey) {
                e.preventDefault()
                activeRef.current = 0
                scrollToElement(getSectionEl(0))
            } else if (e.key === '0') {
                e.preventDefault()
                activeRef.current = 0
                scrollToElement(getSectionEl(0))
            } else if (e.key === '$') {
                e.preventDefault()
                activeRef.current = last
                scrollToElement(getSectionEl(last))
            } else if (e.ctrlKey && e.key === 'd') {
                e.preventDefault()
                window.scrollBy({ top: window.innerHeight / 2, behavior: 'smooth' })
            } else if (e.ctrlKey && e.key === 'u') {
                e.preventDefault()
                window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' })
            }
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [last])

    return null
})
