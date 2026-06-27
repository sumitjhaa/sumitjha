'use client'

import { useEffect, useRef } from 'react'

type KeyHandler = (e: KeyboardEvent) => void
type KeyMap = Record<string, KeyHandler>

export function useKeyPress(map: KeyMap): void {
    const mapRef = useRef<KeyMap>(map)

    useEffect(() => {
        mapRef.current = map
    })

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            )
                return

            const fn = mapRef.current[e.key.toLowerCase()]
            if (fn) {
                fn(e)
            }
        }

        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [])
}
