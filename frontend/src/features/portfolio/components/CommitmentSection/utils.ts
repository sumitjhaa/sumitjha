import { MESSAGE_MAX_LEN } from './constants'

export function formatRelative(dateString: string): string {
    const then = new Date(dateString).getTime()
    const now = Date.now()
    const diff = now - then
    const min = Math.floor(diff / 60_000)
    const hr = Math.floor(min / 60)
    const day = Math.floor(hr / 24)
    const week = Math.floor(day / 7)
    const month = Math.floor(day / 30)
    const year = Math.floor(day / 365)

    if (year > 0) return `${year} year${year > 1 ? 's' : ''} ago`
    if (month > 0) return `${month} month${month > 1 ? 's' : ''} ago`
    if (week > 0) return `${week} week${week > 1 ? 's' : ''} ago`
    if (day > 0) return `${day} day${day > 1 ? 's' : ''} ago`
    if (hr > 0) return `${hr} hour${hr > 1 ? 's' : ''} ago`
    if (min > 0) return `${min} minute${min > 1 ? 's' : ''} ago`
    return 'just now'
}

export function formatAbsolute(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export function truncateMessage(message: string, maxLen = MESSAGE_MAX_LEN): string {
    if (message.length <= maxLen) return message
    return message.slice(0, maxLen).trimEnd() + '…'
}

export function splitMessage(message: string): { title: string; body: string } {
    const newlineIndex = message.indexOf('\n')
    if (newlineIndex === -1) return { title: message, body: '' }
    return {
        title: message.slice(0, newlineIndex),
        body: message.slice(newlineIndex + 1).trim(),
    }
}
