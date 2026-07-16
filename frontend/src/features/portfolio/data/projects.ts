export interface ProjectLink {
    label: string
    url: string
}

export interface ProjectTech {
    name: string
    icon: string
    color: string
}

export interface Project {
    slug: string
    title: string
    description: string
    image: string
    technologies: ProjectTech[]
    links: ProjectLink[]
    date: string
    status: string
}

export const PROJECT_COLOR_MAP: Record<string, string> = {
    poof: 'rgba(74, 222, 128, 0.5)',
    tokenprobe: 'rgba(204, 122, 255, 0.5)',
    marknotes: 'rgba(147, 197, 253, 0.5)',
}

const PROJECT_COLORS_FALLBACK = [
    'rgba(74, 222, 128, 0.5)',
    'rgba(204, 122, 255, 0.5)',
    'rgba(147, 197, 253, 0.5)',
]

export function getProjectColor(slug: string): string {
    return (
        PROJECT_COLOR_MAP[slug] ||
        PROJECT_COLORS_FALLBACK[slug.length % PROJECT_COLORS_FALLBACK.length]
    )
}

export const PROJECTS: Project[] = [
    {
        slug: 'poof',
        title: 'Poof',
        description:
            'A zero-knowledge secret-sharing platform with AES-256-GCM encryption across API, web, CLI, and browser extension. Built with FastAPI and Next.js, featuring sliding-window rate limiting, 4 expiry models, and 1,500+ lines of automated tests covering encryption, expiry, and audit trails.',
        image: '/img/projects/poof.png',
        technologies: [
            { name: 'FastAPI', icon: '/img/techicons/fastapi.svg', color: '#009688' },
            { name: 'Next.js', icon: '/img/techicons/nextjs.svg', color: '#000000' },
            { name: 'PostgreSQL', icon: '/img/techicons/psql.svg', color: '#4169E1' },
            { name: 'Redis', icon: '/img/techicons/redis.svg', color: '#DC382D' },
            { name: 'Docker', icon: '/img/techicons/docker.svg', color: '#2496ED' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/poof' },
            { label: 'Live', url: 'https://pooof.vercel.app/' },
        ],
        date: '2026-06-15',
        status: 'Completed',
    },
    {
        slug: 'tokenprobe',
        title: 'TokenProbe',
        description:
            'A JWT security auditing tool that detects 14 vulnerability classes including algorithm confusion attacks (RS256 → HS256). Architected with a Protocol-based Check Registry pattern, processing tokens in under 1 second with ~100 tokens/sec throughput. Ships as a GitHub Action with 10 configurable parameters.',
        image: '/img/projects/tokenprobe.png',
        technologies: [
            { name: 'Python', icon: '/img/techicons/python.svg', color: '#3776AB' },
            { name: 'FastAPI', icon: '/img/techicons/fastapi.svg', color: '#009688' },
            { name: 'React', icon: '/img/techicons/react.svg', color: '#61DAFB' },
            { name: 'TypeScript', icon: '/img/techicons/ts.svg', color: '#3178C6' },
            { name: 'Docker', icon: '/img/techicons/docker.svg', color: '#2496ED' },
            { name: 'GitHub Actions', icon: '/img/icons/github.svg', color: '#333333' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/tokenprobe' },
            { label: 'Live', url: 'https://tokenprobe.vercel.app/' },
        ],
        date: '2026-06-01',
        status: 'Completed',
    },
    {
        slug: 'marknotes',
        title: 'MarkNotes',
        description:
            'A zero-knowledge markdown notes platform with client-side AES-256-GCM encryption and threaded comments. Built with Astro/React frontend and FastAPI backend, featuring an 8-table schema with 11 indexes where only encrypted content is stored — full DB compromise reveals nothing readable.',
        image: '/img/projects/tick.png',
        technologies: [
            { name: 'Astro', icon: '/img/techicons/astro.svg', color: '#FF5D01' },
            { name: 'React', icon: '/img/techicons/react.svg', color: '#61DAFB' },
            { name: 'FastAPI', icon: '/img/techicons/fastapi.svg', color: '#009688' },
            { name: 'PostgreSQL', icon: '/img/techicons/psql.svg', color: '#4169E1' },
            { name: 'TypeScript', icon: '/img/techicons/ts.svg', color: '#3178C6' },
        ],
        links: [
            { label: 'GitHub', url: 'https://github.com/sumitjhaa/marknotes' },
        ],
        date: '2026-06-20',
        status: 'Ongoing',
    },
]
