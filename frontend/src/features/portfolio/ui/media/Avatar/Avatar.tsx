'use client'

import { memo, useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/utils'
import { SITE_CONFIG } from '@/shared/config'
import styles from './Avatar.module.css'

interface AvatarProps {
    isStuck: boolean
}

function Avatar({ isStuck }: AvatarProps) {
    const wrapperRef = useRef<HTMLAnchorElement>(null)
    const animating = useRef(false)

    useEffect(() => {
        const el = wrapperRef.current
        if (!el) return

        if (isStuck && !animating.current) {
            animating.current = true
            const start = el.getBoundingClientRect().top
            const end = 24
            const duration = 350
            const startTime = performance.now()

            el.style.position = 'fixed'
            el.style.top = `${start}px`

            function tick(now: number) {
                const t = Math.min((now - startTime) / duration, 1)
                const ease = 1 - Math.pow(1 - t, 3)
                el!.style.top = `${start + (end - start) * ease}px`
                if (t < 1) {
                    requestAnimationFrame(tick)
                } else {
                    animating.current = false
                }
            }

            requestAnimationFrame(tick)
        } else if (!isStuck) {
            el.style.position = ''
            el.style.top = ''
        }
    }, [isStuck])

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    return (
        <a
            ref={wrapperRef}
            href="#top"
            onClick={handleClick}
            className={cn(styles.wrapper, isStuck && styles.isStuck)}
        >
            <Image
                src={SITE_CONFIG.avatar}
                alt="Sumit Jha"
                width={200}
                height={200}
                className={styles.image}
                priority
            />
            <Image
                src={SITE_CONFIG.avatarSvg}
                alt=""
                width={120}
                height={30}
                className={styles.svg}
                aria-hidden
            />
        </a>
    )
}

export default memo(Avatar)
