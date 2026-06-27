import { cn } from '@/shared/utils'
import styles from './Skeleton.module.css'

interface SkeletonProps {
    width?: string | number
    height?: string | number
    borderRadius?: string | number
    className?: string
}

export function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
    return (
        <div
            className={cn(styles.skeleton, className)}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
            }}
            aria-hidden
        />
    )
}
