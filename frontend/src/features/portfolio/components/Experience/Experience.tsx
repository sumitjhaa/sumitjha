'use client'

import Image from 'next/image'
import { memo, useMemo } from 'react'
import { experience } from './data'
import { LinkHighlight, Icon } from '@/shared/components/ui'
import { SectionShell } from '@/shared/components/layout/SectionShell'
import type { ExperienceProps } from './types'
import styles from './Experience.module.css'

function Experience({ id = 'experience', companyData, projectsData }: ExperienceProps) {
    const activeCompany = companyData ?? experience.company
    const activeProjects = projectsData ?? experience.projects
    const companyName = activeCompany.name || 'Unknown'

    const filtered = useMemo(() => activeProjects.filter(p => p.title !== companyName), [activeProjects, companyName])
    const allPoints = useMemo(() => activeProjects.flatMap(p => p.points), [activeProjects])

    return (
        <SectionShell id={id} heading="The Corporate Arc">
            <div className={styles.header}>
                <div className={styles.companyRow}>
                    {activeCompany.logo ? (
                        <Image
                            src={activeCompany.logo}
                            alt={`${companyName} Logo`}
                            width={48}
                            height={48}
                            className={styles.logo}
                        />
                    ) : (
                        <div className={styles.fallbackLogo}>{companyName.charAt(0)}</div>
                    )}
                    <div className={styles.headerText}>
                        <div className={styles.topRow}>
                            <LinkHighlight href={activeCompany.href} color="#a7c08044" className={styles.companyName}>
                                {companyName}
                            </LinkHighlight>
                            <span className={styles.location}>
                                <Icon name="pin" size={16} />
                                {activeCompany.location}
                            </span>
                        </div>
                        <div className={styles.bottomRow}>
                            <span className={styles.role}>{activeCompany.role}</span>
                            <span className={styles.period}>{activeCompany.period}</span>
                        </div>
                    </div>
                </div>
            </div>

            {filtered.length > 0 && (
                <div className={styles.projects}>
                    {filtered.map((proj, i) => (
                        <span key={proj.title} className={styles.projectTag}>
                            {i > 0 && <span className={styles.comma}>, </span>}
                            <LinkHighlight href={proj.href} color={proj.highlightColor ?? '#0ea5e944'}>
                                {proj.title}
                            </LinkHighlight>
                        </span>
                    ))}
                </div>
            )}

            {allPoints.length > 0 && (
                <ul className={styles.points}>
                    {allPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                    ))}
                </ul>
            )}
        </SectionShell>
    )
}

export default memo(Experience)
