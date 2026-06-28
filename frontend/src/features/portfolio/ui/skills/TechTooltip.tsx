'use client'

import { memo } from 'react'
import { hexToRgba, isBrowser } from '@/shared/utils'
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

function TechTooltip({ data, pos, offsetX = 8, offsetY = 16, fontSize, padding, gap }: TechTooltipProps) {
    if (!data || !isBrowser()) return null

    let left = pos.x + offsetX
    let top = pos.y + offsetY

    if (left + 240 > window.innerWidth) left = pos.x - 240 - offsetX
    if (top + 80 > window.innerHeight) top = pos.y - 80 - offsetY

    return (
        <div
            className={styles.tooltip}
            style={
                {
                    '--tooltip-x': `${left}px`,
                    '--tooltip-y': `${top}px`,
                    '--tooltip-border': data.color,
                    '--tooltip-highlight': hexToRgba(data.color),
                    ...(padding ? { '--tooltip-padding': padding } : {}),
                    ...(gap ? { '--tooltip-gap': gap } : {}),
                } as React.CSSProperties
            }
        >
            <div className={styles.header}>
                <span className={styles.name} style={fontSize ? { fontSize } : undefined}><span className={styles.nameInner}>{data.username}</span></span>
                {data.platform && <span className={styles.badge}>{data.platform}</span>}
            </div>
            {data.description && <span className={styles.description}>{data.description}</span>}
        </div>
    )
}

export default memo(TechTooltip)
