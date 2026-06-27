import type { Metadata } from 'next'
import { SITE_CONFIG } from '@/shared/config/site'
import ErrorBoundary from '@/features/portfolio/ui/feedback/ErrorBoundary/ErrorBoundary'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { PanelProvider } from '@/app/providers/PanelProvider'
import './globals.css'

export const metadata: Metadata = {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    icons: { icon: SITE_CONFIG.favicon },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ErrorBoundary>
                    <ThemeProvider>
                        <PanelProvider>{children}</PanelProvider>
                    </ThemeProvider>
                </ErrorBoundary>
            </body>
        </html>
    )
}
