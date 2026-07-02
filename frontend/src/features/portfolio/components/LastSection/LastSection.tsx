import { memo } from 'react'
import styles from './LastSection.module.css'
import { SectionShell } from '@/shared/components/layout/SectionShell'

function LastSection() {
    return (
        <SectionShell id="last-page" heading="That&apos;s All Folks" className={styles.page}>
            <div className={styles.descriptions}>
                <p>
                    If you&apos;ve made it this far, congratulations—you&apos;ve survived the lore.
                    If you have an interesting problem, an ambitious idea, or just want to argue
                    about tabs versus spaces,
                    <img
                        src="/img/inline-images/dwight-nodding.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />
                    my inbox is open.
                </p>

                <p>
                    No developers were permanently harmed during the making of this portfolio. Some
                    bugs escaped into production.
                    <img
                        src="/img/inline-images/winter-is-coming.gif"
                        className="inlineImage"
                        alt=""
                        loading="lazy"
                     decoding="async" />
                    Others were promoted to features.
                </p>

                <p className={styles.tagline}>Until the next commit...</p>
            </div>
        </SectionShell>
    )
}

export default memo(LastSection)
