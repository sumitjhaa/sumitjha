import { Skeleton } from '@/shared/components/ui'

export default function BlogLoading() {
    return (
        <main
            style={{
                display: 'grid',
                placeItems: 'center',
                padding: '2rem',
                minHeight: '100dvh',
            }}
        >
            <div style={{ width: '100%', maxWidth: 720, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <Skeleton height={40} width="40%" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                            padding: '1.5rem',
                            borderRadius: '12px',
                            background: 'color-mix(in srgb, var(--base-100) 4%, transparent)',
                        }}
                    >
                        <Skeleton height={24} width="70%" />
                        <Skeleton height={14} width="100%" />
                        <Skeleton height={14} width="60%" />
                    </div>
                ))}
            </div>
        </main>
    )
}
