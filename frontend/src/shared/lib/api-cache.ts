const store = new Map<string, { data: unknown; expiresAt: number }>()

export function apiCache<T>(key: string, ttlMs: number): { get: () => T | null; set: (data: T) => void } {
    return {
        get(): T | null {
            const entry = store.get(key)
            if (!entry || Date.now() > entry.expiresAt) {
                store.delete(key)
                return null
            }
            return entry.data as T
        },
        set(data: T): void {
            store.set(key, { data, expiresAt: Date.now() + ttlMs })
        },
    }
}
