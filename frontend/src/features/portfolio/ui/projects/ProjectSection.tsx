'use client'

import { memo, useCallback, useState } from 'react'
import type { Project } from './data'
import { LinkHighlight } from '@/shared/components/ui/LinkHighlight/LinkHighlight'
import { SoundButton } from '@/features/portfolio/ui/common/SoundButton/SoundButton'
import { useTooltip } from '@/shared/hooks'
import TechTooltip from '@/features/portfolio/ui/skills/TechTooltip'
import styles from './ProjectSection.module.css'

// Color palette for projects to ensure punchy colors
const projectColors = [
    'rgba(254, 240, 138, 0.5)',    // yellow
    'rgba(252, 165, 165, 0.5)',    // red
    'rgba(147, 197, 253, 0.5)',    // blue
    'rgba(165, 180, 252, 0.5)',    // indigo
    'rgba(204, 122, 255, 0.5)',    // purple
    'rgba(74, 222, 128, 0.5)',    // green
]

const colorMap: Record<string, string> = {
    'otakudoro': 'rgba(254, 240, 138, 0.5)',        // yellow
    'tugnotes': 'rgba(252, 165, 165, 0.5)',        // red
    'charcha': 'rgba(147, 197, 253, 0.5)',          // blue
    'freddit': 'rgba(165, 180, 252, 0.5)',         // indigo
    'vigilante': 'rgba(204, 122, 255, 0.5)',      // purple
    'tick': 'rgba(74, 222, 128, 0.5)',              // green
    'dragnotes': 'rgba(254, 240, 138, 0.5)',       // yellow (same as otakudoro)
    'ziggle': 'rgba(252, 165, 165, 0.5)',        // red (same as tugnotes)
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    Completed: { bg: '#36d399', text: '#1a1a1a' },
    'In Progress': { bg: '#3abff8', text: '#1a1a1a' },
    'Work in Progress': { bg: '#3abff8', text: '#1a1a1a' },
    Pending: { bg: '#fbbd23', text: '#1a1a1a' },
}

function GitHubIcon() {
    return <img src="/img/icons/github.svg" alt="" className={styles.linkIcon} />
}

function LiveIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.linkIcon}>
            <path d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h0" />
            <path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2" />
        </svg>
    )
}

interface TechItemProps {
    name: string
    icon: string
    color: string
    showTooltip: (data: { username: string; platform: string; color: string }, x: number, y: number) => void
    hideTooltip: () => void
    moveTooltip: (x: number, y: number) => void
}

const TechItem = memo(function TechItem({ name, icon, color, showTooltip, hideTooltip, moveTooltip }: TechItemProps) {
    const handleMouseEnter = useCallback(
        (e: React.MouseEvent) => {
            showTooltip(
                { username: name, platform: '', color },
                e.clientX,
                e.clientY,
            )
        },
        [name, color, showTooltip],
    )

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => moveTooltip(e.clientX, e.clientY),
        [moveTooltip],
    )

    const handleMouseLeave = useCallback(() => hideTooltip(), [hideTooltip])

    return (
        <div className={styles.techItem} onMouseEnter={handleMouseEnter} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            <img src={icon} alt={name} className={styles.techIcon} />
        </div>
    )
})

function getCursorOffset(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    return { x, y, cx: x - 0.5, cy: y - 0.5 }
}

interface AnimState {
    x: number
    y: number
    cx: number
    cy: number
    active: boolean
}

const idleState: AnimState = { x: 0.5, y: 0.5, cx: 0, cy: 0, active: false }

interface AnimReturn {
    wrapperClass: string
    imageStyle?: React.CSSProperties
    badgeStyle?: React.CSSProperties
    techBarStyle?: React.CSSProperties
}

