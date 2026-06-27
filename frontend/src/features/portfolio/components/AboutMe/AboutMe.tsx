import { memo } from 'react'
import styles from './AboutMe.module.css'

function AboutMe() {
    return (
        <section id="about" className={styles.about}>
            <h1 className={styles.heading}>Who Am I ?</h1>

            <div className={styles.descriptions}>
                <p>
                    I&apos;m CS Engineer
                    <img src="/img/inline-images/coder.gif" alt="" /> from NIT Allahabad — four
                    years of deadlines, coffee-powered
                    <img src="/img/inline-images/coffee-machine.gif" alt="" /> coding nights, and
                    occasional existential spiral.
                    <img
                        src="/img/inline-images/nepal-flag.gif"
                        className={styles.nepaliFlag}
                        alt=""
                    />
                    Nepali by roots, I grew up in Parej, balancing my time between my nana&apos;s
                    stories and school homework that somehow always followed me home.
                </p>

                <p>
                    Lately, I am rebuilding things
                    <img src="/img/inline-images/coder-typing.gif" alt="" /> and diving in
                    <img src="/img/inline-images/arch.png" alt="" className={styles.archImage} />
                    Arch linux mostly at the cost of sleep. Off the keyboard, you&apos;ll find me
                    watching anime, series, or movies.
                </p>

                <p>Code keeps me busy. Anime keeps me sane. Sarcasm keeps it real.</p>
                <img src="/img/backgrounds/totoro.gif" alt="" className={styles.background} />
            </div>
        </section>
    )
}

export default memo(AboutMe)
