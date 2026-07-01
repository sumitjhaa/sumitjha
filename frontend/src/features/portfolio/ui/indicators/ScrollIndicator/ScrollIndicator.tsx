'use client'

import { memo } from 'react'
import { cn } from '@/shared/utils'
import { Icon } from '@/shared/components/ui'
import styles from './ScrollIndicator.module.css'

function ScrollIndicator() {
    const handleClick = () => {
        window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }

    return (
        <div
            className={cn(styles.indicator, 'clickable')}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
            aria-label="Scroll down"
        >
            <Icon name="arrow" direction="down" />
            <span className={cn(styles.text, 'sparkclick')}>scroll</span>
        </div>
    )
}

export default memo(ScrollIndicator)
