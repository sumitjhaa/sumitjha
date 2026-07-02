'use client'

import { useState, useEffect } from 'react'

interface GitHubData {
    commit: {
        sha: string
        message: string
        url: string
        repo: string
        additions: number
        deletions: number
        author: { name: string; email: string; date: string }
        committer: { name: string; email: string; date: string }
        authorUser: { login: string; html_url: string; avatar_url: string; site_admin: boolean } | null
    } | null
    heatmap: {
        years: number[]
        months: Array<{ year: number; month: number; count: number; level: number }>
        maxCount: number
        totalCommits: number
    } | null
}

interface UseGitHubResult {
    data: GitHubData | null
    loading: boolean
    error: boolean
}

export function useGitHub(): UseGitHubResult {
    const [data, setData] = useState<GitHubData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetch('/api/github')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d && d.commit !== undefined && d.heatmap !== undefined) {
                    setData(d as GitHubData)
                } else {
                    setError(true)
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    return { data, loading, error }
}
