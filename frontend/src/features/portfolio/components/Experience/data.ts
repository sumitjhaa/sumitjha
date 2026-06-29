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
        period: 'Jan – Oct 2025',
        href: 'https://prismberry.com',
    },
    projects: [
        {
            title: 'Taxspanner',
            href: 'https://taxspanner.com',
            highlightColor: '#0ea5e944',
            description:
                'Tax compliance platform for digital filing of TDS, GST, and income tax returns.',
            points: [
                'Django, DRF & Next.js — built core tax workflows',
                '500+ users — accelerated ITR-1 & ITR-4 filing',
                '30+ components — 25% faster feature dev cycles',
                '30% API latency cut — query & cache tuning',
                '20% adoption spike in 3 months — UX iteration',
                'Reduced form errors by 15% with inline validations',
                'Automated TDS/GST reconciliation — saved 10+ hrs/week',
            ],
        },
        {
            title: 'Propel',
            href: 'https://app.zagglepropel.com/features/login',
            highlightColor: '#ef444444',
            description:
                'Business management platform for operations, finance, and team collaboration.',
            points: [
                '500+ users — dynamic finance & ops reports (ERB)',
                '40% manual effort cut — automated with Ruby parsers',
                'Scaled card & tx workflows — Rails + PostgreSQL',
                '35% reporting delays reduced — cross-functional sync',
                'Built real-time dashboards — cut decision lag by 50%',
                'Integrated 3 payment gateways — expanded billing coverage',
            ],
        },
    ],
}
