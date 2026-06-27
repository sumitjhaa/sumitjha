'use client'

import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        console.error('ErrorBoundary caught:', error, info.componentStack)
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div style={{ padding: '2em', textAlign: 'center', color: 'var(--base-300)' }}>
                        <h2>Something went wrong</h2>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            style={{
                                marginTop: '1em',
                                padding: '0.5em 1.5em',
                                background: 'var(--secondary)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '7mm',
                                cursor: 'pointer',
                            }}
                        >
                            Try again
                        </button>
                    </div>
                )
            )
        }

        return this.props.children
    }
}
