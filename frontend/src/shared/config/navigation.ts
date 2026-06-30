import type { SectionConfig } from '@/shared/types'
import { PROJECTS } from '@/features/portfolio/data/projects'

const STATIC_SECTIONS: SectionConfig[] = [
    { id: 'hero', label: 'Home', level: 0 },
    { id: 'about', label: 'About', level: 0 },
    { id: 'section-3', label: 'Expertise', level: 0 },
    { id: 'experience-intro', label: 'The Logs', level: 0 },
    { id: 'experience', label: 'Taxspanner', level: 1 },
    { id: 'experience-propel', label: 'Propel', level: 1 },
    { id: 'section-4', label: 'Toolchain', level: 0 },
    { id: 'projects-intro', label: 'Projects', level: 0 },
]

const PROJECT_SECTIONS: SectionConfig[] = PROJECTS.toReversed().filter((p) => p.slug !== 'ziggle').map((p) => ({
    id: `project-${p.slug}`,
    label: p.title,
    level: 1 as const,
}))

const END_SECTIONS: SectionConfig[] = [
    { id: 'commitment', label: 'Very Committed', level: 0 },
    { id: 'education', label: 'Education', level: 0 },
    { id: 'shoutouts', label: 'Shoutouts', level: 0 },
    { id: 'last-page', label: 'Epilogue', level: 0 },
    { id: 'thank-you', label: 'Thank you', level: 0 },
    { id: 'footer', label: 'Connect', level: 0 },
]

export const SECTIONS: SectionConfig[] = [
    ...STATIC_SECTIONS,
    ...PROJECT_SECTIONS,
    ...END_SECTIONS,
]

export const SCROLL_DEBOUNCE_MS = 100
export const SCROLL_THROTTLE_MS = 50
