'use client'

import { useState, useEffect } from 'react'

export interface WeatherData {
    temp: number
    code: number
}

export function useWeather(): WeatherData | null {
    const [weather, setWeather] = useState<WeatherData | null>(null)

    useEffect(() => {
        fetch('/api/weather')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d && typeof d.temp === 'number' && typeof d.code === 'number') {
                    setWeather(d as WeatherData)
                }
            })
            .catch(() => {})
    }, [])

    return weather
}