function useAnimation() {
    const [state, set] = useState<AnimState>(idleState)

    const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { x, y, cx, cy } = getCursorOffset(e)
        set({ x, y, cx, cy, active: true })
    }, [])

    const onLeave = useCallback(() => set(idleState), [])

    const imgOff = 28
    const badgeOff = 10
    const barOff = 14

    const baseI = state.active
        ? `translate(${state.cx * imgOff}px, ${state.cy * imgOff}px) scale(1.06)`
        : 'translate(0, 0) scale(1)'
    const baseB = state.active
        ? `translate(${-state.cx * badgeOff}px, ${-state.cy * badgeOff}px)`
        : 'translate(0, 0)'
    const baseT = state.active
        ? `translate(${state.cx * barOff}px, ${state.cy * barOff}px)`
        : 'translate(0, 0)'

    const tI = state.active
        ? 'transform 0.08s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    const tB = state.active
        ? 'transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    const tT = state.active
        ? 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'

    const imgBase: React.CSSProperties = {
        transform: baseI,
        transition: tI,
    }
    const badgeBase: React.CSSProperties = { transform: baseB, transition: tB }
    const techBase: React.CSSProperties = { transform: baseT, transition: tT }

    const res: AnimReturn = {
        wrapperClass: styles.depthParallax,
        imageStyle: imgBase,
        badgeStyle: badgeBase,
        techBarStyle: techBase,
    }

    return { ...res, onMove, onLeave }
}

interface Props {
    project: Project
}

export function ProjectSection({ project }: Props) {
    const { data: tooltip, pos, show: showTooltip, hide: hideTooltip, move: moveTooltip } = useTooltip()
    const statusColor = STATUS_COLORS[project.status] ?? { bg: 'var(--background)', text: 'var(--base-100)' }
    const { wrapperClass, imageStyle, badgeStyle, techBarStyle, onMove, onLeave } = useAnimation()

    // Get project-specific color from the predefined mapping
    const getProjectColor = (slug: string): string => {
        return colorMap[slug] || projectColors[slug.length % projectColors.length]
    }

    return (
        <>
            <section className={styles.section}>
                <div className={`${styles.imageWrapper} ${wrapperClass}`} onMouseMove={onMove} onMouseLeave={onLeave}>
                    <img src={project.image} alt={project.title} className={styles.image} style={imageStyle} />
                    <span className={`${styles.badge} ${styles.badgeDate}`} style={badgeStyle}>
                        {new Date(project.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </span>
                    <span
                        className={`${styles.badge} ${styles.badgeStatus}`}
                        style={{ ...(statusColor.bg ? { background: statusColor.bg, color: statusColor.text } : {}), ...badgeStyle }}
                    >
                        {project.status}
                    </span>
                    <div className={styles.techBar} style={techBarStyle}>
                        {project.technologies.map((t) => (
                            <TechItem
                                key={t.name}
                                name={t.name}
                                icon={t.icon}
                                color={t.color}
                                showTooltip={showTooltip}
                                hideTooltip={hideTooltip}
                                moveTooltip={moveTooltip}
                            />
                        ))}
                    </div>
                </div>
                <h2 className={styles.title}>
                    <LinkHighlight 
                        href={project.links.find(l => l.label.toLowerCase() === 'github')?.url}
                        color={getProjectColor(project.slug)}
                    >
                        {project.title}
                    </LinkHighlight>
                </h2>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.links}>
                    {project.links.map((link) => (
                        <SoundButton
                            key={link.label}
                            className={styles.linkBtn}
                            onClick={() => window.open(link.url, '_blank', 'noopener noreferrer')}
                        >
                            <div className={styles.linkTop}>
                                {link.label.toLowerCase() === 'github' ? <GitHubIcon /> : <LiveIcon />}
                                <LinkHighlight href={link.url} className="!text-current !no-underline hover:!no-underline" color={getProjectColor(project.slug)}>{link.label}</LinkHighlight>
                            </div>
                            <div className={styles.linkBottom} />
                        </SoundButton>
                    ))}
                </div>
            </section>
            <TechTooltip data={tooltip} pos={pos} offsetX={-500} offsetY={20} fontSize="14px" padding="4px 10px" gap="4px" />
        </>
    )
}
