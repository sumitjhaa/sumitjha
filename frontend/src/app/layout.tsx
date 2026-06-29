import type { Metadata, Viewport } from 'next'
import { SITE_CONFIG } from '@/shared/config'
import ErrorBoundary from '@/features/portfolio/ui/feedback/ErrorBoundary/ErrorBoundary'
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { PanelProvider } from '@/app/providers/PanelProvider'
import './globals.css'

const siteUrl = 'https://snapfolio.sumitjha.me'

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    icons: { icon: SITE_CONFIG.favicon },
    openGraph: {
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        url: siteUrl,
        siteName: SITE_CONFIG.name,
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
    },
    robots: {
        index: true,
        follow: true,
    },
}

export const viewport: Viewport = {
    themeColor: '#0a0a0a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preload" href="/fonts/Raveo.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
            </head>
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
