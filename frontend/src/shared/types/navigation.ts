export interface SectionConfig {
    id: string
    label: string
}

export interface KeyboardShortcut {
    key: string
    description: string
    action: () => void
}
