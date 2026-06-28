'use client'

import Link from 'next/link'
import { PROJECTS } from './data'
import styles from './ProjectsTimeline.module.css'

export function ProjectsTimeline() {
    const sorted = [...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className={styles.timeline}>
            <h2 className={styles.heading}>Project Timeline</h2>
            <div className={styles.list}>
                {sorted.map((project, i) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.item}>
                        <div className={styles.dot}>
                            <span>{i + 1}</span>
                        </div>
                        <div className={styles.line} />
                        <div className={styles.card}>
                            <img src={project.image} alt={project.title} className={styles.thumbnail} />
                            <div className={styles.info}>
                                <h3 className={styles.title}>{project.title}</h3>
                                <p className={styles.desc}>{project.description}</p>
                                <div className={styles.techs}>
                                    {project.technologies.map((t) => (
                                        <img key={t.name} src={t.icon} alt={t.name} className={styles.techIcon} title={t.name} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
