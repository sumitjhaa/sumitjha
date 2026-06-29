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

    useEffect(() => {
        const id = setInterval(() => setTime(getTime()), 30_000)
        return () => clearInterval(id)
    }, [])

    return <span>Madhubani, India &middot; {time}</span>
}

export default FooterTime
