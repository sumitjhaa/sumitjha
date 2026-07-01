export const GITHUB_USER = 'sumitjhaa'
export const REVALIDATE_SECONDS = 300

export const CONTRIB_API = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USER}`

export const CACHE_KEY = 'commitment-last-commit-v1'
export const CACHE_TTL = 5 * 60 * 1000

export const MESSAGE_MAX_LEN = 150

export const MONTH_LABELS = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
] as const
