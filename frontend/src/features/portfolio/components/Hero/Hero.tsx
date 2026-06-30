'use client'

import { useCallback, useRef, useState, useEffect } from 'react'
import { useAvatarStick, useTooltip } from '@/shared/hooks'
import { useTheme } from '@/app/providers/ThemeProvider'
import { PALETTE_COLORS } from '@/shared/config'
import { Avatar, ScrollIndicator, Tooltip, SoundButton } from '@/features/portfolio/ui'
import { LinkHighlight } from '@/shared/components/ui'
import { SITE_CONFIG, SOCIAL_LINKS } from '@/shared/config'
import styles from './Hero.module.css'

function Svg({ children, title }: { children: React.ReactNode; title?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: '-0.25em' }}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    )
}

function weatherIcon(code: number, temp: number) {
    if (code === 0 || (code === 1 && temp >= 80)) {
        return (
            <Svg title="sun">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </Svg>
        )
    }
    if (code === 1) {
        return (
            <Svg title="partly cloudy">
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
            </Svg>
        )
    }
    if (code === 2) {
        return (
            <Svg title="cloud-sun">
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
            </Svg>
        )
    }
    if (code === 3) {
        return (
            <Svg title="cloudy">
                <path d="M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z" />
                <path d="M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61" />
            </Svg>
        )
    }
    if (code === 45 || code === 48) {
        return (
            <Svg title="fog">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 17H7" />
                <path d="M17 21H9" />
            </Svg>
        )
    }
    if (code >= 51 && code <= 55) {
        return (
            <Svg title="drizzle">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M8 19v1" />
                <path d="M8 14v1" />
                <path d="M16 19v1" />
                <path d="M16 14v1" />
                <path d="M12 21v1" />
                <path d="M12 16v1" />
            </Svg>
        )
    }
    if (code >= 56 && code <= 57) {
        return (
            <Svg title="freezing drizzle">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v2" />
                <path d="M8 14v2" />
                <path d="M16 20h.01" />
                <path d="M8 20h.01" />
                <path d="M12 16v2" />
                <path d="M12 22h.01" />
            </Svg>
        )
    }
    if (code >= 61 && code <= 65) {
        return (
            <Svg title="rain">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v6" />
                <path d="M8 14v6" />
                <path d="M12 16v6" />
            </Svg>
        )
    }
    if (code >= 66 && code <= 67) {
        return (
            <Svg title="freezing rain">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m9.2 22 3-7" />
                <path d="m9 13-3 7" />
                <path d="m17 13-3 7" />
            </Svg>
        )
    }
    if (code >= 71 && code <= 77) {
        return (
            <Svg title="snow">
                <path d="m10 20-1.25-2.5L6 18" />
                <path d="M10 4 8.75 6.5 6 6" />
                <path d="m14 20 1.25-2.5L18 18" />
                <path d="m14 4 1.25 2.5L18 6" />
                <path d="m17 21-3-6h-4" />
                <path d="m17 3-3 6 1.5 3" />
                <path d="M2 12h6.5L10 9" />
                <path d="m20 10-1.5 2 1.5 2" />
                <path d="M22 12h-6.5L14 15" />
                <path d="m4 10 1.5 2L4 14" />
                <path d="m7 21 3-6-1.5-3" />
                <path d="m7 3 3 6h4" />
            </Svg>
        )
    }
    if (code >= 80 && code <= 82) {
        return (
            <Svg title="rain showers">
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
                <path d="M11 20v2" />
                <path d="M7 19v2" />
            </Svg>
        )
    }
    if (code >= 85 && code <= 86) {
        return (
            <Svg title="sun snow">
                <path d="M10 21v-1" />
                <path d="M10 4V3" />
                <path d="M10 9a3 3 0 0 0 0 6" />
                <path d="m14 20 1.25-2.5L18 18" />
                <path d="m14 4 1.25 2.5L18 6" />
                <path d="m17 21-3-6 1.5-3H22" />
                <path d="m17 3-3 6 1.5 3" />
                <path d="M2 12h1" />
                <path d="m20 10-1.5 2 1.5 2" />
                <path d="m3.64 18.36.7-.7" />
                <path d="m4.34 6.34-.7-.7" />
            </Svg>
        )
    }
    if (code === 95) {
        return (
            <Svg title="thunderstorm">
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                <path d="m13 12-3 5h4l-3 5" />
            </Svg>
        )
    }
    if (code >= 96) {
        return (
            <Svg title="thunderstorm with hail">
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                <path d="m13 12-3 5h4l-3 5" />
                <path d="M16 14v2" />
                <path d="M8 14v2" />
                <path d="M16 20h.01" />
                <path d="M8 20h.01" />
            </Svg>
        )
    }
    return (
        <Svg title="cloud">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </Svg>
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
            {weather ? (
                <>
                    {' '}
                    Chillin' in Madhubani &middot; {weatherIcon(weather.code, weather.temp)}{' '}
                    {weather.temp}&deg;F
                </>
            ) : (
                " Chillin' in Madhubani"
            )}
        </span>
    )
}

export default function Hero() {
    const isStuck = useAvatarStick()
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])
    const secAccent = PALETTE_COLORS[theme][4]
    const ctaColor = mounted
        ? `color-mix(in srgb, ${secAccent} 30%, var(--secondary-content))`
        : undefined
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
                <div
                    onMouseMove={onHeadingMove}
                    onMouseLeave={onHeadingLeave}
                    className={styles.headingWrapper}
                >
                    <h1 ref={headingRef}>{SITE_CONFIG.name}</h1>
                </div>
                <WeatherLine />
                <p>
                    I&apos;m a Detail-obsessed *software Developer*, a CS graduate from{' '}
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
                    <div
                        className={styles.ctaTop}
                        style={ctaColor ? { color: ctaColor } : undefined}
                    >
                        Let&apos;s talk!
                    </div>
                    <div className={styles.ctaBottom} />
                </SoundButton>
            </div>
        </section>
    )
}
