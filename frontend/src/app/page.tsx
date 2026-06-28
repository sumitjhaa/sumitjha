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
import { SkillsSection, SKILL_CATEGORIES } from '@/features/portfolio/ui/skills'
import { PROJECTS, ProjectSection } from '@/features/portfolio/ui/projects'
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
                <SkillsSection
                    categories={SKILL_CATEGORIES}
                    hideGrid
                    subtitle={
                        <>
                            <p>
                                A long time ago in a codebase far, far away, I built a stack that abides only on caffeine.
                                <img src="/img/inline-images/sweaty-speedrunner-epic-gamer.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                                Each framework made me an offer I couldn&apos;t refuse.
                                And they&apos;re still around haunting my terminal.
                                <img src="/img/inline-images/cat-banging-keyboard.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                                Unfortunately, no kung fu montage required to debug them.
                                <img src="/img/inline-images/Shrug emoji.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                            </p>
                            <p>
                                I hide bodies in the git history.
                                I catch it sipping tea while my join fails.
                                <img src="/img/inline-images/Side-eye chloe.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                                Still haven&apos;t found a framework that doesn&apos;t demand a pound of soul.
                                Production goes live and I stare into the flames.
                                <img src="/img/inline-images/Disaster girl.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                                This is fine, everything is fine.
                                Maybe I&apos;ll look at the error tomorrow.
                                <img src="/img/inline-images/Monkey covering eyes.gif" style={{ height: '1.5em', borderRadius: '5px', verticalAlign: 'middle', margin: '0 0.15em' }} alt="" />
                                But tonight, the code works somehow.
                            </p>
                        </>
                    }
                />
            </Section>
            <Section id="section-4">
                <SkillsSection categories={SKILL_CATEGORIES} iconSize={88} hideSubtitle title="Runtime Armoury" titleGap="1.8em" />
            </Section>
            {PROJECTS.toReversed().filter((p) => p.slug !== 'ziggle').map((project, i) => (
                <Section key={project.slug} id={`project-${project.slug}`}>
                    <FadeInSection>
                        <ProjectSection project={project} />
                    </FadeInSection>
                </Section>
            ))}

            <ProgressBar />
            <ScrollToTop />
            <DotNavigation />
            <KeyboardShortcuts />
            <ThemeToggle />
        </main>
    )
}
