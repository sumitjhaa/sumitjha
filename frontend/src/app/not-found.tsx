export default function NotFound() {
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
                <h1>404</h1>
                <p style={{ color: 'var(--base-400)', marginTop: '0.5rem' }}>
                    This page does not exist.
                </p>
            </div>
        </main>
    )
}
