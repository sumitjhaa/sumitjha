import { isBrowser } from '@/shared/utils'

const PREFIX = 'snapfolio'

function buildKey(key: string): string {
    return `${PREFIX}:${key}`
}

export function getItem<T>(key: string, fallback: T): T {
    if (!isBrowser()) return fallback
    try {
        const raw = localStorage.getItem(buildKey(key))
        if (raw === null) return fallback
        return JSON.parse(raw) as T
    } catch {
        return fallback
    }
}

export function setItem<T>(key: string, value: T): void {
    if (!isBrowser()) return
    try {
        localStorage.setItem(buildKey(key), JSON.stringify(value))
    } catch {
        /* quota exceeded or private mode */
    }
}

export function removeItem(key: string): void {
    if (!isBrowser()) return
    try {
        localStorage.removeItem(buildKey(key))
    } catch {
        /* noop */
    }
}

export const STORAGE_KEYS = {
    THEME: 'theme',
} as const

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS]
