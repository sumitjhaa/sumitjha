import type { SectionConfig } from '@/shared/types'
import { PROJECTS } from '@/features/portfolio/ui/projects/data'

const STATIC_SECTIONS: SectionConfig[] = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'section-3', label: 'Expertise' },
    { id: 'section-4', label: 'Toolchain' },
]

const PROJECT_SECTIONS: SectionConfig[] = PROJECTS.toReversed().filter((p) => p.slug !== 'ziggle').map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
}))

export const SECTIONS: SectionConfig[] = [
    ...STATIC_SECTIONS,
    ...PROJECT_SECTIONS,
]

export const SCROLL_DEBOUNCE_MS = 100
export const SCROLL_THROTTLE_MS = 50
