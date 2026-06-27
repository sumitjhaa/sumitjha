import { memo } from 'react'

interface ArrowIconProps {
    direction?: 'up' | 'down'
    className?: string
}

function ArrowIcon({ direction = 'up', className }: ArrowIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            style={{ rotate: direction === 'down' ? '180deg' : '0deg' }}
            aria-hidden
        >
            <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
    )
}

export default memo(ArrowIcon)
