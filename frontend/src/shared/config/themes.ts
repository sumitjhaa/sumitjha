import type { Theme } from '@/shared/types'

export const THEMES: Theme[] = [
    'dark',
    'light',
    'one-dark',
    'one-light',
    'dracula',
    'dracula-light',
    'nord',
    'nord-light',
    'monokai',
    'monokai-light',
    'solarized-dark',
    'solarized-light',
    'github-dark',
    'github-light',
    'tokyo-night',
    'tokyo-night-light',
    'catppuccin',
    'catppuccin-latte',
    'night-owl',
    'night-owl-light',
    'palenight',
    'palenight-light',
    'rose-pine',
    'rose-pine-dawn',
    'everforest',
    'everforest-light',
    'ayu-dark',
    'ayu-light',
    'synthwave',
    'synthwave-light',
    'cyberpunk',
    'cyberpunk-light',
]

export const PALETTE_COLORS: Record<Theme, string[]> = {
    dark: ['#1e1e1e', '#3a3a3a', '#d4d4d4', '#569cd6', '#ce9178'],
    light: ['#ffffff', '#d0d0d0', '#1a1a1a', '#0451a5', '#a31515'],
    'one-dark': ['#282c34', '#4a5060', '#d0d6df', '#61afef', '#e06c75'],
    'one-light': ['#fafafa', '#d0d0d0', '#1e2028', '#4078f2', '#e45649'],
    dracula: ['#282a36', '#50546a', '#f8f8f2', '#ff79c6', '#50fa7b'],
    'dracula-light': ['#fafaf8', '#d0d0d0', '#282a36', '#ff79c6', '#50fa7b'],
    nord: ['#2e3440', '#56647a', '#eceff4', '#88c0d0', '#81a1c1'],
    'nord-light': ['#e5e9f0', '#c8d0da', '#2e3440', '#5e81ac', '#bf616a'],
    monokai: ['#272822', '#56544a', '#f8f8f2', '#a6e22e', '#f92672'],
    'monokai-light': ['#fcfcfc', '#d0d0d0', '#272822', '#a6e22e', '#f92672'],
    'solarized-dark': ['#002b36', '#1a4450', '#b8c4c4', '#268bd2', '#2aa198'],
    'solarized-light': ['#fdf6e3', '#c8bca8', '#384e55', '#268bd2', '#2aa198'],
    'github-dark': ['#0d1117', '#30363d', '#e0e6ed', '#58a6ff', '#f78166'],
    'github-light': ['#ffffff', '#c0c7d0', '#14181d', '#0969da', '#cf222e'],
    'tokyo-night': ['#1a1b26', '#30364a', '#c8cfe8', '#7aa2f7', '#f7768e'],
    'tokyo-night-light': ['#e1e2e7', '#c8ccd8', '#1a1b26', '#2f54eb', '#f7768e'],
    catppuccin: ['#1e1e2e', '#3a3a50', '#dce4f8', '#89b4fa', '#f38ba8'],
    'catppuccin-latte': ['#eff1f5', '#c8ccd4', '#1e1e2e', '#1e66f5', '#d20f39'],
    'night-owl': ['#011627', '#284860', '#dee8f2', '#82aaff', '#ef5350'],
    'night-owl-light': ['#fbfbfb', '#d0d6e0', '#011627', '#0b6eae', '#c24141'],
    palenight: ['#292d3e', '#444868', '#d0d4e0', '#c792ea', '#f07178'],
    'palenight-light': ['#f4f4f8', '#d0d0d8', '#292d3e', '#8c6bb0', '#f07178'],
    'rose-pine': ['#191724', '#322e48', '#e8e6f8', '#c4a7e7', '#eb6f92'],
    'rose-pine-dawn': ['#faf4ed', '#cecade', '#232136', '#907aa9', '#eb6f92'],
    everforest: ['#2d353b', '#48585e', '#ded4be', '#a7c080', '#e67e80'],
    'everforest-light': ['#fef3e8', '#d0ccc4', '#2d353b', '#83b67a', '#e67e80'],
    'ayu-dark': ['#0b0e14', '#283040', '#cecbc6', '#39bae6', '#f29668'],
    'ayu-light': ['#fafafa', '#d0d4d8', '#0b0e14', '#3face2', '#f29668'],
    synthwave: ['#1a0a2e', '#4a2a6a', '#ffffff', '#ff7ac6', '#45e6ff'],
    'synthwave-light': ['#f0e6ff', '#d0c8dc', '#1a0a2e', '#d45a9e', '#3bc0d4'],
    cyberpunk: ['#0d0d0d', '#4a4a4a', '#ffffff', '#fcee09', '#ff0055'],
    'cyberpunk-light': ['#f0f0e8', '#d0d0c8', '#1a1a0d', '#d4c420', '#d44055'],
}

export const THEME_PAIRS: [Theme, Theme][] = [
    ['dark', 'light'],
    ['one-dark', 'one-light'],
    ['dracula', 'dracula-light'],
    ['nord', 'nord-light'],
    ['monokai', 'monokai-light'],
    ['solarized-dark', 'solarized-light'],
    ['github-dark', 'github-light'],
    ['tokyo-night', 'tokyo-night-light'],
    ['catppuccin', 'catppuccin-latte'],
    ['night-owl', 'night-owl-light'],
    ['palenight', 'palenight-light'],
    ['rose-pine', 'rose-pine-dawn'],
    ['everforest', 'everforest-light'],
    ['ayu-dark', 'ayu-light'],
    ['synthwave', 'synthwave-light'],
    ['cyberpunk', 'cyberpunk-light'],
]

export function getThemeRows(themes: readonly Theme[]): (Theme | [Theme, Theme])[] {
    const paired = new Set<Theme>()
    const rows: (Theme | [Theme, Theme])[] = []

    for (const [a, b] of THEME_PAIRS) {
        rows.push([a, b])
        paired.add(a)
        paired.add(b)
    }

    for (const t of themes) {
        if (!paired.has(t)) {
            rows.push(t)
        }
    }

    return rows
}
