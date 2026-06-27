'use client'

import { useState, useEffect } from 'react'

interface ActiveSectionOptions {
    thresholds?: number[]
}

const DEFAULT_THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

export function useActiveSection(sectionIds: string[], options: ActiveSectionOptions = {}): number {
    const [active, setActive] = useState(0)
    const { thresholds = DEFAULT_THRESHOLDS } = options

    useEffect(() => {
        const els = sectionIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[]

        if (els.length === 0) return

        const ratios = new Map<string, number>()

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    ratios.set(entry.target.id, entry.intersectionRatio)
                }

                let maxRatio = 0
                let maxIdx = 0
                for (let i = 0; i < sectionIds.length; i++) {
                    const ratio = ratios.get(sectionIds[i]) ?? 0
                    if (ratio > maxRatio) {
                        maxRatio = ratio
                        maxIdx = i
                    }
                }

                setActive(maxIdx)
            },
            { threshold: thresholds },
        )

        els.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [sectionIds, thresholds])

    return active
}
