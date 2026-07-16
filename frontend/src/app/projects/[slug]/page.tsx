import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS, getProjectColor } from '@/features/portfolio/data/projects'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'
import { SoundButton } from '@/features/portfolio/ui/common/SoundButton/SoundButton'
import styles from './ProjectPage.module.css'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug)
    if (!project) return {}
    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: project.image }],
        },
    }
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

            <div className={styles.imageWrapper}>
                <Image src={project.image} alt={project.title} fill className={styles.image} sizes="(max-width: 768px) 100vw, 768px" />
            </div>

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
                        <img src={t.icon} alt={t.name} className={styles.techIcon} loading="lazy"  decoding="async" />
                        {t.name}
                    </span>
                ))}
            </div>

            <div className={styles.linkList}>
                {project.links.map((link) => (
                    <SoundButton
                        key={link.label}
                        as="a"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                    >
                        {link.label}
                    </SoundButton>
                ))}
            </div>
        </main>
    )
}
