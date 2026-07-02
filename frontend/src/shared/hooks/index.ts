// events
export { useEventListener } from './events/useEventListener'
export { useKeyPress } from './events/useKeyPress'
export { useClickEffect } from './events/useClickEffect'

// state
export { useLocalStorage } from './state/useLocalStorage'
export { useWeather } from './state/useWeather'
export type { WeatherData } from './state/useWeather'
export { useGitHub } from './state/useGitHub'
export { useIsClient } from './state/useIsClient'

// scroll
export { useScrollProgress } from './scroll/useScrollProgress'
export { useSectionNavigation } from './scroll/useSectionNavigation'
export { useAvatarStick } from './scroll/useAvatarStick'

// observer
export { useIntersectionObserver } from './observer/useIntersectionObserver'
export { useActiveSection } from './observer/useActiveSection'
export { useSections } from './observer/useSections'
export type { SectionState } from './observer/useSections'

// media
export { useMediaQuery } from './media/useMediaQuery'
export { useReducedMotion } from './media/useReducedMotion'

// interaction
export { useTooltip } from './interaction/useTooltip'
