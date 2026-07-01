import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useTimelineLine } from './useTimelineLine'
import { LINE_TOP_OFFSET } from '../config'

function createMockElements(descRect: { top: number; bottom: number }) {
    const desc = document.createElement('div')
    desc.getBoundingClientRect = vi.fn(() => ({
        top: descRect.top,
        bottom: descRect.bottom,
        left: 0,
        right: 800,
        width: 800,
        height: descRect.bottom - descRect.top,
        x: 0,
        y: descRect.top,
        toJSON: () => ({}),
    }))

    const section = document.createElement('section')
    section.id = 'experience-test'
    section.getBoundingClientRect = vi.fn(() => ({
        top: descRect.top,
        bottom: descRect.bottom + 200,
        left: 0,
        right: 800,
        width: 800,
        height: descRect.bottom - descRect.top + 200,
        x: 0,
        y: descRect.top,
        toJSON: () => ({}),
    }))

    return { desc, section }
}

beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubGlobal('ResizeObserver', class {
        observe = vi.fn()
        disconnect = vi.fn()
        unobserve = vi.fn()
    })
})

describe('useTimelineLine', () => {
    it('returns zero when desc ref is null', () => {
        const descRef = { current: null }
        const { result } = renderHook(() => useTimelineLine(descRef))
        expect(result.current).toBe(0)
    })

    it('measures from desc top + offset to last point bottom', () => {
        const { desc } = createMockElements({ top: 100, bottom: 400 })

        const point = document.createElement('li')
        point.classList.add('points')
        point.getBoundingClientRect = vi.fn(() => ({
            top: 420,
            bottom: 440,
            left: 0,
            right: 800,
            width: 800,
            height: 20,
            x: 0,
            y: 420,
            toJSON: () => ({}),
        }))
        desc.appendChild(point)

        const descRef = { current: desc }

        vi.spyOn(document, 'querySelectorAll').mockImplementation((selector) => {
            if (selector === '[class*="points"] li') {
                return [point] as unknown as NodeListOf<Element>
            }
            return document.querySelectorAll(selector)
        })

        const { result } = renderHook(() => useTimelineLine(descRef))

        const expected = point.getBoundingClientRect().bottom - desc.getBoundingClientRect().top - LINE_TOP_OFFSET
        expect(result.current).toBe(expected)
    })

    it('falls back to section bottom when no points exist', () => {
        const { desc, section } = createMockElements({ top: 100, bottom: 400 })
        document.body.appendChild(section)

        const descRef = { current: desc }

        vi.spyOn(document, 'querySelectorAll').mockImplementation(() => [] as unknown as NodeListOf<Element>)

        const { result } = renderHook(() => useTimelineLine(descRef, 'experience-test'))

        const expected = section.getBoundingClientRect().bottom - desc.getBoundingClientRect().top - LINE_TOP_OFFSET
        expect(result.current).toBe(expected)

        document.body.removeChild(section)
    })
})
