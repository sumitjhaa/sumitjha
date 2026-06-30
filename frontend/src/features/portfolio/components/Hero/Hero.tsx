'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useAvatarStick, useTooltip } from '@/shared/hooks'
import { useTheme } from '@/app/providers/ThemeProvider'
import { PALETTE_COLORS } from '@/shared/config'
import { Avatar, ScrollIndicator, Tooltip, SoundButton } from '@/features/portfolio/ui'
import { LinkHighlight } from '@/shared/components/ui'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/shared/config'
import styles from './Hero.module.css'

export default function Hero() {
    const isStuck = useAvatarStick()
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    const secAccent = PALETTE_COLORS[theme][4]
    const ctaColor = mounted ? `color-mix(in srgb, ${secAccent} 30%, var(--secondary-content))` : undefined
    const headingRef = useRef<HTMLHeadingElement>(null)

    const onHeadingMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = headingRef.current
        if (!el) return
        const rect = e.currentTarget.getBoundingClientRect()
        const cx = (e.clientX - rect.left) / rect.width - 0.5
        const cy = (e.clientY - rect.top) / rect.height - 0.5
        el.style.transform = `translate(${cx * 12}px, ${cy * 12}px) scale(1.03)`
        el.style.transition = 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }, [])

    const onHeadingLeave = useCallback(() => {
        const el = headingRef.current
        if (!el) return
        el.style.transform = 'translate(0, 0) scale(1)'
        el.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }, [])
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
                <div onMouseMove={onHeadingMove} onMouseLeave={onHeadingLeave} className={styles.headingWrapper}>
                    <h1 ref={headingRef}>{SITE_CONFIG.name}</h1>
                </div>
                <p>
                    I&apos;m a Detail-obsessed *software Developer* from{' '}
                    <LinkHighlight
                        href="https://www.mnnit.ac.in/index.php/department/engineering/csed"
                        color="#0AC3F545"
                    >
                        NIT Allahabad
                    </LinkHighlight>
                    <img
                        src="/img/inline-images/mnnit.jpg"
                        className={styles.smallInlineImages}
                        alt=""
                    />
                    focused on building reliable AI-driven products and machine learning systems -no
                    vibe coding
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
                    <div className={styles.ctaTop} style={ctaColor ? { color: ctaColor } : undefined}>Let&apos;s talk!</div>
                    <div className={styles.ctaBottom} />
                </SoundButton>
            </div>
        </section>
    )
}
