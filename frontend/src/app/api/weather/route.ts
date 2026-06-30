import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=26.35&longitude=86.08&current=temperature_2m,weather_code&temperature_unit=fahrenheit',
        { next: { revalidate: 300 } },
    )
    const data = await res.json()
    return NextResponse.json({
        temp: Math.round(data.current.temperature_2m),
        code: data.current.weather_code,
    })
}
