'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useCallback,
    useRef,
    type ReactNode,
} from 'react'
import { useLocalStorage, STORAGE_KEYS, THEMES } from '@/shared'
import type { Theme } from '@/shared/types'

interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const DEFAULT_THEME: Theme = 'dark'

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useLocalStorage<Theme>(STORAGE_KEYS.THEME, DEFAULT_THEME)
    const themeRef = useRef(theme)

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        themeRef.current = theme
    }, [theme])

    const toggleTheme = useCallback(() => {
        const idx = THEMES.indexOf(themeRef.current)
        const next = THEMES[(idx + 1) % THEMES.length]
        setThemeState(next)
    }, [setThemeState])

    const value = useMemo(
        () => ({ theme, setTheme: setThemeState, toggleTheme }),
        [theme, setThemeState, toggleTheme],
    )

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
    return ctx
}
