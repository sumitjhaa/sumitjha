import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { ClickEffect } from '@/shared/components/effects/ClickEffect'
import { Hero } from '@/features/portfolio/components/Hero'
import { SectionShell } from '@/shared/components/layout/SectionShell'
import {
    ProgressBar,
    ScrollToTop,
    FadeInSection,
    DotNavigation,
    LoopedPaging,
    Navbar,
} from '@/features/portfolio/ui'
import { SKILL_CATEGORIES } from '@/features/portfolio/data/skills'
import { PROJECTS } from '@/features/portfolio/data/projects'
import { SkillsSection } from '@/features/portfolio/ui/skills'
import { ProjectSection } from '@/features/portfolio/ui/projects'
import { VisuallyHidden, Skeleton } from '@/shared/components/ui'
import ErrorBoundary from '@/features/portfolio/ui/feedback/ErrorBoundary/ErrorBoundary'
import styles from './page.module.css'

const AboutMe = dynamic(() => import('@/features/portfolio/components/AboutMe/AboutMe'))
const ProjectsIntro = dynamic(() => import('@/features/portfolio/components/ProjectsIntro/ProjectsIntro'))
const ExperienceIntro = dynamic(() => import('@/features/portfolio/components/ExperienceIntro/ExperienceIntro'))
const Experience = dynamic(() => import('@/features/portfolio/components/Experience/Experience'))
const LastSection = dynamic(() => import('@/features/portfolio/components/LastSection/LastSection'))
const ThankYouSection = dynamic(() => import('@/features/portfolio/components/ThankYouSection/ThankYouSection'))
const ShoutoutsSection = dynamic(() => import('@/features/portfolio/components/ShoutoutsSection/ShoutoutsSection'))
const FooterSection = dynamic(() => import('@/features/portfolio/components/FooterSection/FooterSection'))
const EducationSection = dynamic(() => import('@/features/portfolio/components/EducationSection/EducationSection'))
const CommitmentSection = dynamic(() => import('@/features/portfolio/components/CommitmentSection/CommitmentSection'))

function SectionFallback() {
    return (
        <SectionShell id="">
            <Skeleton width="100%" height="40vh" />
        </SectionShell>
    )
}

export default function Home() {
    return (
        <main className={styles.main}>
            <ClickEffect />
            <VisuallyHidden>
                <h1>Sumit Jha - Portfolio</h1>
            </VisuallyHidden>

            <Navbar />
            <Hero />
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <AboutMe />
                </Suspense>
            </ErrorBoundary>

            <SectionShell id="section-3">
                <SkillsSection
                    categories={SKILL_CATEGORIES}
                    hideGrid
                    subtitle={
                        <>
                            <p>
                                A long time ago in a codebase far, far away, I built a stack that
                                abides only on caffeine.
                                <img
                                    src="/img/inline-images/sweaty-speedrunner-epic-gamer.gif"
                                    className="inlineImage"
                                    alt=""
                                    loading="lazy"
                                 decoding="async" />
                                Each framework made me an offer I couldn&apos;t refuse. And
                                they&apos;re still around haunting my terminal.
                                <img
                                    src="/img/inline-images/Shrug emoji.gif"
                                    className="inlineImage"
                                    alt=""
                                    loading="lazy"
                                 decoding="async" />
                                Unfortunately, no kung fu montage required to debug them.
                            </p>
                            <p>
                                I hide bodies in the git history. I catch it sipping tea while my
                                join fails.
                                <img
                                    src="/img/inline-images/Side-eye chloe.gif"
                                    className="inlineImage"
                                    alt=""
                                    loading="lazy"
                                 decoding="async" />
                                Still haven&apos;t found a framework that doesn&apos;t demand a
                                pound of soul. Production goes live and I stare into the flames.
                                <img
                                    src="/img/inline-images/Disaster girl.gif"
                                    className="inlineImage"
                                    alt=""
                                    loading="lazy"
                                 decoding="async" />
                                This is fine, everything is fine. Maybe I&apos;ll look at the error
                                tomorrow. But tonight, the code works somehow.
                            </p>
                        </>
                    }
                />
            </SectionShell>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <ExperienceIntro />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <Experience />
                </Suspense>
            </ErrorBoundary>
            <SectionShell id="section-4">
                <SkillsSection
                    categories={SKILL_CATEGORIES}
                    iconSize={64}
                    hideSubtitle
                    title="Runtime Armoury"
                    titleGap="1.8em"
                />
            </SectionShell>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <ProjectsIntro />
                </Suspense>
            </ErrorBoundary>
            {PROJECTS.toReversed().map((project) => (
                <SectionShell key={project.slug} id={`project-${project.slug}`}>
                    <FadeInSection>
                        <ProjectSection project={project} />
                    </FadeInSection>
                </SectionShell>
            ))}

            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <CommitmentSection />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <EducationSection />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <ShoutoutsSection />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <LastSection />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <ThankYouSection />
                </Suspense>
            </ErrorBoundary>
            <ErrorBoundary>
                <Suspense fallback={<SectionFallback />}>
                    <FooterSection />
                </Suspense>
            </ErrorBoundary>
            <LoopedPaging />
            <ProgressBar />
            <ScrollToTop />
            <DotNavigation />
        </main>
    )
}
