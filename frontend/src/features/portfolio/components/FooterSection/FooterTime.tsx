'use client'

import { useState, useEffect } from 'react'
import { useWeather } from '@/shared/hooks'
import { WeatherIcon } from '@/features/portfolio/components/WeatherIcon/WeatherIcon'

const FORMATTER = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
})

function FooterTime() {
    const [time, setTime] = useState(() =>
        FORMATTER.format(new Date()),
    )
    const weather = useWeather()

    useEffect(() => {
        function tick() {
            setTime(FORMATTER.format(new Date()))
        }
        const id = setInterval(tick, 30_000)
        return () => clearInterval(id)
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
