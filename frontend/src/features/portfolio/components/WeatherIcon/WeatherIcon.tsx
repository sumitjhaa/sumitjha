import type { ReactNode } from 'react'

interface SvgProps {
    children: ReactNode
    title?: string
    size?: number
}

function Svg({ children, title, size = 14 }: SvgProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ verticalAlign: '-0.25em' }}
        >
            {title && <title>{title}</title>}
            {children}
        </svg>
    )
}

interface WeatherIconProps {
    code: number
    temp: number
    size?: number
}

export function WeatherIcon({ code, temp, size = 14 }: WeatherIconProps) {
    const renderIcon = (title: string, paths: ReactNode) => (
        <Svg title={title} size={size}>
            {paths}
        </Svg>
    )

    if (code === 0 || (code === 1 && temp >= 80)) {
        return renderIcon(
            'sun',
            <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
            </>,
        )
    }
    if (code === 1) {
        return renderIcon(
            'partly cloudy',
            <>
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
            </>,
        )
    }
    if (code === 2) {
        return renderIcon(
            'cloud-sun',
            <>
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M13 22H7a5 5 0 1 1 4.9-6H13a3 3 0 0 1 0 6Z" />
            </>,
        )
    }
    if (code === 3) {
        return renderIcon(
            'cloudy',
            <>
                <path d="M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z" />
                <path d="M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61" />
            </>,
        )
    }
    if (code === 45 || code === 48) {
        return renderIcon(
            'fog',
            <>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 17H7" />
                <path d="M17 21H9" />
            </>,
        )
    }
    if (code >= 51 && code <= 55) {
        return renderIcon(
            'drizzle',
            <>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M8 19v1" />
                <path d="M8 14v1" />
                <path d="M16 19v1" />
                <path d="M16 14v1" />
                <path d="M12 21v1" />
                <path d="M12 16v1" />
            </>,
        )
    }
    if (code >= 56 && code <= 57) {
        return renderIcon(
            'freezing drizzle',
            <>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v2" />
                <path d="M8 14v2" />
                <path d="M16 20h.01" />
                <path d="M8 20h.01" />
                <path d="M12 16v2" />
                <path d="M12 22h.01" />
            </>,
        )
    }
    if (code >= 61 && code <= 65) {
        return renderIcon(
            'rain',
            <>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="M16 14v6" />
                <path d="M8 14v6" />
                <path d="M12 16v6" />
            </>,
        )
    }
    if (code >= 66 && code <= 67) {
        return renderIcon(
            'freezing rain',
            <>
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m9.2 22 3-7" />
                <path d="m9 13-3 7" />
                <path d="m17 13-3 7" />
            </>,
        )
    }
    if (code >= 71 && code <= 77) {
        return renderIcon(
            'snow',
            <>
                <path d="m10 20-1.25-2.5L6 18" />
                <path d="M10 4 8.75 6.5 6 6" />
                <path d="m14 20 1.25-2.5L18 18" />
                <path d="m14 4 1.25 2.5L18 6" />
                <path d="m17 21-3-6h-4" />
                <path d="m17 3-3 6 1.5 3" />
                <path d="M2 12h6.5L10 9" />
                <path d="m20 10-1.5 2 1.5 2" />
                <path d="M22 12h-6.5L14 15" />
                <path d="m4 10 1.5 2L4 14" />
                <path d="m7 21 3-6-1.5-3" />
                <path d="m7 3 3 6h4" />
            </>,
        )
    }
    if (code >= 80 && code <= 82) {
        return renderIcon(
            'rain showers',
            <>
                <path d="M12 2v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="M20 12h2" />
                <path d="m19.07 4.93-1.41 1.41" />
                <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128" />
                <path d="M3 20a5 5 0 1 1 8.9-4H13a3 3 0 0 1 2 5.24" />
                <path d="M11 20v2" />
                <path d="M7 19v2" />
            </>,
        )
    }
    if (code >= 85 && code <= 86) {
        return renderIcon(
            'sun snow',
            <>
                <path d="M10 21v-1" />
                <path d="M10 4V3" />
                <path d="M10 9a3 3 0 0 0 0 6" />
                <path d="m14 20 1.25-2.5L18 18" />
                <path d="m14 4 1.25 2.5L18 6" />
                <path d="m17 21-3-6 1.5-3H22" />
                <path d="m17 3-3 6 1.5 3" />
                <path d="M2 12h1" />
                <path d="m20 10-1.5 2 1.5 2" />
                <path d="m3.64 18.36.7-.7" />
                <path d="m4.34 6.34-.7-.7" />
            </>,
        )
    }
    if (code === 95) {
        return renderIcon(
            'thunderstorm',
            <>
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                <path d="m13 12-3 5h4l-3 5" />
            </>,
        )
    }
    if (code >= 96) {
        return renderIcon(
            'thunderstorm with hail',
            <>
                <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
                <path d="m13 12-3 5h4l-3 5" />
                <path d="M16 14v2" />
                <path d="M8 14v2" />
                <path d="M16 20h.01" />
                <path d="M8 20h.01" />
            </>,
        )
    }
    return renderIcon('cloud', <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />)
}
