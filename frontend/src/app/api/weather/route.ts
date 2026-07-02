import { NextResponse } from 'next/server'
import { apiCache } from '@/shared/lib/api-cache'

const cache = apiCache<{ temp: number; code: number }>('weather', 600_000)

export async function GET() {
    const cached = cache.get()
    if (cached) return NextResponse.json(cached)

    try {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=26.35&longitude=86.08&current=temperature_2m,weather_code&temperature_unit=fahrenheit',
        )
        if (!res.ok) {
            return NextResponse.json({ error: 'upstream unavailable' }, { status: 502 })
        }
        const data = await res.json()
        if (!data?.current?.temperature_2m || data.current.weather_code == null) {
            return NextResponse.json({ error: 'malformed response' }, { status: 502 })
        }
        const result = { temp: Math.round(data.current.temperature_2m), code: data.current.weather_code }
        cache.set(result)
        return NextResponse.json(result, {
            headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
        })
    } catch {
        return NextResponse.json({ error: 'fetch failed' }, { status: 502 })
    }
}
