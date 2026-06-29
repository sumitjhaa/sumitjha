import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <main className={styles.container}>
            <div>
                <h1>404</h1>
                <p className={styles.message}>This page does not exist.</p>
            </div>
        </main>
    )
}
