'use client'

import Image from 'next/image'
import { memo, useRef, useMemo } from 'react'
import { experience } from './data'
import { useTimelineLine } from './hooks/useTimelineLine'
import { TimelineLine } from './components/TimelineLine'
import { PinIcon } from './components/PinIcon'
import type { ExperienceProps } from './types'
import styles from './Experience.module.css'

function Experience({ projectFilter, id = 'experience', hideHeading, isLast, nextPageId, companyData, projectsData }: ExperienceProps) {
    const activeCompany = companyData ?? experience.company
    const activeProjects = projectsData ?? experience.projects
    const companyName = activeCompany.name || 'Unknown'

    const filtered = useMemo(
        () => projectFilter
            ? activeProjects.filter((p) => projectFilter.includes(p.title))
            : activeProjects,
        [projectFilter, activeProjects],
    )

    const sectionRef = useRef<HTMLElement>(null)
    const descRef = useRef<HTMLDivElement>(null)
    const lineHeight = useTimelineLine(sectionRef, descRef)

    return (
        <section id={id} ref={sectionRef} className={styles.section}>
            {!hideHeading && <h1 className={styles.heading}>The Corporate Arc</h1>}
            <div ref={descRef} className={styles.descriptions}>
                <div className={styles.company}>
                    {activeCompany.logo ? (
                        <Image
                            src={activeCompany.logo}
                            alt={`${companyName} Logo`}
                            width={52}
                            height={52}
                            className={styles.logo}
                        />
                    ) : (
                        <div className={styles.fallbackLogo}>{companyName.charAt(0)}</div>
                    )}
                    <span className={styles.subheading}>{companyName}</span>
                    <span className={styles.sep}>&middot;</span>    
                    <span className={styles.roleMonospace}>{activeCompany.role}</span>
                </div>

                <div className={styles.meta}>
                    <PinIcon />
                    <span className={styles.location}>{activeCompany.location}</span>
                    <span className={styles.sep}>&middot;</span>
                    <span className={styles.period}>{activeCompany.period}</span>
                </div>

                {filtered.length === 0 && (
                    <div className={styles.project}>
                        <div className={styles.projectDesc}>No projects to display.</div>
                    </div>
                )}

                {filtered.map((proj) => (
                    <div key={proj.title} className={styles.project}>
                        <div className={styles.projectHeader}>
                            <span className={`${styles.projectTitle} ${proj.highlight}`}>
                                {proj.title}
                            </span>
                        </div>
                        <div className={styles.projectDesc}>{proj.description}</div>
                        {proj.points.length > 0 ? (
                            <ul className={styles.points}>
                                {proj.points.map((point, i) => (
                                    <li key={i}>{point}</li>
                                ))}
                            </ul>
                        ) : (
                            <div className={styles.projectDesc}>No details available.</div>
                        )}
                    </div>
                ))}
                <TimelineLine lineHeight={lineHeight} isLast={isLast} />
            </div>
        </section>
    )
}

export default memo(Experience)
