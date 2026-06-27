'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import type { TooltipState, Position } from '@/shared/types'

interface TooltipReturn {
    data: TooltipState | null
    pos: Position
    show: (data: TooltipState, x: number, y: number) => void
    hide: () => void
    move: (x: number, y: number) => void
}

export function useTooltip(hideDelay = 50): TooltipReturn {
    const [data, setData] = useState<TooltipState | null>(null)
    const [pos, setPos] = useState<Position>({ x: 0, y: 0 })
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const show = useCallback((tooltipData: TooltipState, x: number, y: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setData(tooltipData)
        setPos({ x, y })
    }, [])

    const hide = useCallback(() => {
        timeoutRef.current = setTimeout(() => setData(null), hideDelay)
    }, [hideDelay])

    const move = useCallback((x: number, y: number) => {
        setPos({ x, y })
    }, [])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    return { data, pos, show, hide, move }
}
