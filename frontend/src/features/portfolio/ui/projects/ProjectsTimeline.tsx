'use client'

import Link from 'next/link'
import { PROJECTS, getProjectColor } from '@/features/portfolio/data/projects'
import styles from './ProjectsTimeline.module.css'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'

export function ProjectsTimeline() {
    const sorted = [...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className={styles.timeline}>
            <h2 className={styles.heading}>Project Timeline</h2>
            <div className={styles.list}>
                {sorted.map((project, i) => {
                    const color = getProjectColor(project.slug)
                    
                    return (
                        <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.item}>
                            <div className={styles.dot}>
                                <span>{i + 1}</span>
                            </div>
                            <div className={styles.line} />
                            <div className={styles.card}>
                                <img src={project.image} alt={project.title} className={styles.thumbnail} loading="lazy"  decoding="async" />
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
                                    <div className={styles.techs}>
                                        {project.technologies.map((t) => (
                                            <img key={t.name} src={t.icon} alt={t.name} className={styles.techIcon} title={t.name} loading="lazy"  decoding="async" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
