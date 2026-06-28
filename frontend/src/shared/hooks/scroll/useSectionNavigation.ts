'use client'

import { useRef, useCallback } from 'react'
import { scrollToElement } from '@/shared/utils'
import { SECTIONS } from '@/shared/config'

interface SectionNavigationReturn {
    activeRef: React.MutableRefObject<number>
    last: number
    scrollToSection: (index: number) => void
    scrollToNext: () => void
    scrollToPrev: () => void
    scrollToFirst: () => void
    scrollToLast: () => void
}

function getSectionEl(index: number): HTMLElement | null {
    return document.getElementById(SECTIONS[index]?.id) ?? null
}

export function useSectionNavigation(): SectionNavigationReturn {
    const activeRef = useRef(0)
    const last = SECTIONS.length - 1

    const scrollToSection = useCallback((index: number) => {
        activeRef.current = index
        scrollToElement(getSectionEl(index))
    }, [])

    const scrollToNext = useCallback(() => {
        const next = Math.min(activeRef.current + 1, last)
        activeRef.current = next
        scrollToElement(getSectionEl(next))
    }, [last])

    const scrollToPrev = useCallback(() => {
        const prev = Math.max(activeRef.current - 1, 0)
        activeRef.current = prev
        scrollToElement(getSectionEl(prev))
    }, [])

    const scrollToFirst = useCallback(() => {
        activeRef.current = 0
        scrollToElement(getSectionEl(0))
    }, [])

    const scrollToLast = useCallback(() => {
        activeRef.current = last
        scrollToElement(getSectionEl(last))
    }, [last])

    return {
        activeRef,
        last,
        scrollToSection,
        scrollToNext,
        scrollToPrev,
        scrollToFirst,
        scrollToLast,
    }
}
