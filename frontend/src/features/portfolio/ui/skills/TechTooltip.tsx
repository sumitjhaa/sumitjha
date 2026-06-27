'use client'

import { memo } from 'react'
import { hexToRgba, isBrowser } from '@/shared/utils'
import type { TooltipState, Position } from '@/shared/types'
import styles from './TechTooltip.module.css'

interface TechTooltipProps {
    data: TooltipState | null
    pos: Position
}

function TechTooltip({ data, pos }: TechTooltipProps) {
    if (!data || !isBrowser()) return null

    const offsetX = 8
    const offsetY = 16
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
                } as React.CSSProperties
            }
        >
            <div className={styles.header}>
                <span className={styles.name}><span className={styles.nameInner}>{data.username}</span></span>
                <span className={styles.badge}>{data.platform}</span>
            </div>
            {data.description && <span className={styles.description}>{data.description}</span>}
        </div>
    )
}

export default memo(TechTooltip)
