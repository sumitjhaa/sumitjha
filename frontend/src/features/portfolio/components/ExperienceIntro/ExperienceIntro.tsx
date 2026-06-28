import { memo } from 'react'
import styles from './ExperienceIntro.module.css'

function ExperienceIntro() {
    return (
        <section id="experience-intro" className={styles.section}>
            <h1 className={styles.heading}>I have the logs</h1>
            <div className={styles.descriptions}>
                <p>
                    Back then, I thought software development was mostly about writing code.{' '}
                    <img
                        src="/img/inline-images/in-bushes.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />{' '}
                    Then came meetings, deadlines, production incidents, and &ldquo;quick&rdquo;
                    fixes.
                </p>
                <p>
                    Every ticket looked simple until it spawned three more.{' '}
                    <img
                        src="/img/inline-images/no-michael-scott.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />{' '}
                </p>
                <p>
                    I came, I coded, and I accidentally deployed on a Friday.{' '}
                    <img
                        src="/img/inline-images/dog in burning room.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />{' '}
                    <code className={styles.code}>March 13 2025</code>, <em>un</em>reviewed
                    migration as an intern (totally not my fault).
                </p>
                <p>
                    <img
                        src="/img/inline-images/Monkey covering eyes.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />
                    Turns out &ldquo;it works on my machine&rdquo; isn&apos;t an acceptable
                    deployment strategy.
                </p>
            </div>
        </section>
    )
}

export default memo(ExperienceIntro)
