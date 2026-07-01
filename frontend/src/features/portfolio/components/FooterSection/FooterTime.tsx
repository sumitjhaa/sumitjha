'use client'

import { useState, useEffect } from 'react'
import { WeatherIcon } from '@/features/portfolio/components/WeatherIcon/WeatherIcon'

const FORMATTER = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
})

function getTime() {
    return FORMATTER.format(new Date())
}

function FooterTime() {
    const [time, setTime] = useState(getTime)
    const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null)

    useEffect(() => {
        const id = setInterval(() => setTime(getTime()), 30_000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        fetch('/api/weather')
            .then((r) => (r.ok ? r.json() : null))
            .then((d) => {
                if (d && typeof d.temp === 'number' && typeof d.code === 'number') {
                    setWeather(d)
                }
            })
            .catch(() => {})
    }, [])

    return (
        <span>
            Madhubani, India &middot; {time}
            {weather && (
                <>
                    {' \u00b7 '}
                    <WeatherIcon code={weather.code} temp={weather.temp} size={24} />{' '}
                    {weather.temp}&deg;F
                </>
            )}
        </span>
    )
}

export default FooterTime
