'use client'

import { memo } from 'react'
import Image from 'next/image'
import type { Position } from '@/shared/types'
import styles from './EduTooltip.module.css'

interface EduTooltipData {
    logo: string
    institute: string
}

interface EduTooltipProps {
    data: EduTooltipData | null
    pos: Position
}

function EduTooltip({ data, pos }: EduTooltipProps) {
    if (!data) return null

    const offset = 20
    let left = pos.x + offset
    let top = pos.y + offset

    if (left + 200 > window.innerWidth) left = pos.x - 200 - offset
    if (top + 200 > window.innerHeight) top = pos.y - 200 - offset

    return (
        <div className={styles.tooltip} style={{ left, top } as React.CSSProperties}>
            <Image src={data.logo} alt="" width={150} height={150} className={styles.logo} />
        </div>
    )
}

export default memo(EduTooltip)
