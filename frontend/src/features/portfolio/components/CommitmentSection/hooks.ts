import { useEffect, useRef, useState } from 'react'

/** Animates a number from 0 → target over `duration` ms, respecting reduced motion. */
export function useCountUp(target: number, duration = 900, delay = 500): number {
    const [value, setValue] = useState(0)
    const rafRef = useRef<number | undefined>(undefined)
    const startRef = useRef<number | undefined>(undefined)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReduced) {
            // matchMedia is client-only; setting from initial state would cause hydration mismatch
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setValue(target)
            return
        }

        const tick = (now: number) => {
            if (startRef.current === undefined) startRef.current = now
            const elapsed = now - startRef.current
            const progress = Math.min(elapsed / duration, 1)
            // Ease-out-cubic for a satisfying deceleration
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(target * eased))
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick)
            }
        }

        const startTimer = setTimeout(() => {
            rafRef.current = requestAnimationFrame(tick)
        }, delay)

        return () => {
            clearTimeout(startTimer)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [target, duration, delay])

    return value
}
