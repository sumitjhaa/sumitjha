'use client'

import { SECTIONS } from '@/shared/config'
import { useActiveSection } from './useActiveSection'
import type { SectionConfig } from '@/shared/types'

export interface SectionState extends SectionConfig {
    isActive: boolean
}

export function useSections(): SectionState[] {
    const sectionIds = SECTIONS.map((s) => s.id)
    const active = useActiveSection(sectionIds)

    return SECTIONS.map((s, i) => ({
        ...s,
        isActive: i === active,
    }))
}
