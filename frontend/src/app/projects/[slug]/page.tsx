import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/features/portfolio/data/projects'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'
import styles from './ProjectPage.module.css'

interface Props {
    params: Promise<{ slug: string }>
}

const colorMap: Record<string, string> = {
    'otakudoro': 'rgba(254, 240, 138, 0.5)',
    'tugnotes': 'rgba(252, 165, 165, 0.5)',
    'charcha': 'rgba(147, 197, 253, 0.5)',
    'freddit': 'rgba(165, 180, 252, 0.5)',
    'vigilante': 'rgba(204, 122, 255, 0.5)',
    'tick': 'rgba(74, 222, 128, 0.5)',
    'dragnotes': 'rgba(254, 240, 138, 0.5)',
    'ziggle': 'rgba(252, 165, 165, 0.5)',
}

export async function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }))
}

function getProjectColor(slug: string): string {
    const projectColors = [
        'rgba(254, 240, 138, 0.5)',
        'rgba(252, 165, 165, 0.5)',
        'rgba(147, 197, 253, 0.5)',
        'rgba(165, 180, 252, 0.5)',
        'rgba(204, 122, 255, 0.5)',
        'rgba(74, 222, 128, 0.5)',
    ]
    return colorMap[slug] || projectColors[slug.length % projectColors.length]
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug)
    if (!project) notFound()

    return (
        <main className={styles.main}>
            <Link href="/" className={styles.backLink}>
                &larr; Back
            </Link>

            <img src={project.image} alt={project.title} className={styles.image} />

            <h1 className={styles.title}>
                <LinkHighlight
                    href={project.links.find(l => l.label.toLowerCase() === 'github')?.url}
                    color={getProjectColor(project.slug)}
                >
                    {project.title}
                </LinkHighlight>
            </h1>

            <p className={styles.meta}>
                {project.status} &middot; {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>

            <p className={styles.description}>{project.description}</p>

            <div className={styles.techList}>
                {project.technologies.map((t) => (
                    <span key={t.name} className={styles.techItem}>
                        <img src={t.icon} alt="" className={styles.techIcon} />
                        {t.name}
                    </span>
                ))}
            </div>

            <div className={styles.linkList}>
                {project.links.map((link) => (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </main>
    )
}
