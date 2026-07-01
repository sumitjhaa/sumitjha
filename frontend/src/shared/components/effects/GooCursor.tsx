'use client'

import { useEffect, useRef } from 'react'
import styles from './GooCursor.module.css'

const TAIL_LENGTH = 40

export function GooCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const circlesRef = useRef<HTMLDivElement[]>([])
    const historyRef = useRef<Array<{ x: number; y: number }>>(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }))
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const cursor = cursorRef.current
        if (!cursor) return

        circlesRef.current = Array.from(cursor.querySelectorAll(`.${styles.circle}`))

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }

        const updateCursor = () => {
            const history = historyRef.current
            const mouse = mouseRef.current

            history.shift()
            history.push({ x: mouse.x, y: mouse.y })

            for (let i = 0; i < TAIL_LENGTH; i++) {
                const current = history[i]
                const next = history[i + 1] || history[TAIL_LENGTH - 1]

                const xDiff = next.x - current.x
                const yDiff = next.y - current.y

                current.x += xDiff * 0.35
                current.y += yDiff * 0.35

                const circle = circlesRef.current[i]
                if (circle) {
                    circle.style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`
                }
            }

            requestAnimationFrame(updateCursor)
        }

        document.addEventListener('mousemove', onMouseMove)
        const rafId = requestAnimationFrame(updateCursor)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" className={styles.goo} version="1.1" width="100%">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -22"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div ref={cursorRef} className={styles.cursor}>
                {Array.from({ length: TAIL_LENGTH }, (_, i) => (
                    <div key={i} className={styles.circle} />
                ))}
            </div>
        </>
    )
}
