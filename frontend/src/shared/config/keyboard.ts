export interface ShortcutDef {
    key: string
    description: string
}

export const BASE_SHORTCUTS: readonly ShortcutDef[] = [
    { key: 'j', description: 'Next section' },
    { key: 'k', description: 'Previous section' },
    { key: 't', description: 'Scroll to top' },
    { key: 'd', description: 'Open theme panel' },
    { key: 'c', description: 'Open clock panel' },
    { key: '?', description: 'Toggle shortcuts' },
    { key: 'Escape', description: 'Close panel' },
] as const
