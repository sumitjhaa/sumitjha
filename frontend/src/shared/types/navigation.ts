export interface SectionConfig {
    id: string
    label: string
    level?: 0 | 1
}

export interface KeyboardShortcut {
    key: string
    description: string
    action: () => void
}
