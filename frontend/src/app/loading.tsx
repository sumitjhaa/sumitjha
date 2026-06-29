import { Skeleton } from '@/shared/components/ui'
import styles from './loading.module.css'

export default function Loading() {
    return (
        <main className={styles.container}>
            <div className={styles.skeletonGroup}>
                <Skeleton height={48} width="60%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="80%" />
                <Skeleton height={16} width="90%" />
                <div className={styles.spacer} />
                <Skeleton height={200} width="100%" borderRadius={12} />
            </div>
        </main>
    )
}
