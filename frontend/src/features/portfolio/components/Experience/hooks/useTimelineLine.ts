'use client'

import { useEffect, useState, type RefObject } from 'react'
import { LINE_TOP_OFFSET, TIMELINE_POINT_SELECTOR } from '../config'

export function useTimelineLine(
    sectionRef: RefObject<HTMLElement | null>,
    descRef: RefObject<HTMLDivElement | null>,
): number {
    const [lineHeight, setLineHeight] = useState(0)

    useEffect(() => {
        if (!sectionRef.current || !descRef.current) return

        const measure = () => {
            if (!sectionRef.current || !descRef.current) return
            const desc = descRef.current

            const allPoints = document.querySelectorAll(TIMELINE_POINT_SELECTOR)
            const lastPoint = allPoints[allPoints.length - 1] as HTMLElement | undefined

            const descRect = desc.getBoundingClientRect()

            if (lastPoint) {
                const lastRect = lastPoint.getBoundingClientRect()
                setLineHeight(Math.max(0, lastRect.bottom - descRect.top - LINE_TOP_OFFSET))
            } else {
                const sectionRect = sectionRef.current.getBoundingClientRect()
                setLineHeight(Math.max(0, sectionRect.bottom - descRect.top - LINE_TOP_OFFSET))
            }
        }

        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(document.body)
        return () => ro.disconnect()
    }, [sectionRef, descRef])

    return lineHeight
}
