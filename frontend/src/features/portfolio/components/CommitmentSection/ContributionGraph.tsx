'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styles from './CommitmentSection.module.css'

interface ContributionDay {
    date: string
    count: number
    level: 0 | 1 | 2 | 3 | 4
}

interface ContributionWeek {
    days: ContributionDay[]
}

interface ContributionData {
    total: number
    weeks: ContributionWeek[]
}

interface DayStats {
    additions: number
    deletions: number
}

interface RepoStat {
    name: string
    shortName: string
    additions: number
    deletions: number
    commits: number
}

interface CommitPreview {
    sha: string
    message: string
    repo: string
    url: string
}

interface GraphTooltip {
    date: string
    count: number
    level: number
    commits: CommitPreview[]
    x: number
    y: number
}

type Period = '3M' | '6M' | '1Y'

const GITHUB_USER = 'sumitjhaa'
const GRAPH_WEEKS: Record<Period, number> = { '3M': 13, '6M': 26, '1Y': 53 }
const STORAGE_KEY = `commitment-graph-stats-${GITHUB_USER}`
const CACHE_TTL = 60 * 60 * 1000
const MAX_REPOS = 3
const MAX_COMMITS_PER_REPO = 8
const REPO_COLORS = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--info)', 'var(--warning)']

interface StoredStats {
    fetchedAt: number
    days: Record<string, DayStats>
    repos: Record<string, RepoStat>
}

function loadStoredStats(): StoredStats | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as StoredStats
        if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null
        return parsed
    } catch {
        return null
    }
}

function saveStoredStats(data: StoredStats) {
    if (typeof window === 'undefined') return
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {
        // localStorage may be full or disabled
    }
}

function getRemaining(res: Response): number {
    const h = res.headers.get('X-RateLimit-Remaining')
    return h ? parseInt(h, 10) : 999
}

async function fetchAllStats(): Promise<StoredStats> {
    const days: Record<string, DayStats> = {}
    const repos: Record<string, RepoStat> = {}

    try {
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=${MAX_REPOS}&type=owner`,
        )
        if (!reposRes.ok) return { fetchedAt: Date.now(), days, repos }
        if (getRemaining(reposRes) < 5) return { fetchedAt: Date.now(), days, repos }
        const repoList = (await reposRes.json()) as Array<{ full_name: string }>

        const sixMonthsAgo = new Date()
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
        const since = sixMonthsAgo.toISOString()

        for (const repo of repoList) {
            const repoName = repo.full_name
            const shortName = repoName.split('/')[1] ?? repoName
            repos[repoName] = repos[repoName] ?? {
                name: repoName,
                shortName,
                additions: 0,
                deletions: 0,
                commits: 0,
            }

            try {
                const commitsRes = await fetch(
                    `https://api.github.com/repos/${repoName}/commits?author=${GITHUB_USER}&since=${since}&per_page=${MAX_COMMITS_PER_REPO}`,
                )
                if (!commitsRes.ok) continue
                if (getRemaining(commitsRes) < 5) return { fetchedAt: Date.now(), days, repos }
                const commits = (await commitsRes.json()) as Array<{
                    sha: string
                    commit: { author: { date: string } }
                }>

                for (const commit of commits) {
                    repos[repoName].commits++
                    try {
                        const statsRes = await fetch(
                            `https://api.github.com/repos/${repoName}/commits/${commit.sha}`,
                        )
                        if (!statsRes.ok) {
                            if (statsRes.status === 403 || statsRes.status === 429)
                                return { fetchedAt: Date.now(), days, repos }
                            continue
                        }
                        if (getRemaining(statsRes) < 5) return { fetchedAt: Date.now(), days, repos }

                        const stats = (await statsRes.json()) as {
                            stats?: { additions?: number; deletions?: number }
                        }

                        const date = commit.commit.author.date.split('T')[0]
                        const existing = days[date] ?? { additions: 0, deletions: 0 }
                        const adds = stats.stats?.additions ?? 0
                        const dels = stats.stats?.deletions ?? 0
                        days[date] = { additions: existing.additions + adds, deletions: existing.deletions + dels }
                        repos[repoName].additions += adds
                        repos[repoName].deletions += dels
                    } catch {
                        continue
                    }
                }
            } catch {
                continue
            }
        }
    } catch {
        // silently fail
    }

    return { fetchedAt: Date.now(), days, repos }
}

