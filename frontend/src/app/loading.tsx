import { Skeleton } from '@/shared/components/ui'

export default function Loading() {
    return (
        <main
            style={{
                display: 'grid',
                placeItems: 'center',
                height: '100dvh',
                padding: '2rem',
            }}
        >
            <div style={{ width: '100%', maxWidth: 600, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Skeleton height={48} width="60%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="80%" />
                <Skeleton height={16} width="90%" />
                <div style={{ height: '2rem' }} />
                <Skeleton height={200} width="100%" borderRadius={12} />
            </div>
        </main>
    )
}
