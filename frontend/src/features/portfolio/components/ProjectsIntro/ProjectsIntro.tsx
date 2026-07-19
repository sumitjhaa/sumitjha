import { memo } from 'react'
import styles from './ProjectsIntro.module.css'
import { SectionShell } from '@/shared/components/layout/SectionShell'

function ProjectsIntro() {
    return (
        <SectionShell id="projects-intro" heading="Version Controlled Chaos" className={styles.intro}>
            <div className={styles.descriptions}>
                <p>
                    Every project began with &ldquo;How hard could it be?&rdquo;{' '}
                    <img
                        src="/img/inline-images/crying-smile-crying.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                        loading="lazy"
                     decoding="async" />{' '}
                    Famous last words. If debugging is removing bugs, then programming is adding
                    them.{' '}
                    <img
                        src="/img/inline-images/dog staring at screen.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                        loading="lazy"
                     decoding="async" />{' '}
                    The runtime took that personally. May the source be with me.
                </p>
                <p>Some shipped. Some learned. None were built by vibe coding.</p>
                <img src="/img/backgrounds/swing.gif" alt="" className={styles.background} loading="lazy" decoding="async" />
            </div>
        </SectionShell>
    )
}

export default memo(ProjectsIntro)