// In-memory cache for commit previews per date (session-only)
const commitsCache = new Map<string, CommitPreview[]>()

async function fetchCommitsForDate(date: string): Promise<CommitPreview[]> {
    // Check cache first
    const cached = commitsCache.get(date)
    if (cached) return cached

    // Use a wide date window (±12h around the target day) so we catch commits
    // in any timezone, then filter to the exact local date client-side.
    const dayStart = new Date(`${date}T00:00:00Z`)
    const since = new Date(dayStart.getTime() - 12 * 60 * 60 * 1000).toISOString()
    const until = new Date(dayStart.getTime() + 36 * 60 * 60 * 1000).toISOString()

    const commits: CommitPreview[] = []
    try {
        const reposRes = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=10&type=owner`,
        )
        if (!reposRes.ok) {
            commitsCache.set(date, commits)
            return commits
        }
        if (getRemaining(reposRes) < 5) {
            commitsCache.set(date, commits)
            return commits
        }
        const repos = (await reposRes.json()) as Array<{ full_name: string }>

        for (const repo of repos) {
            try {
                const commitsRes = await fetch(
                    `https://api.github.com/repos/${repo.full_name}/commits?author=${GITHUB_USER}&since=${since}&until=${until}&per_page=5`,
                )
                if (!commitsRes.ok) {
                    if (commitsRes.status === 403 || commitsRes.status === 429) break
                    continue
                }
                if (getRemaining(commitsRes) < 5) break

                const repoCommits = (await commitsRes.json()) as Array<{
                    sha: string
                    html_url: string
                    commit: { message: string; author: { date: string } }
                }>
                for (const commit of repoCommits) {
                    const commitDate = commit.commit.author.date.split('T')[0]
                    if (commitDate !== date) continue
                    commits.push({
                        sha: commit.sha,
                        message: commit.commit.message.split('\n')[0],
                        repo: repo.full_name,
                        url: commit.html_url,
                    })
                }
            } catch {
                continue
            }
        }
    } catch {
        // silently fail
    }

    commitsCache.set(date, commits)
    return commits
}

function formatDateLabel(dateString: string): string {
    const d = new Date(dateString)
    return `${d.getMonth() + 1}/${d.getDate()}`
}

function getGraphYear(): number {
    // Always show the current calendar year — the jogruber data can lag
    // behind the current date, but the label should always be "now".
    return new Date().getFullYear()
}

function calculateConsistency(days: ContributionDay[]): number {
    const valid = days.filter((d) => d.date)
    if (valid.length === 0) return 0
    const active = valid.filter((d) => d.count > 0).length
    let currentStreak = 0
    for (let i = days.length - 1; i >= 0; i--) {
        if (days[i].count > 0) currentStreak++
        else break
    }
    let longestStreak = 0
    let run = 0
    for (const d of days) {
        if (d.count > 0) {
            run++
            longestStreak = Math.max(longestStreak, run)
        } else {
            run = 0
        }
    }
    return Math.min(
        100,
        Math.round(
            (active / valid.length) * 40 +
                Math.min(currentStreak, 30) * 1.5 +
                Math.min(longestStreak, 60) * 0.25,
        ),
    )
}

