'use client'

import { createContext, useContext, useCallback, useMemo, useReducer, type ReactNode } from 'react'

type PanelId = 'theme' | 'keyboard' | null

interface PanelState {
    active: PanelId
}

type PanelAction =
    | { type: 'OPEN'; id: PanelId }
    | { type: 'CLOSE' }
    | { type: 'TOGGLE'; id: PanelId }

function panelReducer(state: PanelState, action: PanelAction): PanelState {
    switch (action.type) {
        case 'OPEN':
            return { active: action.id }
        case 'CLOSE':
            return { active: null }
        case 'TOGGLE':
            return { active: state.active === action.id ? null : action.id }
        default:
            return state
    }
}

interface PanelContextValue {
    active: PanelId
    open: (id: PanelId) => void
    close: () => void
    toggle: (id: PanelId) => void
    isOpen: (id: PanelId) => boolean
}

const PanelContext = createContext<PanelContextValue | undefined>(undefined)

export function PanelProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(panelReducer, { active: null })

    const open = useCallback((id: PanelId) => dispatch({ type: 'OPEN', id }), [])
    const close = useCallback(() => dispatch({ type: 'CLOSE' }), [])
    const toggle = useCallback((id: PanelId) => dispatch({ type: 'TOGGLE', id }), [])
    const isOpen = useCallback((id: PanelId) => state.active === id, [state.active])

    const value = useMemo(
        () => ({ active: state.active, open, close, toggle, isOpen }),
        [state.active, open, close, toggle, isOpen],
    )

    return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export function usePanel(): PanelContextValue {
    const ctx = useContext(PanelContext)
    if (!ctx) throw new Error('usePanel must be used within PanelProvider')
    return ctx
}
