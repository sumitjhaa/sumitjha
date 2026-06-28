import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PROJECTS } from '@/features/portfolio/ui/projects'

interface Props {
    params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
    return PROJECTS.map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug)
    if (!project) notFound()

    return (
        <main style={{
            width: '720px',
            margin: '0 auto',
            padding: '60px 20px',
            lineHeight: '1.6em',
        }}>
            <Link href="/" style={{
                color: 'var(--primary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                display: 'inline-block',
                marginBottom: '24px',
            }}>
                &larr; Back
            </Link>

            <img
                src={project.image}
                alt={project.title}
                style={{
                    width: '100%',
                    maxHeight: '400px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    marginBottom: '24px',
                }}
            />

            <h1 style={{
                fontSize: 'var(--heading-size)',
                fontWeight: 'var(--heading-weight)',
                margin: '0 0 8px',
            }}>
                {project.title}
            </h1>

            <p style={{
                color: 'var(--base-300)',
                fontSize: '1.1rem',
                margin: '0 0 4px',
            }}>
                {project.status} &middot; {new Date(project.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>

            <p style={{
                color: 'var(--body-color)',
                fontSize: 'var(--body-size)',
                lineHeight: '1.5em',
                margin: '20px 0',
            }}>
                {project.description}
            </p>

            <div style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '24px',
            }}>
                {project.technologies.map((t) => (
                    <span key={t.name} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        background: 'var(--neutral)',
                        fontSize: '0.8rem',
                        color: 'var(--base-100)',
                    }}>
                        <img src={t.icon} alt="" style={{ width: '16px', height: '16px' }} />
                        {t.name}
                    </span>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
                {project.links.map((link) => (
                    <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            padding: '10px 20px',
                            borderRadius: '6px',
                            background: 'var(--primary)',
                            color: 'var(--primary-content)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                        }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>
        </main>
    )
}
