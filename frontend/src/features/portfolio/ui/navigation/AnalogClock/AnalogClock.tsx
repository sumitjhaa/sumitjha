'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { cn, playSound } from '@/shared/utils'
import { useTheme } from '@/app/providers/ThemeProvider'
import { usePanel } from '@/app/providers/PanelProvider'
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

function getTime(): TimeData {
    const now = new Date()
    const h24 = now.getHours()
    const h = h24 % 12 || 12
    const m = now.getMinutes()
    const s = now.getSeconds()
    return {
        hour: ((h24 % 12) + m / 60) * 30,
        minute: (m + s / 60) * 6,
        second: s * 6,
        ampm: h24 >= 12 ? 'PM' : 'AM',
        timeDigits: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`,
        date: `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`,
    }
}

function ClockSVG({ size, className }: { size: number; className?: string }) {
    const [t, setT] = useState<TimeData | null>(null)

    useEffect(() => {
        setT(getTime())
        const id = setInterval(() => setT(getTime()), 1000)
        return () => clearInterval(id)
    }, [])

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
    const modalRef = useRef<HTMLDivElement>(null)
    const flyRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLDivElement>(null)

    const [flyStart, setFlyStart] = useState<{ x: number; y: number; size: number } | null>(null)
    const [flyDone, setFlyDone] = useState(false)
    const [reveal, setReveal] = useState(false)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => setIsClient(true), [])

    const accent = PALETTE_COLORS[theme][3]
    const accentColor = isClient ? `color-mix(in srgb, ${accent} 45%, var(--base-100))` : undefined

    useEffect(() => {
        setT(getTime())
        const id = setInterval(() => setT(getTime()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        if (!open) {
            setFlyStart(null)
            setFlyDone(false)
            setReveal(false)
            return
        }

        const mini = miniRef.current
        if (!mini) return
        const r = mini.getBoundingClientRect()
        setFlyStart({ x: r.left + r.width / 2, y: r.top + r.height / 2, size: r.width })
    }, [open])

    useEffect(() => {
        if (!flyStart || flyDone) return

        const el = flyRef.current
        const panel = modalRef.current
        if (!el || !panel) return

        let started = false
        let flyTimer: ReturnType<typeof setTimeout> | undefined

        const onEnd = () => {
            if (started) return
            started = true
            panel.removeEventListener('transitionend', onEnd)

            const target = targetRef.current
            if (!target) return

            const tr = target.getBoundingClientRect()
            const tx = tr.left + tr.width / 2
            const ty = tr.top + tr.height / 2
            const ts = 130

            el.style.transition = 'none'
            el.style.transform = `translate(${flyStart.x}px, ${flyStart.y}px) translate(-50%, -50%)`
            el.style.width = `${flyStart.size}px`
            el.style.height = `${flyStart.size}px`
            el.style.opacity = '1'

            void el.offsetHeight

            el.style.transition =
                'transform 0.2s ease-out, width 0.1s ease-out, height 0.1s ease-out'
            el.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`
            el.style.width = `${ts}px`
            el.style.height = `${ts}px`

            flyTimer = setTimeout(() => {
                setFlyStart(null)
                setFlyDone(true)
                setReveal(true)
            }, 250)
        }

        panel.addEventListener('transitionend', onEnd)

        const fallbackTimer = setTimeout(() => {
            panel.removeEventListener('transitionend', onEnd)
            onEnd()
        }, 350)

        return () => {
            clearTimeout(fallbackTimer)
            clearTimeout(flyTimer)
            panel.removeEventListener('transitionend', onEnd)
        }
    }, [flyStart, flyDone])

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
            <button
                className={cn(styles.trigger, open && styles.triggerActive)}
                onClick={togglePanel}
                aria-label="Toggle clock"
                style={accentColor ? { color: accentColor } : undefined}
            >
                <span className={styles.dateText}>{t?.date ?? '--/--'}</span>
                <span className={cn(styles.miniClockWrap, open && styles.miniHidden)} ref={miniRef}>
                    <ClockSVG size={40} />
                </span>
            </button>

            {open && <div className={styles.backdrop} onClick={close} aria-hidden />}

            <div
                ref={modalRef}
                className={cn(styles.panel, open && styles.open)}
                role="dialog"
                aria-modal={open}
                aria-label="Clock"
            >
                <div ref={targetRef} className={cn(styles.clockWrap, reveal && styles.clockVisible)}>
                    <ClockSVG size={130} />
                </div>
                <div className={cn(styles.body, reveal && styles.bodyVisible)}>
                    <span className={styles.timeDigits}>{t?.timeDigits ?? '--:--'}</span>
                    <span className={styles.ampm}>{t?.ampm ?? ''}</span>
                </div>
            </div>

            {flyStart && (
                <div
                    ref={flyRef}
                    className={styles.flyClock}
                    style={{
                        transform: `translate(${flyStart.x}px, ${flyStart.y}px) translate(-50%, -50%)`,
                        width: flyStart.size,
                        height: flyStart.size,
                    }}
                >
                    <ClockSVG size={flyStart.size} />
                </div>
            )}
        </>
    )
}
