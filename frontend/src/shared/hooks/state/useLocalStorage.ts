'use client'

import { useState, useCallback } from 'react'
import { getItem, setItem, removeItem } from '@/shared/services/storage'

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [stored, setStored] = useState<T>(() => getItem(key, initialValue))

    const set = useCallback(
        (value: T | ((prev: T) => T)) => {
            setStored((prev) => {
                const next = value instanceof Function ? value(prev) : value
                setItem(key, next)
                return next
            })
        },
        [key],
    )

    const remove = useCallback(() => {
        removeItem(key)
        setStored(initialValue)
    }, [key, initialValue])

    return [stored, set, remove] as const
}
