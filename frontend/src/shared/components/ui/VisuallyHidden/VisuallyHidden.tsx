import { type ReactNode, memo } from 'react'

interface VisuallyHiddenProps {
    children: ReactNode
}

const style: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
}

export const VisuallyHidden = memo(function VisuallyHidden({ children }: VisuallyHiddenProps) {
    return <div style={style}>{children}</div>
})
