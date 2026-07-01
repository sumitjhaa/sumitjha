export function isBrowser(): boolean {
    return typeof window !== 'undefined'
}

export function scrollToTop(): void {
    if (!isBrowser()) return
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function scrollToElement(element: HTMLElement | null): void {
    if (!element) return
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
