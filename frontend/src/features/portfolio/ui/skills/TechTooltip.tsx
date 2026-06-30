'use client'

import { memo, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { hexToRgba } from '@/shared/utils'
import type { TooltipState, Position } from '@/shared/types'
import styles from './TechTooltip.module.css'

interface TechTooltipProps {
    data: TooltipState | null
    pos: Position
    offsetX?: number
    offsetY?: number
    fontSize?: string
    padding?: string
    gap?: string
}

interface Placement {
    left: number
    top: number
    flipX: boolean
    flipY: boolean
}

const VIEWPORT_MARGIN = 8

function TechTooltip({
    data,
    pos,
    offsetX = 12,
    offsetY = 16,
    fontSize,
    padding,
    gap,
}: TechTooltipProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [placement, setPlacement] = useState<Placement | null>(null)

    useLayoutEffect(() => {
        if (!data || !ref.current) {
            setPlacement(null)
            return
        }

        const rect = ref.current.getBoundingClientRect()
        const vw = window.innerWidth
        const vh = window.innerHeight

        let left = pos.x + offsetX
        let top = pos.y + offsetY
        let flipX = false
        let flipY = false

        if (left + rect.width + VIEWPORT_MARGIN > vw) {
            left = pos.x - rect.width - offsetX
            flipX = true
        }
        if (top + rect.height + VIEWPORT_MARGIN > vh) {
            top = pos.y - rect.height - offsetY
            flipY = true
        }

        left = Math.max(VIEWPORT_MARGIN, left)
        top = Math.max(VIEWPORT_MARGIN, top)

        setPlacement((prev) =>
            prev && prev.left === left && prev.top === top && prev.flipX === flipX && prev.flipY === flipY
                ? prev
                : { left, top, flipX, flipY },
        )
    }, [data, pos.x, pos.y, offsetX, offsetY])

    if (!data) return null

    const style = {
        '--tt-color': data.color,
        '--tt-highlight': hexToRgba(data.color),
        ...(fontSize ? { '--tt-name-size': fontSize } : null),
        ...(padding ? { '--tt-padding': padding } : null),
        ...(gap ? { '--tt-gap': gap } : null),
        ...(placement
            ? {
                  '--tt-x': `${placement.left}px`,
                  '--tt-y': `${placement.top}px`,
              }
            : null),
    } as CSSProperties

    return (
        <div
            ref={ref}
            className={styles.tooltip}
            style={style}
            data-placed={placement ? 'true' : 'false'}
            data-flip-x={placement?.flipX ? 'true' : 'false'}
            data-flip-y={placement?.flipY ? 'true' : 'false'}
            role="tooltip"
            aria-hidden="true"
        >
            <div className={styles.header}>
                <span className={styles.name}>
                    <span className={styles.nameUnderline}>{data.username}</span>
                </span>
                {data.platform && <span className={styles.badge}>{data.platform}</span>}
            </div>
            {data.description && <p className={styles.description}>{data.description}</p>}
        </div>
    )
}

export default memo(TechTooltip)
