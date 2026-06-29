'use client'

import styles from './error.module.css'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body>
                <main className={styles.container}>
                    <div>
                        <h1>Something went wrong</h1>
                        <p className={styles.message}>{error.message}</p>
                        <button onClick={() => reset()} className={styles.resetButton}>
                            Try again
                        </button>
                    </div>
                </main>
            </body>
        </html>
    )
}
