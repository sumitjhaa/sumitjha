'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useAvatarStick, useTooltip } from '@/shared/hooks'
import { useTheme } from '@/app/providers/ThemeProvider'
import { PALETTE_COLORS } from '@/shared/config'
import { Avatar, ScrollIndicator, Tooltip, SoundButton } from '@/features/portfolio/ui'
import { LinkHighlight } from '@/shared/components/ui'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/shared/config'
import styles from './Hero.module.css'

function weatherIcon(code: number, temp: number) {
    if (code <= 1 || (code <= 3 && temp >= 80)) {
        return (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-0.2em' }}>
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
        )
    }
    if (code <= 3) {
        return (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-0.2em' }}>
                <circle cx="12" cy="12" r="4" />
                <path d="M16.5 12.5a4 4 0 0 1-4 4.5H8a4 4 0 0 1 0-8h.5" />
            </svg>
        )
    }
    if (code >= 95) {
        return (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-0.2em' }}>
                <path d="M17.5 12.5a4 4 0 0 1-4 4.5H7a4 4 0 0 1 0-8h1" />
                <path d="M12 7v6" />
                <path d="M9 10h6" />
            </svg>
        )
    }
    if (code >= 71) {
        return (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-0.2em' }}>
                <path d="M17.5 12.5a4 4 0 0 1-4 4.5H7a4 4 0 0 1 0-8h1" />
                <line x1="12" y1="18" x2="12" y2="23" />
                <line x1="8" y1="21" x2="16" y2="21" />
            </svg>
        )
    }
    return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-0.2em' }}>
            <path d="M17.5 12.5a4 4 0 0 1-4 4.5H7a4 4 0 0 1 0-8h1" />
            <path d="M9.5 8.5a4 4 0 0 1 4-3.5H18a4 4 0 0 1 0 8h-.5" />
            <line x1="12" y1="18" x2="12" y2="21" />
        </svg>
    )
}

function WeatherLine() {
    const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null)

    useEffect(() => {
        fetch('/api/weather')
            .then((r) => r.json())
            .then((d) => setWeather(d))
            .catch(() => setWeather(null))
    }, [])

    return (
        <span className={styles.weatherLine}>
            {weather && weatherIcon(weather.code, weather.temp)}
            {weather ? ` Chillin' in Madhubani \u00b7 ${weather.temp}\u00b0F` : " Chillin' in Madhubani"}
        </span>
    )
}

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
                <WeatherLine />
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
