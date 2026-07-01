'use client'

import Link from 'next/link'
import { PROJECTS, getProjectColor } from '@/features/portfolio/data/projects'
import styles from './ProjectsGrid.module.css'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'

export function ProjectsGrid() {
    const sorted = [...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Projects</h2>
            <div className={styles.grid}>
                {sorted.map((project) => {
                    const color = getProjectColor(project.slug)
                    
                    return (
                        <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.card}>
                            <img src={project.image} alt={project.title} className={styles.image} loading="lazy"  decoding="async" />
                            <div className={styles.info}>
                                <h3 className={styles.title}>
                                    <LinkHighlight 
                                        href={`/projects/${project.slug}`}
                                        color={color}
                                    >
                                        {project.title}
                                    </LinkHighlight>
                                </h3>
                                <p className={styles.desc}>{project.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
