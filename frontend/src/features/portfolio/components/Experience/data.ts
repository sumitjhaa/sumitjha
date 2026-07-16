import type { CompanyData, ProjectData } from '@/shared/types/experience'

export const experience: {
    company: CompanyData
    projects: ProjectData[]
} = {
    company: {
        name: 'Prismberry',
        logo: '/img/experienceicons/prismberry.webp',
        location: 'Noida, UP, India',
        role: 'Software Developer',
        period: 'Jan – Nov 2025',
        href: 'https://prismberry.com',
    },
    projects: [
        {
            title: 'Prismberry',
            href: 'https://prismberry.com',
            highlightColor: '#a7c08044',
            description: '',
            points: [
                'Redesigned reward and tax-filing workflow dashboards, reducing navigation by ~15 steps and boosting load speed by ~40%.',
                'Delivered front-end architecture across 6 client products, building dashboards from scratch with polymorphic components.',
                'Debugged and resolved 60+ production issues on live dashboards, implementing inline validation that cut errors to ~10%.',
                'Established design-system standards and built a reusable component library scaled across 220+ modules.',
                'Integrated ITR tax-filing APIs into the ERI dashboard, enabling real-time return validation and submission.',
            ],
        },
        {
            title: 'TaxSpanner',
            href: 'https://taxspanner.com',
            highlightColor: '#0ea5e944',
            description: '',
            points: [],
        },
        {
            title: 'Propel',
            href: 'https://propel.com',
            highlightColor: '#a7c08044',
            description: '',
            points: [],
        },
    ],
}
