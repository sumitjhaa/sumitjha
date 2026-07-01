import { CACHE_KEY, CACHE_TTL } from './constants'
import type { CommitData } from './types'

interface CachedCommit {
    fetchedAt: number
    commit: CommitData
}

export function loadCachedCommit(): CommitData | null {
    if (typeof window === 'undefined') return null
    try {
        const raw = localStorage.getItem(CACHE_KEY)
        if (!raw) return null
        const parsed = JSON.parse(raw) as CachedCommit
        if (Date.now() - parsed.fetchedAt > CACHE_TTL) return null
        return parsed.commit
    } catch {
        return null
    }
}

export function saveCachedCommit(commit: CommitData): void {
    if (typeof window === 'undefined') return
    try {
        const data: CachedCommit = { fetchedAt: Date.now(), commit }
        localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    } catch {
        // localStorage may be full or disabled
    }
}
