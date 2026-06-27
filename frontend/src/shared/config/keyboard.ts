export interface ShortcutDef {
    key: string
    display?: string
    description: string
}

export const BASE_SHORTCUTS: readonly ShortcutDef[] = [
    { key: 'j', description: 'Next section' },
    { key: 'k', description: 'Previous section' },
    { key: 'h', description: 'Home' },
    { key: 'a', description: 'About' },
    { key: 't', description: 'Scroll to top' },
    { key: 'd', description: 'Open theme panel' },
    { key: 'm', description: 'Toggle vim mode' },
    { key: '?', description: 'Toggle shortcuts' },
    { key: '1-7', description: 'Jump to section' },
    { key: 'Escape', description: 'Close panel' },
] as const

export const VIM_SHORTCUTS: readonly ShortcutDef[] = [
    { key: 'vim-g', display: 'g', description: 'First section' },
    { key: 'vim-G', display: 'G', description: 'Last section' },
    { key: 'vim-w', display: 'w', description: 'Next section' },
    { key: 'vim-b', display: 'b', description: 'Previous section' },
    { key: 'vim-0', display: '0', description: 'First section' },
    { key: 'vim-$', display: '$', description: 'Last section' },
    { key: 'vim-ctrl-d', display: 'Ctrl+d', description: 'Half page down' },
    { key: 'vim-ctrl-u', display: 'Ctrl+u', description: 'Half page up' },
] as const
