import { memo } from 'react'
import styles from './ExperienceIntro.module.css'
import { SectionShell } from '@/shared/components/layout/SectionShell'

function ExperienceIntro() {
    return (
        <SectionShell id="experience-intro" heading="I have the logs" className={styles.intro}>
            <div className={styles.descriptions}>
                <p>
                    Back then, I thought software development was mostly about writing code.{' '}
                    <img
                        src="/img/inline-images/in-bushes.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />{' '}
                    Then came meetings, deadlines, production incidents, and &ldquo;quick&rdquo;
                    fixes.
                </p>
                <p>
                    Every ticket looked simple until it spawned three more.{' '}
                    <img
                        src="/img/inline-images/no-michael-scott.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />{' '}
                </p>
                <p>
                    I came, I coded, and I accidentally deployed on a Friday.{' '}
                    <img
                        src="/img/inline-images/dog in burning room.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />{' '}
                    <code className={styles.code}>March 13 2025</code>, <em>un</em>reviewed
                    migration as an intern (totally not my fault).
                </p>
                <p>
                    <img
                        src="/img/inline-images/Monkey covering eyes.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />
                    Turns out &ldquo;it works on my machine&rdquo; isn&apos;t an acceptable
                    deployment strategy.
                </p>
                <img src="/img/backgrounds/logs.gif" alt="" className={styles.background} loading="lazy" decoding="async" />
            </div>
        </SectionShell>
    )
}

export default memo(ExperienceIntro)
