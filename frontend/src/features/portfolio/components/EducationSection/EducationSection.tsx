import { memo } from 'react'
import Image from 'next/image'
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
        institute: 'DAV Kedia Vishwabharti School',
        logo: '/img/educationicons/DAV.png',
        location: 'Biratnagar, Morang, Nepal',
        degree: 'Senior Secondary (CBSE – PCM)',
        score: '81.8%',
    },
    {
        id: 'school',
        period: '2012 – 2017',
        institute: 'DAV Kedia Vishwabharti School',
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
    return (
        <section id="education" className={styles.page}>
            <h1 className={styles.heading}>Education</h1>

            <div className={styles.rows}>
                {educationData.map((entry, i) => (
                    <div key={entry.id}>
                        {i > 0 && (
                            <div className={styles.separator} aria-hidden="true" />
                        )}
                        <div className={styles.row}>
                            <div className={styles.logoCol}>
                                <Image
                                    src={entry.logo}
                                    alt={`${entry.institute} Logo`}
                                    width={88}
                                    height={88}
                                    className={styles.logo}
                                />
                            </div>
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
                                <div className={styles.locationRow}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.pin}>
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <span className={styles.location}>{entry.location}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default memo(EducationSection)
