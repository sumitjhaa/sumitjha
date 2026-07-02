// hooks
export {
    useEventListener,
    useKeyPress,
    useClickEffect,
    useLocalStorage,
    useScrollProgress,
    useSectionNavigation,
    useAvatarStick,
    useIntersectionObserver,
    useActiveSection,
    useSections,
    useMediaQuery,
    useReducedMotion,
    useTooltip,
    useIsClient,
} from './hooks'

// types
export type { SectionState } from './hooks'
export type { Theme } from './types'
export type { SocialLink } from './types'
export type { SectionConfig, KeyboardShortcut } from './types'
export type { TooltipState, Position } from './types'
export type { CompanyData, ProjectData } from './types'

// utils
export { cn, hexToRgba, isBrowser, scrollToTop, scrollToElement } from './utils'

// components
export { GlassButton, VisuallyHidden, Skeleton, Icon } from './components/ui'

// layout
export { SectionShell } from './components/layout/SectionShell'

// component utilities
export { createPolymorphic, findChild, findAllChildren, withoutChildren, cloneChild } from './components/utils'

// config
export { SITE_CONFIG, SOCIAL_LINKS, SECTIONS, SCROLL_DEBOUNCE_MS, SCROLL_THROTTLE_MS, THEMES, PALETTE_COLORS, BASE_SHORTCUTS } from './config'
export type { ShortcutDef } from './config'

// services
export { getItem, setItem, removeItem, STORAGE_KEYS } from './services/storage'
export type { StorageKey } from './services/storage'
