import { Skeleton } from '@/shared/components/ui'

export default function PostLoading() {
    return (
        <main
            style={{
                padding: '2rem',
                maxWidth: 720,
                margin: '0 auto',
                minHeight: '100dvh',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Skeleton height={16} width="30%" />
                <Skeleton height={36} width="80%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="65%" />
                <div style={{ height: '1rem' }} />
                <Skeleton height={300} width="100%" borderRadius={12} />
                <div style={{ height: '1rem' }} />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="90%" />
                <Skeleton height={16} width="100%" />
                <Skeleton height={16} width="75%" />
            </div>
        </main>
    )
}
