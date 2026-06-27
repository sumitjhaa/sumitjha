'use client'

export default function PostError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <main
            style={{
                display: 'grid',
                placeItems: 'center',
                height: '100dvh',
                textAlign: 'center',
                padding: '2rem',
            }}
        >
            <div>
                <h1>Post error</h1>
                <p style={{ color: 'var(--base-400)', margin: '1rem 0' }}>{error.message}</p>
                <button
                    onClick={() => reset()}
                    style={{ padding: '0.5rem 1.5rem', cursor: 'pointer' }}
                >
                    Try again
                </button>
            </div>
        </main>
    )
}
