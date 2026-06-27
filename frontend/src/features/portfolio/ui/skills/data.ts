export interface Skill {
    id: string
    name: string
    icon: string
    category: string
    iconScale?: number
    color: string
    description?: string
}

export type SkillCategory = {
    label: string
    items: Skill[]
}

const techIcons = '/img/techicons'

export const SKILL_CATEGORIES: SkillCategory[] = [
    {
        label: 'Languages',
        items: [
            { id: 'python', name: 'Python', icon: `${techIcons}/python.svg`, color: '#3776AB', category: 'Languages', description: 'A readable language used for AI, backend servers, and automation. Its vast ecosystem means you rarely build from scratch. Python is the go-to for rapid development — from startups to NASA.' },
            { id: 'js', name: 'JavaScript', icon: `${techIcons}/js.svg`, color: '#F7DF1E', category: 'Languages', description: 'The universal language of the web — every browser speaks it. Powers interactive sites, real-time apps, and backend servers. For any web project, JavaScript is not optional — it is essential.' },
            { id: 'ts', name: 'TypeScript', icon: `${techIcons}/ts.svg`, color: '#3178C6', category: 'Languages', description: 'JavaScript with static typing — catches bugs before production. Better tooling, autocomplete, and refactoring confidence. Makes large codebases maintainable and impossible states impossible.' },
            { id: 'cpp', name: 'C++', icon: `${techIcons}/cpp.svg`, color: '#00599C', category: 'Languages', description: 'Complete control over memory, threads, and hardware. Used in game engines, operating systems, and real-time simulations. For performance-critical projects, C++ is the uncompromising choice.' },
            { id: 'go', name: 'Go', icon: `${techIcons}/golang.webp`, iconScale: 1.25, color: '#00ADD8', category: 'Languages', description: 'A compiled language from Google — compiles to a single binary in seconds. Handles concurrency with lightweight goroutines. Ideal for microservices and high-performance servers.' },
        ],
    },
    {
        label: 'Frameworks',
        items: [
            { id: 'rails', name: 'Rails', icon: `${techIcons}/rails.svg`, color: '#CC0000', category: 'Frameworks', description: 'A full-stack Ruby framework with everything built-in — ORM, routing, migrations, testing. Convention over configuration means less boilerplate. Legendary for turning ideas into shipped products in days.' },
            { id: 'react', name: 'React', icon: `${techIcons}/react.svg`, color: '#61DAFB', category: 'Frameworks', description: 'A component-based UI library by Meta. Virtual DOM ensures fast updates and reusable components make code testable. The largest frontend ecosystem — the safe, battle-tested foundation for modern web apps.' },
            { id: 'nextjs', name: 'Next.js', icon: `${techIcons}/nextjs.svg`, color: '#000000', category: 'Frameworks', description: 'A React framework with server-side rendering, static generation, and API routes built-in. Faster pages, better SEO, and automatic optimizations. Eliminates the hard parts of production React.' },
            { id: 'django', name: 'Django', icon: `${techIcons}/django.svg`, color: '#092E20', category: 'Frameworks', description: 'A Python web framework with ORM, auth, admin panel, and more built-in. Clean, maintainable code with model-view-template architecture. Battle-tested by Instagram and Mozilla.' },
            { id: 'fastapi', name: 'FastAPI', icon: `${techIcons}/fastapi.svg`, color: '#009688', category: 'Frameworks', description: 'A modern Python API framework with automatic OpenAPI docs and async performance. Request validation built-in. The fastest way to build and document your API endpoints.' },
        ],
    },
    {
        label: 'Databases',
        items: [
            { id: 'mongo', name: 'MongoDB', icon: `${techIcons}/mongo.svg`, iconScale: 1.15, color: '#47A248', category: 'Databases', description: 'A NoSQL database with flexible JSON-like documents — no migrations, no rigid schemas. Scales horizontally and handles unstructured data with ease. Perfect for projects that need to iterate fast without database friction.' },
            { id: 'mysql', name: 'MySQL', icon: `${techIcons}/mysql.svg`, color: '#4479A1', category: 'Databases', description: 'The world\'s most popular open-source database — powers Facebook and YouTube. Great performance, strong replication, and a massive community. The reliable workhorse for any project that needs a battle-tested relational database.' },
            { id: 'psql', name: 'PostgreSQL', icon: `${techIcons}/psql.svg`, color: '#4169E1', category: 'Databases', description: 'The gold standard of open-source relational databases. Supports complex queries, JSON, full-text search, and geospatial data. Scales from a laptop to enterprise clusters — reliable, flexible, and feature-rich.' },
        ],
    },
]

export const ALL_SKILLS = SKILL_CATEGORIES.flatMap((c) => c.items)
