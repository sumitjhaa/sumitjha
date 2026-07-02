'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn, playSound } from '@/shared/utils'
import { useTheme } from '@/app/providers/ThemeProvider'
import { usePanel } from '@/app/providers/PanelProvider'
import { useIsClient } from '@/shared/hooks'
import { PALETTE_COLORS } from '@/shared/config'
import styles from './AnalogClock.module.css'

interface TimeData {
    hour: number
    minute: number
    second: number
    ampm: string
    timeDigits: string
    date: string
}

const TIMEZONE = 'Asia/Kolkata'

function getTime(): TimeData {
    const now = new Date()

    const timeStr = now.toLocaleString('en-US', {
        timeZone: TIMEZONE,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
    const [hStr, mStr, sStr] = timeStr.split(':')
    const h24 = Number(hStr)
    const m = Number(mStr)
    const s = Number(sStr)

    return {
        hour: ((h24 % 12) + m / 60) * 30,
        minute: (m + s / 60) * 6,
        second: s * 6,
        ampm: h24 >= 12 ? 'PM' : 'AM',
        timeDigits: now.toLocaleString('en-US', {
            timeZone: TIMEZONE,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }),
        date: now.toLocaleString('en-US', {
            timeZone: TIMEZONE,
            month: '2-digit',
            day: '2-digit',
        }),
    }
}

function ClockSVG({ size, t, className }: { size: number; t: TimeData | null; className?: string }) {
    const r = 10

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" className={className}>
            <line
                x1={r}
                y1={r}
                x2={r}
                y2={r - 5.2}
                stroke="currentColor"
                strokeWidth="0.85"
                strokeLinecap="round"
                className={styles.hourHand}
                style={{ transform: t ? `rotate(${t.hour}deg)` : undefined }}
            />
            <line
                x1={r}
                y1={r}
                x2={r}
                y2={r - 7.8}
                stroke="currentColor"
                strokeWidth="0.55"
                strokeLinecap="round"
                className={styles.minuteHand}
                style={{ transform: t ? `rotate(${t.minute}deg)` : undefined }}
            />
            <line
                x1={r}
                y1={r + 1.2}
                x2={r}
                y2={r - 8.5}
                stroke="#e11d48"
                strokeWidth="0.3"
                strokeLinecap="round"
                className={styles.secondHand}
                style={{ transform: t ? `rotate(${t.second}deg)` : undefined }}
            />
            <circle cx={r} cy={r} r="0.45" fill="#e11d48" />
        </svg>
    )
}

export function AnalogClock() {
    const [t, setT] = useState<TimeData | null>(null)
    const { theme } = useTheme()
    const { isOpen, toggle, close } = usePanel()
    const open = isOpen('clock')

    const miniRef = useRef<HTMLSpanElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)
    const flyRef = useRef<HTMLDivElement>(null)

    const [flyState, setFlyState] = useState<{
        x: number
        y: number
        size: number
        targetX: number
        targetY: number
        targetSize: number
    } | null>(null)
    const [reveal, setReveal] = useState(false)

    const isClient = useIsClient()
    const accent = PALETTE_COLORS[theme][3]
    const accentColor = isClient ? `color-mix(in srgb, ${accent} 45%, var(--base-100))` : undefined

    useEffect(() => {
        setT(getTime())
        const id = setInterval(() => setT(getTime()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        if (!open) {
            setFlyState(null)
            setReveal(false)
            return
        }

        const mini = miniRef.current
        const panel = panelRef.current
        const target = targetRef.current
        if (!mini || !panel || !target) return

        const mr = mini.getBoundingClientRect()
        const tr = target.getBoundingClientRect()
        const ts = 130

        requestAnimationFrame(() => {
            setFlyState({
                x: mr.left + mr.width / 2,
                y: mr.top + mr.height / 2,
                size: mr.width,
                targetX: tr.left + tr.width / 2,
                targetY: tr.top + tr.height / 2,
                targetSize: ts,
            })
        })
    }, [open])

    useEffect(() => {
        if (!flyState) return
        const el = flyRef.current
        if (!el) return

        requestAnimationFrame(() => {
            el.style.transition = 'none'
            el.style.transform = `translate(${flyState.x}px, ${flyState.y}px) translate(-50%, -50%)`
            el.style.width = `${flyState.size}px`
            el.style.height = `${flyState.size}px`
            el.style.opacity = '1'

            void el.offsetHeight

            el.style.transition =
                'transform 0.25s ease-out, width 0.12s ease-out, height 0.12s ease-out'
            el.style.transform = `translate(${flyState.targetX}px, ${flyState.targetY}px) translate(-50%, -50%)`
            el.style.width = `${flyState.targetSize}px`
            el.style.height = `${flyState.targetSize}px`
        })

        const timer = setTimeout(() => {
            setFlyState(null)
            setReveal(true)
        }, 300)

        return () => clearTimeout(timer)
    }, [flyState])

    useEffect(() => {
        if (!open) return
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close()
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open, close])

    const togglePanel = useCallback(() => {
        playSound('/sounds/laptop-touchpad.mp3')
        toggle('clock')
    }, [toggle])

    return (
        <>
            <div className={styles.wrapper}>
                <button
                    className={cn(styles.trigger, open && styles.triggerActive)}
                    onClick={togglePanel}
                    aria-label="Toggle clock"
                    style={accentColor ? { color: accentColor } : undefined}
                >
                    <span className={styles.dateText}>{t?.date ?? '--/--'}</span>
                    <span className={cn(styles.miniClockWrap, open && styles.miniHidden)} ref={miniRef}>
                        <ClockSVG size={40} t={t} />
                    </span>
                </button>

                {open && <div className={styles.backdrop} onClick={close} aria-hidden />}

                <div
                    ref={panelRef}
                    className={cn(styles.panel, open && styles.open)}
                    role="dialog"
                    aria-modal={open}
                    aria-label="Clock"
                >
                    <div
                        ref={targetRef}
                        className={cn(styles.clockWrap, reveal && styles.clockVisible)}
                    >
                        <ClockSVG size={130} t={t} />
                    </div>
                    <div className={cn(styles.body, reveal && styles.bodyVisible)}>
                        <span className={styles.timeDigits}>{t?.timeDigits ?? '--:--'}</span>
                        <span className={styles.ampm}>{t?.ampm ?? ''}</span>
                    </div>
                </div>

                {flyState && (
                    <div
                        ref={flyRef}
                        className={styles.flyClock}
                    >
                        <ClockSVG size={flyState.size} t={t} />
                    </div>
                )}
            </div>
        </>
    )
}
