const cache = new Map<string, HTMLAudioElement>()

export function playSound(src: string) {
    let audio = cache.get(src)
    if (!audio) {
        audio = new Audio(src)
        cache.set(src, audio)
    }
    audio.currentTime = 0
    audio.play().catch(() => {})
}

export function preloadSound(src: string) {
    if (cache.has(src)) return
    const audio = new Audio(src)
    audio.preload = 'auto'
    cache.set(src, audio)
}
