export function hexToRgba(hex: string, alpha = 0.25): string {
    const match = hex.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
    if (!match) return `rgba(0,0,0,${alpha})`

    const h = match[1]
    const r = parseInt(h.length === 3 ? h[0] + h[0] : h.slice(0, 2), 16)
    const g = parseInt(h.length === 3 ? h[1] + h[1] : h.slice(2, 4), 16)
    const b = parseInt(h.length === 3 ? h[2] + h[2] : h.slice(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
