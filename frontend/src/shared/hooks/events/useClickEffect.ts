'use client'

import { useEffect, useRef } from 'react'

const SPIKES = [
    { angle: 5, distance: 30 },
    { angle: 55, distance: 31 },
    { angle: 75, distance: 27 },
    { angle: 135, distance: 30 },
    { angle: 190, distance: 28 },
    { angle: 210, distance: 32 },
    { angle: 280, distance: 31 },
    { angle: 330, distance: 30 },
]

const TARGET_SELECTOR = 'button, a, [role="button"], .clickable, .sparkclick'

export function useClickEffect(): void {
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    useEffect(() => {
        const container = document.createElement('div')
        container.className = 'sparkclick-effect'
        container.innerHTML = SPIKES.map(
            (s) =>
                `<div class="spike" style="--angle:${s.angle}deg;--distance:${s.distance}px"></div>`,
        ).join('')
        document.body.appendChild(container)

        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (!target.closest(TARGET_SELECTOR)) return

            if (timerRef.current) {
                clearTimeout(timerRef.current)
                container.classList.remove('effect')
            }

            void container.offsetWidth
            container.style.top = `${e.clientY + window.scrollY}px`
            container.style.left = `${e.clientX + window.scrollX}px`
            container.classList.add('effect')

            timerRef.current = setTimeout(() => {
                container.classList.remove('effect')
            }, 750)
        }

        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('click', onClick)
            container.remove()
            clearTimeout(timerRef.current)
        }
    }, [])
}
