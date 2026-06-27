'use client'

import { memo } from 'react'
import { hexToRgba, isBrowser } from '@/shared/utils'
import type { TooltipState, Position } from '@/shared/types'
import styles from './Tooltip.module.css'

interface TooltipProps {
    data: TooltipState | null
    pos: Position
}

function Tooltip({ data, pos }: TooltipProps) {
    if (!data || !isBrowser()) return null

    const offset = 14
    let left = pos.x + offset
    let top = pos.y + offset

    if (left + 270 > window.innerWidth) left = pos.x - 270 - offset
    if (top + 80 > window.innerHeight) top = pos.y - 80 - offset

    return (
        <div
            className={styles.tooltip}
            style={
                {
                    '--tooltip-x': `${left}px`,
                    '--tooltip-y': `${top}px`,
                    '--tooltip-border': data.color,
                    '--tooltip-highlight': hexToRgba(data.color),
                } as React.CSSProperties
            }
        >
            <span className={styles.username}>{data.username}</span>
            <span className={styles.platform}>{data.platform}</span>
        </div>
    )
}

export default memo(Tooltip)
