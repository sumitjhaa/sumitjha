import { NextResponse } from 'next/server'
import { apiCache } from '@/shared/lib/api-cache'
import { getLastCommit, getMonthlyCommits } from '@/features/portfolio/components/CommitmentSection/api'

interface GitHubPayload {
    commit: Awaited<ReturnType<typeof getLastCommit>>
    heatmap: Awaited<ReturnType<typeof getMonthlyCommits>>
}

const cache = apiCache<GitHubPayload>('github', 300_000)

export async function GET() {
    const cached = cache.get()
    if (cached) return NextResponse.json(cached)

    try {
        const [commit, heatmap] = await Promise.all([getLastCommit(), getMonthlyCommits()])
        const result: GitHubPayload = { commit, heatmap }
        cache.set(result)
        return NextResponse.json(result, {
            headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
        })
    } catch {
        return NextResponse.json({ error: 'fetch failed' }, { status: 502 })
    }
}
