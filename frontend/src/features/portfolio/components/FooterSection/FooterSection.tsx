import { memo } from 'react'
import { SOCIAL_LINKS, SITE_CONFIG } from '@/shared/config'
import styles from './FooterSection.module.css'

function FooterSection() {
    return (
        <section id="footer" className={styles.page}>
            <h1 className={styles.heading}>Let&apos;s Connect</h1>

            <div className={styles.grid}>
                {SOCIAL_LINKS.map((link) => (
                    <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.link}
                    >
                        <img src={link.icon} alt={link.platform} className={styles.icon} />
                        <span className={styles.platform}>{link.platform}</span>
                        <span className={styles.username}>{link.username}</span>
                    </a>
                ))}
            </div>

            <div className={styles.footer}>
                <span>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</span>
                <span className={styles.sep}>&middot;</span>
                <a href={`mailto:${SITE_CONFIG.email}`} className={styles.email}>
                    {SITE_CONFIG.email}
                </a>
            </div>
        </section>
    )
}

export default memo(FooterSection)
