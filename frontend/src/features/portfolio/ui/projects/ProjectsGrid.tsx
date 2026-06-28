'use client'

import Link from 'next/link'
import { PROJECTS } from './data'
import styles from './ProjectsGrid.module.css'

export function ProjectsGrid() {
    const sorted = [...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Projects</h2>
            <div className={styles.grid}>
                {sorted.map((project) => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.card}>
                        <img src={project.image} alt={project.title} className={styles.image} />
                        <div className={styles.info}>
                            <h3 className={styles.title}>{project.title}</h3>
                            <p className={styles.desc}>{project.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
