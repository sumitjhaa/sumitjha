import { memo } from 'react'
import styles from './ShoutoutsSection.module.css'
import { SectionShell } from '@/shared/components/layout/SectionShell'

function ShoutoutsSection() {
    return (
        <SectionShell id="shoutouts" heading="Shoutouts" className={styles.page}>
            <div className={styles.body}>
                <p className={styles.intro}>
                    Turns out the real plot twist wasn&apos;t the bugs—it was meeting people who made
                    excellence look completely normal.
                </p>

                <p className={styles.text}>
                    <strong className={styles.name}>Shagun</strong> handed me the steering wheel.{' '}
                    <strong className={styles.name}>Mukesh</strong> had a habit of quietly and
                    annoyingly moved the finish line.{' '}
                    <strong className={styles.name}>Surabhi</strong> kept reminding me that proved
                    that readable code saves lives.{' '}
                    <strong className={styles.name}>Saurabh</strong> had an alarming tendency to make
                    impossible problems disappear.
                </p>

                <p className={styles.outro}>
                    My confidence never fully recovered, and my ego never had the high ground.
                </p>
            </div>
        </SectionShell>
    )
}

export default memo(ShoutoutsSection)
