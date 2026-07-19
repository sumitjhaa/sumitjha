export interface CommitAuthor {
    name: string
    email: string
    date: string
}

export interface GitHubUser {
    login: string
    html_url: string
    avatar_url: string
    type: string
    site_admin: boolean
    name?: string | null
}

export interface Parent {
    sha: string
    html_url: string
}

export interface Verification {
    verified: boolean
    reason: string
}

export interface CommitData {
    sha: string
    message: string
    author: CommitAuthor
    committer: CommitAuthor
    authorUser: GitHubUser | null
    committerUser: GitHubUser | null
    commentCount: number
    verification: Verification | null
    parents: Parent[]
    url: string
    repo: string
    additions: number
    deletions: number
}

export type CommitLevel = 0 | 1 | 2 | 3 | 4

export interface MonthData {
    year: number
    month: number
    count: number
    level: CommitLevel
}

export interface HeatmapData {
    years: number[]
    months: MonthData[]
    maxCount: number
    totalCommits: number
}
