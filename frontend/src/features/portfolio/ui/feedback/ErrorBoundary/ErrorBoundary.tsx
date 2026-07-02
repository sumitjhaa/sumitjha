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
                    <div className="errorBoundary">
                        <h2>Something went wrong</h2>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="errorBoundaryButton"
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
