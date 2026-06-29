'use client'

import { memo, useCallback, type ReactNode } from 'react'
import { FadeInSection } from '@/features/portfolio/ui'
import { useTooltip } from '@/shared/hooks'
import TechTooltip from './TechTooltip'
import type { Skill, SkillCategory } from '@/features/portfolio/data/skills'
import styles from './SkillsSection.module.css'

interface SkillCardProps {
    skill: Skill
    showTooltip: (data: { username: string; platform: string; color: string; description?: string }, x: number, y: number) => void
    hideTooltip: () => void
    moveTooltip: (x: number, y: number) => void
}

const SkillCard = memo(function SkillCard({ skill, showTooltip, hideTooltip, moveTooltip }: SkillCardProps) {
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            showTooltip(
                { username: skill.name, platform: skill.category, color: skill.color, description: skill.description },
                e.clientX,
                e.clientY,
            )
        },
        [skill, showTooltip],
    )

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => moveTooltip(e.clientX, e.clientY),
        [moveTooltip],
    )

    const handleMouseLeave = useCallback(() => hideTooltip(), [hideTooltip])

    return (
        <div
            className={styles.card}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.icon}>
                <img
                    src={skill.icon}
                    alt={skill.name}
                    loading="lazy"
                    style={
                        skill.iconScale
                            ? { '--icon-scale': skill.iconScale } as React.CSSProperties
                            : undefined
                    }
                />
            </div>
            <span className={styles.name}>{skill.name}</span>
        </div>
    )
})

function SkillCategoryGroup({
    category,
    showTooltip,
    hideTooltip,
    moveTooltip,
}: {
    category: SkillCategory
    showTooltip: SkillCardProps['showTooltip']
    hideTooltip: SkillCardProps['hideTooltip']
    moveTooltip: SkillCardProps['moveTooltip']
}) {
    return (
        <div className={styles.category}>
            <div className={styles.grid}>
                {category.items.map((skill) => (
                    <SkillCard
                        key={skill.id}
                        skill={skill}
                        showTooltip={showTooltip}
                        hideTooltip={hideTooltip}
                        moveTooltip={moveTooltip}
                    />
                ))}
            </div>
        </div>
    )
}

export function SkillsSection({
    categories,
    title = 'I Speak Fluent Semicolon',
    subtitle = '',
    iconSize,
    hideHeader,
    hideGrid,
    hideSubtitle,
    titleGap,
}: {
    categories: SkillCategory[]
    title?: string
    subtitle?: ReactNode
    iconSize?: number
    hideHeader?: boolean
    hideGrid?: boolean
    hideSubtitle?: boolean
    titleGap?: string
}) {
    const { data: tooltip, pos, show: showTooltip, hide: hideTooltip, move: moveTooltip } = useTooltip()

    return (
        <>
            <FadeInSection>
                <div className={styles.section} style={{
                    ...(iconSize ? { '--icon-size': `${iconSize}px` } : {}),
                    ...(titleGap ? { '--title-gap': titleGap } : {}),
                } as React.CSSProperties}>
                    {!hideHeader && (
                        <>
                            <h2 className={styles.title}>{title}</h2>
                            {!hideSubtitle && subtitle && <div className={styles.subtitle}>{subtitle}</div>}
                        </>
                    )}
                    {!hideGrid && categories.map((cat) => (
                        <SkillCategoryGroup
                            key={cat.label}
                            category={cat}
                            showTooltip={showTooltip}
                            hideTooltip={hideTooltip}
                            moveTooltip={moveTooltip}
                        />
                    ))}
                </div>
            </FadeInSection>
            <TechTooltip data={tooltip} pos={pos} />
        </>
    )
}