export function ContributionGraph({ data }: { data: ContributionData }) {
    const [period, setPeriod] = useState<Period>('3M')
    const [dayStats, setDayStats] = useState<Record<string, DayStats>>({})
    const [repoStats, setRepoStats] = useState<Record<string, RepoStat>>({})
    const [tooltip, setTooltip] = useState<GraphTooltip | null>(null)
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedCommits, setSelectedCommits] = useState<CommitPreview[]>([])
    const [panelLoading, setPanelLoading] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [hoveredCol, setHoveredCol] = useState<number | null>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    const graphRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const stored = loadStoredStats()
        if (stored) {
            setDayStats(stored.days)
            setRepoStats(stored.repos)
            setIsLoading(false)
        } else {
            fetchAllStats().then((stats) => {
                setDayStats(stats.days)
                setRepoStats(stats.repos)
                setIsLoading(false)
                saveStoredStats(stats)
            })
        }
    }, [])

    const weeks = useMemo(() => data.weeks.slice(-GRAPH_WEEKS[period]), [data, period])
    const allDays = useMemo(() => weeks.flatMap((w) => w.days), [weeks])
    const today = useMemo(() => new Date().toISOString().split('T')[0], [])

    const total = useMemo(() => allDays.reduce((s, d) => s + d.count, 0), [allDays])

    const { currentStreak, longestStreak } = useMemo(() => {
        let cur = 0
        for (let i = allDays.length - 1; i >= 0; i--) {
            if (allDays[i].count > 0) cur++
            else break
        }
        let longest = 0
        let run = 0
        for (const d of allDays) {
            if (d.count > 0) {
                run++
                longest = Math.max(longest, run)
            } else {
                run = 0
            }
        }
        return { currentStreak: cur, longestStreak: longest }
    }, [allDays])

    const consistency = useMemo(() => calculateConsistency(allDays), [allDays])

    const comparison = useMemo(() => {
        const len = GRAPH_WEEKS[period]
        const prevWeeks = data.weeks.slice(-len * 2, -len)
        const prevTotal = prevWeeks.flatMap((w) => w.days).reduce((s, d) => s + d.count, 0)
        const diff = total - prevTotal
        const pct = prevTotal > 0 ? Math.abs((diff / prevTotal) * 100).toFixed(1) : null
        return { prevTotal, diff, pct, isUp: diff >= 0 }
    }, [data, period, total])

    const monthLabels = useMemo(() => {
        const labels: (string | null)[] = []
        let lastMonth = -1
        for (const week of weeks) {
            if (!week.days[0].date) {
                labels.push(null)
                continue
            }
            const month = new Date(week.days[0].date).getMonth()
            if (month !== lastMonth) {
                labels.push(
                    new Date(week.days[0].date).toLocaleDateString('en-US', { month: 'short' }),
                )
                lastMonth = month
            } else {
                labels.push(null)
            }
        }
        return labels
    }, [weeks])

    const topRepos = useMemo(() => {
        const list = Object.values(repoStats)
            .filter((r) => r.commits > 0)
            .sort((a, b) => b.commits - a.commits)
            .slice(0, 5)
        const totalCommits = list.reduce((s, r) => s + r.commits, 0)
        return { list, totalCommits }
    }, [repoStats])

    const handleMouseEnter = useCallback(
        async (day: ContributionDay, e: React.MouseEvent, col: number) => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
            setHoveredCol(col)

            // Fire tooltip immediately with just the count
            setTooltip({
                date: day.date,
                count: day.count,
                level: day.level,
                commits: [],
                x: e.clientX,
                y: e.clientY,
            })

            // Lazy-fetch commit preview in the background
            if (day.count > 0) {
                const commits = await fetchCommitsForDate(day.date)
                // Only update if user is still hovering this cell
                setTooltip((prev) =>
                    prev && prev.date === day.date ? { ...prev, commits } : prev,
                )
            }
        },
        [],
    )

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null))
    }, [])

    const handleMouseLeave = useCallback(() => {
        timeoutRef.current = setTimeout(() => {
            setTooltip(null)
            setHoveredCol(null)
        }, 50)
    }, [])

    const handleCellClick = useCallback(
        async (day: ContributionDay) => {
            if (day.count === 0) return
            setSelectedDate(day.date)
            setPanelLoading(true)
            setSelectedCommits([])
            try {
                const commits = await fetchCommitsForDate(day.date)
                // Only update if user is still viewing this date
                setSelectedCommits((prev) => {
                    // Always set if we just opened this date
                    if (selectedDate === day.date || prev.length === 0) return commits
                    return prev
                })
            } catch {
                setSelectedCommits([])
            } finally {
                setPanelLoading(false)
            }
        },
        [selectedDate],
    )

    const handleClosePanel = useCallback(() => {
        setSelectedDate(null)
        setSelectedCommits([])
    }, [])

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!graphRef.current) return
            const cells = graphRef.current.querySelectorAll<HTMLElement>('[data-cell]')
            const focused = document.activeElement as HTMLElement
            const idx = Array.from(cells).indexOf(focused)
            if (idx === -1) return

            let nextIdx = idx
            if (e.key === 'ArrowRight') nextIdx = Math.min(idx + 1, cells.length - 1)
            else if (e.key === 'ArrowLeft') nextIdx = Math.max(idx - 1, 0)
            else if (e.key === 'ArrowDown') nextIdx = Math.min(idx + 7, cells.length - 1)
            else if (e.key === 'ArrowUp') nextIdx = Math.max(idx - 7, 0)
            else if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                const date = focused.dataset.date
                const count = parseInt(focused.dataset.count || '0', 10)
                const level = parseInt(focused.dataset.level || '0', 10) as 0 | 1 | 2 | 3 | 4
                if (date && count > 0) {
                    handleCellClick({ date, count, level })
                }
                return
            } else return

            e.preventDefault()
            cells[nextIdx].focus()
        },
        [handleCellClick],
    )

    return (
        <section className={styles.graph} aria-label="GitHub contribution graph" key={period}>

            <div className={styles.graphTopRow}>
                {comparison.pct !== null && (
                    <span
                        className={`${styles.comparison} ${comparison.isUp ? styles.comparisonUp : styles.comparisonDown}`}
                    >
                        {comparison.isUp ? '↑' : '↓'} {Math.abs(comparison.diff)} (
                        {comparison.pct}%)
                    </span>
                )}
                <div className={styles.periodToggle} role="tablist" aria-label="Time period">
                    {(['3M', '6M', '1Y'] as Period[]).map((p) => (
                        <button
                            key={p}
                            type="button"
                            className={`${styles.periodOption} ${period === p ? styles.periodActive : ''}`}
                            onClick={() => setPeriod(p)}
                            role="tab"
                            aria-selected={period === p}
                        >
                            {p === '1Y' ? '12M' : p}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.graphHeader}>
                <div className={styles.graphYear}>{getGraphYear()}</div>
                <div className={styles.graphStats}>
                    <span className={styles.stat}>
                        <span className={styles.statValue}>{total}</span>
                        <span className={styles.statLabel}>contributions</span>
                    </span>
                    <span className={styles.stat}>
                        <span className={styles.statValue}>
                            {currentStreak > 0 ? '🔥 ' : ''}
                            {currentStreak}
                        </span>
                        <span className={styles.statLabel}>day streak</span>
                    </span>
                    <span className={styles.stat}>
                        <span className={styles.statValue}>{longestStreak}</span>
                        <span className={styles.statLabel}>longest</span>
                    </span>
                    <span className={styles.stat}>
                        <span className={styles.statValue}>{consistency}</span>
                        <span className={styles.statLabel}>consistency</span>
                    </span>
                </div>
            </div>

            {topRepos.list.length > 0 && (
                <div className={styles.breakdown}>
                    <div className={styles.breakdownBar} role="img" aria-label="Contributions by repository">
                        {topRepos.list.map((repo, i) => (
                            <div
                                key={repo.name}
                                className={styles.breakdownSegment}
                                style={{
                                    width: `${(repo.commits / topRepos.totalCommits) * 100}%`,
                                    background: REPO_COLORS[i % REPO_COLORS.length],
                                }}
                                title={`${repo.name}: ${repo.commits} commits`}
                            />
                        ))}
                    </div>
                    <div className={styles.breakdownLegend}>
                        {topRepos.list.map((repo, i) => (
                            <span key={repo.name} className={styles.breakdownItem}>
                                <span
                                    className={styles.breakdownDot}
                                    style={{ background: REPO_COLORS[i % REPO_COLORS.length] }}
                                />
                                {repo.shortName}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className={styles.monthLabelsRow}>
                <div className={styles.dayLabelsSpacer} />
                <div className={styles.monthLabels} aria-hidden="true">
                    {monthLabels.map((label, i) => (
                        <span key={i} className={styles.monthLabel}>
                            {label ?? ''}
                        </span>
                    ))}
                </div>
            </div>

            <div
                className={styles.graphBody}
                ref={graphRef}
                onKeyDown={handleKeyDown}
                onMouseLeave={handleMouseLeave}
                style={
                    {
                        '--cell-size': period === '3M' ? '22px' : period === '6M' ? '18px' : '14px',
                    } as React.CSSProperties
                }
            >
                <div className={styles.dayLabels} aria-hidden="true">
                    <span />
                    <span>Mon</span>
                    <span />
                    <span>Wed</span>
                    <span />
                    <span>Fri</span>
                    <span />
                </div>

                <div
                    className={`${styles.weeks} ${hoveredCol !== null ? styles.weeksDimmed : ''} ${isLoading ? styles.weeksLoading : ''}`}
                >
                    {weeks.map((week, colIdx) => {
                        const isNewMonth =
                            colIdx > 0 &&
                            week.days[0].date &&
                            new Date(week.days[0].date).getMonth() !==
                                new Date(weeks[colIdx - 1].days[0].date).getMonth()
                        return (
                            <div
                                key={colIdx}
                                className={`${styles.week} ${isNewMonth ? styles.weekNewMonth : ''} ${hoveredCol === colIdx ? styles.weekHighlighted : ''}`}
                                style={
                                    !isLoading
                                        ? ({ '--cell-delay': `${colIdx * 15}ms` } as React.CSSProperties)
                                        : undefined
                                }
                            >
                                {week.days.map((day, rowIdx) => {
                                    const isInRange =
                                        day.date !== '' &&
                                        new Date(day.date).getTime() >=
                                            new Date(weeks[0].days[0].date).getTime() &&
                                        new Date(day.date).getTime() <=
                                            new Date(allDays[allDays.length - 1].date).getTime()
                                    const isToday = day.date === today
                                    const isWeekend = rowIdx === 0 || rowIdx === 6
                                    return (
                                        <div
                                            key={day.date || `${colIdx}-${rowIdx}`}
                                            className={[
                                                styles.day,
                                                isInRange ? '' : styles.dayOutOfRange,
                                                isToday ? styles.today : '',
                                                isWeekend ? styles.weekend : '',
                                            ]
                                                .filter(Boolean)
                                                .join(' ')}
                                            data-level={day.level}
                                            data-date={day.date}
                                            data-count={day.count}
                                            data-cell
                                            tabIndex={isInRange ? 0 : -1}
                                            onMouseEnter={
                                                isInRange
                                                    ? (e) => handleMouseEnter(day, e, colIdx)
                                                    : undefined
                                            }
                                            onMouseMove={isInRange ? handleMouseMove : undefined}
                                            onClick={isInRange ? () => handleCellClick(day) : undefined}
                                        />
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className={styles.graphLegend}>
                <span className={styles.legendLabel}>Less</span>
                <span className={`${styles.day} ${styles.legendCell}`} data-level={0} />
                <span className={`${styles.day} ${styles.legendCell}`} data-level={1} />
                <span className={`${styles.day} ${styles.legendCell}`} data-level={2} />
                <span className={`${styles.day} ${styles.legendCell}`} data-level={3} />
                <span className={`${styles.day} ${styles.legendCell}`} data-level={4} />
                <span className={styles.legendLabel}>More</span>
            </div>

            {selectedDate && (
                <div className={styles.commitPanel}>
                    <div className={styles.commitPanelHeader}>
                        <span className={styles.commitPanelTitle}>
                            Commits on {selectedDate}
                        </span>
                        <button
                            type="button"
                            className={styles.commitPanelClose}
                            onClick={handleClosePanel}
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>
                    {panelLoading ? (
                        <p className={styles.commitEmpty}>Loading…</p>
                    ) : selectedCommits.length === 0 ? (
                        <p className={styles.commitEmpty}>No commits found for this day.</p>
                    ) : (
                        <ul className={styles.commitList}>
                            {selectedCommits.map((c) => (
                                <li key={c.sha} className={styles.commitItem}>
                                    <a
                                        href={c.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.commitMessage}
                                    >
                                        {c.message}
                                    </a>
                                    <span className={styles.commitRepo}>{c.repo}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {tooltip && (
                <div className={styles.tooltip} style={{ left: tooltip.x, top: tooltip.y }}>
                    <span
                        className={
                            tooltip.count > 0
                                ? styles.tooltipCountPositive
                                : styles.tooltipCountZero
                        }
                    >
                        {tooltip.count > 0 ? `+${tooltip.count}` : '0'}
                    </span>
                    <span className={styles.tooltipDate}>{formatDateLabel(tooltip.date)}</span>
                    {tooltip.commits.length > 0 && (
                        <ul className={styles.tooltipCommits}>
                            {tooltip.commits.slice(0, 1).map((c) => (
                                <li key={c.sha} className={styles.tooltipCommitItem}>
                                    {c.message.length > 50
                                        ? c.message.slice(0, 50) + '…'
                                        : c.message}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </section>
    )
}
