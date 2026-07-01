import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const res = await fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=26.35&longitude=86.08&current=temperature_2m,weather_code&temperature_unit=fahrenheit',
            { next: { revalidate: 300 } },
        )
        if (!res.ok) {
            return NextResponse.json({ error: 'upstream unavailable' }, { status: 502 })
        }
        const data = await res.json()
        if (!data?.current?.temperature_2m || data.current.weather_code == null) {
            return NextResponse.json({ error: 'malformed response' }, { status: 502 })
        }
        return NextResponse.json({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
        })
    } catch {
        return NextResponse.json({ error: 'fetch failed' }, { status: 502 })
    }
}
