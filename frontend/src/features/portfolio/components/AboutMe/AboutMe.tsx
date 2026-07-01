import { memo } from 'react'
import styles from './AboutMe.module.css'
import { LinkHighlight } from '@/shared/components/ui'
import { SectionShell } from '@/shared/components/layout/SectionShell'

function AboutMe() {
    return (
        <SectionShell id="about" heading="Who Am I ?" className={styles.about}>
            <div className={styles.descriptions}>
                <p>
                    I&apos;m CS Engineer
                    <img src="/img/inline-images/coder.gif" alt="" loading="lazy"  decoding="async" /> from NIT Allahabad — four
                    years of deadlines, coffee-powered
                    <img src="/img/inline-images/coffee-machine.gif" alt="" loading="lazy"  decoding="async" /> coding nights, and
                    occasional existential spiral.
                    <img
                        src="/img/inline-images/nepal-flag.gif"
                        className={styles.nepaliFlag}
                        alt=""
                        loading="lazy"
                     decoding="async" />
                    Nepali by roots, I grew up in{' '}
                    <LinkHighlight
                        href="https://www.google.com/maps/place/Parej,+Jharkhand+825326,+India/@23.8139771,85.5339749,17z/data=!4m6!3m5!1s0x39f48946b744bf5b:0xd6367a5ef96cce54!8m2!3d23.8126648!4d85.5348288!16s%2Fg%2F1tdpdl_q?hl=en&entry=ttu&g_ep=EgoyMDI2MDYyOC4wIKXMDSoASAFQAw%3D%3D"
                        color="#610AF545"
                    >
                        Parej
                    </LinkHighlight>
                    , balancing my time between my nana&apos;s stories and school homework that
                    somehow always followed me home.
                </p>

                <p>
                    Lately, I am rebuilding things
                    <img src="/img/inline-images/coder-typing.gif" alt="" loading="lazy"  decoding="async" /> and diving in
                    <img src="/img/inline-images/arch.png" alt="" className={styles.archImage} loading="lazy"  decoding="async" />
                    Arch linux mostly at the cost of sleep. Off the keyboard, you&apos;ll find me
                    watching anime, series, or movies.
                </p>

                <p>Code keeps me busy. Anime keeps me sane. Sarcasm keeps it real.</p>
                <img src="/img/backgrounds/totoro.gif" alt="" className={styles.background} loading="lazy"  decoding="async" />
            </div>
        </SectionShell>
    )
}

export default memo(AboutMe)
