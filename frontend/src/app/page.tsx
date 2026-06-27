import { ClickHandler } from './ClickHandler'
import Hero from '@/features/portfolio/components/Hero/Hero'
import AboutMe from '@/features/portfolio/components/AboutMe/AboutMe'
import {
    Section,
    ProgressBar,
    ScrollToTop,
    FadeInSection,
    DotNavigation,
    KeyboardShortcuts,
    ThemeToggle,
} from '@/features/portfolio/ui'
import { VisuallyHidden } from '@/shared/components/ui'

export default function Home() {
    return (
        <main>
            <ClickHandler />
            <VisuallyHidden>
                <h1>Sumit Jha - Portfolio</h1>
            </VisuallyHidden>

            <Hero />
            <AboutMe />

            <Section id="section-3">
                <FadeInSection>
                    <h2>3</h2>
                </FadeInSection>
            </Section>
            <Section id="section-4">
                <FadeInSection>
                    <h2>4</h2>
                </FadeInSection>
            </Section>
            <Section id="section-5">
                <FadeInSection>
                    <h2>5</h2>
                </FadeInSection>
            </Section>
            <Section id="section-6">
                <FadeInSection>
                    <h2>6</h2>
                </FadeInSection>
            </Section>
            <Section id="section-7">
                <FadeInSection>
                    <h2>7</h2>
                </FadeInSection>
            </Section>

            <ProgressBar />
            <ScrollToTop />
            <DotNavigation />
            <KeyboardShortcuts />
            <ThemeToggle />
        </main>
    )
}
