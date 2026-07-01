import { SectionShell } from '@/shared/components/layout/SectionShell'
import styles from './CommitmentSection.module.css'
import { CommitCardClient, type CommitData } from './CommitCardClient'
import { MonthlyHeatmap } from './MonthlyHeatmap'
import { getLastCommit, getMonthlyCommits } from './api'
import { GITHUB_PROFILE_URL } from './constants'

function CommitCard({ commit, totalCommits }: { commit: CommitData; totalCommits?: number }) {
    return <CommitCardClient initial={commit} totalCommits={totalCommits} />
}

export default async function CommitmentSection() {
    const [commit, heatmap] = await Promise.all([getLastCommit(), getMonthlyCommits()])

    return (
        <SectionShell id="commitment" heading="Very Committed">
            <div className={styles.scrollArea}>
                {heatmap ? (
                    <MonthlyHeatmap data={heatmap} />
                ) : (
                    <p className={styles.heatmapFallback}>
                        Contribution data unavailable right now.{' '}
                        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                            View on GitHub →
                        </a>
                    </p>
                )}

                {commit ? (
                    <CommitCard commit={commit} totalCommits={heatmap?.totalCommits} />
                ) : (
                    <p className={styles.fallback}>
                        Couldn&apos;t fetch the latest commit right now.{' '}
                        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                            See activity on GitHub →
                        </a>
                    </p>
                )}
            </div>
        </SectionShell>
    )
}
