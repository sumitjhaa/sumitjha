import { memo } from 'react'
import styles from './LastPage.module.css'

function LastPage() {
    return (
        <section id="last-page" className={styles.page}>
            <h1 className={styles.heading}>That&apos;s All Folks</h1>

            <div className={styles.descriptions}>
                <p>
                    If you&apos;ve made it this far, congratulations—you&apos;ve survived the lore.
                    If you have an interesting problem, an ambitious idea, or just want to argue
                    about tabs versus spaces,
                    <img
                        src="/img/inline-images/dwight-nodding.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />
                    my inbox is open.
                </p>

                <p>
                    No developers were permanently harmed during the making of this portfolio. Some
                    bugs escaped into production.
                    <img
                        src="/img/inline-images/winter-is-coming.gif"
                        style={{
                            height: '1.5em',
                            borderRadius: '5px',
                            verticalAlign: 'middle',
                            margin: '0 0.15em',
                        }}
                        alt=""
                    />
                    Others were promoted to features.
                </p>

                <p className={styles.tagline}>Until the next commit...</p>
            </div>
        </section>
    )
}

export default memo(LastPage)
