'use client'

import Link from 'next/link'
import { PROJECTS } from './data'
import styles from './ProjectsGrid.module.css'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'

// Color palette for projects to ensure punchy colors
const projectColors = [
    'rgba(254, 240, 138, 0.5)',    // yellow
    'rgba(252, 165, 165, 0.5)',    // red
    'rgba(147, 197, 253, 0.5)',    // blue
    'rgba(165, 180, 252, 0.5)',    // indigo
    'rgba(204, 122, 255, 0.5)',    // purple
    'rgba(74, 222, 128, 0.5)',    // green
]

const colorMap: Record<string, string> = {
    'otakudoro': 'rgba(254, 240, 138, 0.5)',        // yellow
    'tugnotes': 'rgba(252, 165, 165, 0.5)',        // red
    'charcha': 'rgba(147, 197, 253, 0.5)',          // blue
    'freddit': 'rgba(165, 180, 252, 0.5)',         // indigo
    'vigilante': 'rgba(204, 122, 255, 0.5)',      // purple
    'tick': 'rgba(74, 222, 128, 0.5)',              // green
    'dragnotes': 'rgba(254, 240, 138, 0.5)',       // yellow (same as otakudoro)
    'ziggle': 'rgba(252, 165, 165, 0.5)',        // red (same as tugnotes)
}

export function ProjectsGrid() {
    const sorted = [...PROJECTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className={styles.section}>
            <h2 className={styles.heading}>Projects</h2>
            <div className={styles.grid}>
                {sorted.map((project) => {
                    const color = colorMap[project.slug] || projectColors[project.slug.length % projectColors.length]
                    
                    return (
                        <Link key={project.slug} href={`/projects/${project.slug}`} className={styles.card}>
                            <img src={project.image} alt={project.title} className={styles.image} />
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
