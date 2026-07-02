'use client'

import { memo, useState, useCallback } from 'react'
import type { Position } from '@/shared/types'
import EduTooltip from './EduTooltip'
import { SectionShell } from '@/shared/components/layout/SectionShell'
import { educationData } from '@/features/portfolio/data/education'
import styles from './EducationSection.module.css'

function EducationSection() {
    const [tooltip, setTooltip] = useState<{
        logo: string
        institute: string
        location: string
    } | null>(null)
    const [pos, setPos] = useState<Position>({ x: 0, y: 0 })

    const handleMouseEnter = useCallback(
        (entry: (typeof educationData)[number], e: React.MouseEvent) => {
            setTooltip({ logo: entry.logo, institute: entry.institute, location: entry.location })
            setPos({ x: e.clientX, y: e.clientY })
        },
        [],
    )

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setPos({ x: e.clientX, y: e.clientY })
    }, [])

    const handleMouseLeave = useCallback(() => setTooltip(null), [])

    return (
        <SectionShell id="education" heading="Education" className={styles.rows}>
            <div className={styles.rows}>
                {educationData.map((entry) => (
                    <div
                        key={entry.id}
                        className={styles.row}
                        onMouseEnter={(e) => handleMouseEnter(entry, e)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                            <div className={styles.info}>
                                <div className={styles.instituteRow}>
                                    <span className={styles.institute}>{entry.institute}</span>
                                    <span className={styles.period}>{entry.period}</span>
                                </div>
                                <div className={styles.degreeRow}>
                                    <span className={styles.degree}>{entry.degree}</span>
                                    {entry.score && (
                                        <span className={styles.score}>{entry.score}</span>
                                    )}
                                </div>
                            </div>
                    </div>
                ))}
            </div>

            <EduTooltip data={tooltip} pos={pos} />
        </SectionShell>
    )
}

export default memo(EducationSection)
