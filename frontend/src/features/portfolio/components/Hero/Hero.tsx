'use client'

import { useCallback } from 'react'
import { useAvatarStick, useTooltip } from '@/shared/hooks'
import { Avatar, ScrollIndicator, Tooltip, SoundButton } from '@/features/portfolio/ui'
import { SITE_CONFIG } from '@/shared/config/site'
import { SOCIAL_LINKS } from '@/shared/config/social'
import styles from './Hero.module.css'

export default function Hero() {
    const isStuck = useAvatarStick()
    const {
        data: tooltip,
        pos,
        show: showTooltip,
        hide: hideTooltip,
        move: moveTooltip,
    } = useTooltip()

    const handleMouseEnter = useCallback(
        (e: React.MouseEvent, link: { username: string; platform: string; color: string }) => {
            showTooltip(
                { username: link.username, platform: link.platform, color: link.color },
                e.clientX,
                e.clientY,
            )
        },
        [showTooltip],
    )

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            moveTooltip(e.clientX, e.clientY)
        },
        [moveTooltip],
    )

    const handleMouseLeave = useCallback(() => {
        hideTooltip()
    }, [hideTooltip])

    return (
        <section id="hero" className={styles.hero} data-section="hero">
            <Avatar isStuck={isStuck} />

            <header className={styles.header}>
                <h1>{SITE_CONFIG.name}</h1>
                <p>
                    I&apos;m a software developer from{' '}
                    <span className="amber-highlight">NIT Allahabad</span>
                    <img
                        src="/img/inline-images/mnnit.jpg"
                        className={styles.smallInlineImages}
                        alt=""
                    />
                    focused on building reliable AI-driven products and machine learning systems{' '}
                    <span className="purple-highlight">-no vibe coding</span>
                    <img
                        src="/img/inline-images/vibe-coding.png"
                        className={styles.smallInlineImages}
                        alt=""
                    />
                    just solid engineering.
                    <img
                        src="/img/inline-images/cat-flying-plane.jpeg"
                        className={styles.smallInlineImages}
                        alt=""
                    />
                </p>
            </header>

            <div className={styles.actionButtons}>
                {SOCIAL_LINKS.map((link) => (
                    <a
                        key={link.platform}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={(e) => handleMouseEnter(e, link)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <img src={link.icon} alt={link.platform} />
                    </a>
                ))}
            </div>

            <Tooltip data={tooltip} pos={pos} />

            <ScrollIndicator />

            <div className={styles.cta}>
                <SoundButton
                    className="sparkclick"
                    onClick={() => window.open(`mailto:${SITE_CONFIG.email}`, '_blank')}
                >
                    <div className={styles.ctaTop}>Let&apos;s talk!</div>
                    <div className={styles.ctaBottom} />
                </SoundButton>
            </div>
        </section>
    )
}
