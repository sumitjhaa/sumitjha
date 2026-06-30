'use client'

import { useState, useEffect } from 'react'

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
    const [temp, setTemp] = useState<number | null>(null)

    useEffect(() => {
        const id = setInterval(() => setTime(getTime()), 30_000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        fetch('/api/weather')
            .then((r) => r.json())
            .then((d) => setTemp(d.temp))
            .catch(() => setTemp(null))
    }, [])

    return <span>Madhubani, India &middot; {time}{temp != null ? ` \u00b7 ${temp}\u00b0F` : ''}</span>
}

export default FooterTime
