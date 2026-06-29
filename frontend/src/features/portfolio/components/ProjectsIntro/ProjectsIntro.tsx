import { memo } from 'react'
import styles from './ProjectsIntro.module.css'

function ProjectsIntro() {
    return (
        <section id="projects-intro" className={styles.projectsIntro}>
            <h1 className={styles.heading}>Version Controlled Chaos</h1>
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
                    />{' '}
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
                    />{' '}
                    The runtime took that personally. May the source be with me.
                </p>
                <p>Some shipped. Some learned. None were built by vibe coding.</p>
            </div>
        </section>
    )
}

export default memo(ProjectsIntro)
