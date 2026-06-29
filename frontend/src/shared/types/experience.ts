export interface CompanyData {
    name: string
    logo?: string
    location: string
    role: string
    period: string
    href?: string
}

export interface ProjectData {
    title: string
    description: string
    points: string[]
    href?: string
    highlightColor?: string
}
