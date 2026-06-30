import { ClickEffect } from '@/shared/components/effects/ClickEffect'
import { Hero } from '@/features/portfolio/components/Hero'
import { AboutMe } from '@/features/portfolio/components/AboutMe'
import { ProjectsIntro } from '@/features/portfolio/components/ProjectsIntro'
import { ExperienceIntro } from '@/features/portfolio/components/ExperienceIntro'
import { Experience } from '@/features/portfolio/components/Experience'
import { LastSection } from '@/features/portfolio/components/LastSection'
import { ThankYouSection } from '@/features/portfolio/components/ThankYouSection'
import { FooterSection } from '@/features/portfolio/components/FooterSection'
import { EducationSection } from '@/features/portfolio/components/EducationSection'
import {
    Section,
    ProgressBar,
    ScrollToTop,
    FadeInSection,
    DotNavigation,
    KeyboardShortcuts,
    ThemeToggle,
    AnalogClock,
    LoopedPaging,
} from '@/features/portfolio/ui'
import { SKILL_CATEGORIES } from '@/features/portfolio/data/skills'
import { PROJECTS } from '@/features/portfolio/data/projects'
import { SkillsSection } from '@/features/portfolio/ui/skills'
import { ProjectSection } from '@/features/portfolio/ui/projects'
import { VisuallyHidden } from '@/shared/components/ui'

export default function Home() {
    return (
        <main>
            <ClickEffect />
            <VisuallyHidden>
                <h1>Sumit Jha - Portfolio</h1>
            </VisuallyHidden>

            <Hero />
            <AboutMe />

            <Section id="section-3">
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
                                    style={{
                                        height: '1.5em',
                                        borderRadius: '5px',
                                        verticalAlign: 'middle',
                                        margin: '0 0.15em',
                                    }}
                                    alt=""
                                    loading="lazy"
                                />
                                Each framework made me an offer I couldn&apos;t refuse. And
                                they&apos;re still around haunting my terminal.
                                <img
                                    src="/img/inline-images/Shrug emoji.gif"
                                    style={{
                                        height: '1.5em',
                                        borderRadius: '5px',
                                        verticalAlign: 'middle',
                                        margin: '0 0.15em',
                                    }}
                                    alt=""
                                    loading="lazy"
                                />
                                Unfortunately, no kung fu montage required to debug them.
                            </p>
                            <p>
                                I hide bodies in the git history. I catch it sipping tea while my
                                join fails.
                                <img
                                    src="/img/inline-images/Side-eye chloe.gif"
                                    style={{
                                        height: '1.5em',
                                        borderRadius: '5px',
                                        verticalAlign: 'middle',
                                        margin: '0 0.15em',
                                    }}
                                    alt=""
                                    loading="lazy"
                                />
                                Still haven&apos;t found a framework that doesn&apos;t demand a
                                pound of soul. Production goes live and I stare into the flames.
                                <img
                                    src="/img/inline-images/Disaster girl.gif"
                                    style={{
                                        height: '1.5em',
                                        borderRadius: '5px',
                                        verticalAlign: 'middle',
                                        margin: '0 0.15em',
                                    }}
                                    alt=""
                                    loading="lazy"
                                />
                                This is fine, everything is fine. Maybe I&apos;ll look at the error
                                tomorrow. But tonight, the code works somehow.
                            </p>
                        </>
                    }
                />
            </Section>
            <ExperienceIntro />
            <Experience projectFilter={['Taxspanner']} />
            <Experience projectFilter={['Propel']} id="experience-propel" hideHeading isLast />
            <Section id="section-4">
                <SkillsSection
                    categories={SKILL_CATEGORIES}
                    iconSize={88}
                    hideSubtitle
                    title="Runtime Armoury"
                    titleGap="1.8em"
                />
            </Section>
            <ProjectsIntro />
            {PROJECTS.toReversed()
                .filter((p) => p.slug !== 'ziggle')
                .map((project) => (
                    <Section key={project.slug} id={`project-${project.slug}`}>
                        <FadeInSection>
                            <ProjectSection project={project} />
                        </FadeInSection>
                    </Section>
                ))}

            <EducationSection />
            <LastSection />
            <ThankYouSection />
            <FooterSection />
            <LoopedPaging />
            <ProgressBar />
            <ScrollToTop />
            <DotNavigation />
            <KeyboardShortcuts />
            <ThemeToggle />
            <AnalogClock />
        </main>
    )
}
