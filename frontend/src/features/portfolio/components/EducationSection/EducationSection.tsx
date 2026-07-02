'use client'

import { memo, useState, useCallback } from 'react'
import type { Position } from '@/shared/types'
import EduTooltip from './EduTooltip'
import { SectionShell } from '@/shared/components/layout/SectionShell'
import styles from './EducationSection.module.css'

const educationData = [
    {
        id: 'undergraduate',
        period: '2020 – 2024',
        institute: 'MNNIT, Allahabad',
        logo: '/img/educationicons/mnnit.png',
        location: 'Prayagraj, UP, India',
        degree: 'B.Tech CS',
        score: '7.85/10 CPI',
    },
    {
        id: 'highschool',
        period: '2017 – 2019',
        institute: 'DAV KVB School',
        logo: '/img/educationicons/DAV.png',
        location: 'Biratnagar, Morang, Nepal',
        degree: 'Senior Secondary (CBSE – PCM)',
        score: '81.8%',
    },
    {
        id: 'school',
        period: '2012 – 2017',
        institute: 'DAV KVB School',
        logo: '/img/educationicons/DAV.png',
        location: 'Biratnagar, Morang, Nepal',
        degree: 'Secondary Education (CBSE Class X)',
        score: '9.2/10 CGPA',
    },
    {
        id: 'primary',
        period: '2007 – 2012',
        institute: 'Holy Cross School',
        logo: '/img/educationicons/holy-cross-school.png',
        location: 'Ghatotand, Hazaribagh, Jharkhand, India',
        degree: 'Classes II, III, IV, V, VI',
    },
    {
        id: 'kindergarten',
        period: '2005 – 2007',
        institute: 'Sharda Shishu Vikas School',
        logo: '/img/educationicons/sharda-shishu-vikas-school.png',
        location: 'Parej, Tapin, Ramgarh, Jharkhand, India',
        degree: 'LKG, UKG, I',
    },
]

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
                    <div key={entry.id}>
                        <div
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
                    </div>
                ))}
            </div>

            <EduTooltip data={tooltip} pos={pos} />
        </SectionShell>
    )
}

export default memo(EducationSection)
