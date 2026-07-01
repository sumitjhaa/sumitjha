'use client'

import Image from 'next/image'
import { memo, useRef, useMemo } from 'react'
import { experience } from './data'
import { LinkHighlight, Icon } from '@/shared/components/ui'
import { SectionShell } from '@/shared/components/layout/SectionShell'
import { useTimelineLine } from './hooks/useTimelineLine'
import { TimelineLine } from './components/TimelineLine'
import type { ExperienceProps } from './types'
import styles from './Experience.module.css'

function Experience({ projectFilter, id = 'experience', hideHeading, isLast, companyData, projectsData }: ExperienceProps) {
    const activeCompany = companyData ?? experience.company
    const activeProjects = projectsData ?? experience.projects
    const companyName = activeCompany.name || 'Unknown'

    const filtered = useMemo(
        () => projectFilter
            ? activeProjects.filter((p) => projectFilter.includes(p.title))
            : activeProjects,
        [projectFilter, activeProjects],
    )

    const descRef = useRef<HTMLDivElement>(null)
    const lineHeight = useTimelineLine(descRef, id)

    return (
        <SectionShell id={id} heading={!hideHeading ? 'The Corporate Arc' : undefined}>
            <div ref={descRef} className={styles.descriptions}>
                <div className={styles.company}>
                    {activeCompany.logo ? (
                        <Image
                            src={activeCompany.logo}
                            alt={`${companyName} Logo`}
                            width={40}
                            height={40}
                            className={styles.logo}
                        />
                    ) : (
                        <div className={styles.fallbackLogo}>{companyName.charAt(0)}</div>
                    )}
                    <LinkHighlight href={activeCompany.href} color="#a7c08044" className={styles.subheading}>{companyName}</LinkHighlight>
                </div>
                
                <div className={styles.role}>
                    <span className={styles.roleMonospace}>{activeCompany.role}</span>
                </div>

                <div className={styles.meta}>
                    <span className={styles.location}>
                        <Icon name="pin" size={16} />
                        {activeCompany.location}
                    </span>
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
                            <LinkHighlight href={proj.href} color={proj.highlightColor ?? '#0ea5e944'} className={styles.projectTitle}>
                                {proj.title}
                            </LinkHighlight>
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
        </SectionShell>
    )
}

export default memo(Experience)
