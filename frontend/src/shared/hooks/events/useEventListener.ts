'use client'

import { useEffect, useRef } from 'react'

type EventTarget = Window | Document | HTMLElement

export function useEventListener<K extends keyof WindowEventMap>(
    event: K,
    handler: (e: WindowEventMap[K]) => void,
    target: EventTarget = window,
    options?: AddEventListenerOptions | boolean,
): void {
    const saved = useRef(handler)

    useEffect(() => {
        saved.current = handler
    })

    useEffect(() => {
        const listener = (e: WindowEventMap[K]) => saved.current(e)
        target.addEventListener(event, listener as EventListener, options)
        return () => target.removeEventListener(event, listener as EventListener, options)
    }, [event, target, options])
}
