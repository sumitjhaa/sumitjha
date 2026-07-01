'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import styles from './MonthlyHeatmap.module.css'
import { MONTH_LABELS } from './constants'
import type { HeatmapData, MonthData } from './types'

interface TooltipState {
    x: number
    y: number
    year: number
    month: number
    count: number
}

export function MonthlyHeatmap({ data }: { data: HeatmapData }) {
    const [tooltip, setTooltip] = useState<TooltipState | null>(null)
    const [hoveredCell, setHoveredCell] = useState<string | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

    const getMonth = useCallback(
        (year: number, month: number): MonthData | undefined =>
            data.months.find((m) => m.year === year && m.month === month),
        [data],
    )

    const handleMouseEnter = useCallback(
        (year: number, month: number, count: number, e: React.MouseEvent) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
            setTooltip({
                x: rect.left + rect.width / 2,
                y: rect.top,
                year,
                month,
                count,
            })
            setHoveredCell(`${year}-${month}`)
        },
        [],
    )

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setTooltip(null)
            setHoveredCell(null)
        }, 80)
    }, [])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [])

    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()

    return (
        <div className={styles.heatmap} ref={containerRef}>
            <div className={styles.heatmapMonthLabels}>
                <span />
                {MONTH_LABELS.map((label) => (
                    <span key={label} className={styles.heatmapMonthLabel}>
                        {label}
                    </span>
                ))}
            </div>

            <div className={styles.heatmapGrid}>
                {data.years.map((year) => (
                    <div key={year} className={styles.heatmapRow}>
                        <span className={styles.heatmapYearLabel}>{year}</span>
                        {Array.from({ length: 12 }, (_, m) => {
                            const monthData = getMonth(year, m)
                            const count = monthData?.count ?? 0
                            const level = monthData?.level ?? 0
                            const isFuture = year > currentYear || (year === currentYear && m > currentMonth)
                            const cellKey = `${year}-${m}`
                            const isHovered = hoveredCell === cellKey

                            return (
                                <div
                                    key={cellKey}
                                    className={[
                                        styles.heatmapCell,
                                        isFuture ? styles.heatmapCellFuture : '',
                                        isHovered ? styles.heatmapCellHovered : '',
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    data-level={isFuture ? undefined : level}
                                    onMouseEnter={
                                        isFuture
                                            ? undefined
                                            : (e) => handleMouseEnter(year, m, count, e)
                                    }
                                    onMouseLeave={isFuture ? undefined : handleMouseLeave}
                                >
                                    {!isFuture && count > 0 && (
                                        <span className={styles.heatmapCellCount}>{count}</span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>

            {tooltip && (
                <div
                    className={styles.heatmapTooltip}
                    style={{ left: tooltip.x, top: tooltip.y }}
                >
                    <span className={styles.heatmapTooltipCount}>
                        {tooltip.count}
                    </span>
                    <span className={styles.heatmapTooltipDate}>
                        {MONTH_LABELS[tooltip.month]} {tooltip.year}
                    </span>
                </div>
            )}
        </div>
    )
}
