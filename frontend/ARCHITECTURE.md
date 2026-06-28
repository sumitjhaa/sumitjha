# Architecture

## Goals

- **Modular**: each feature is self‑contained with its own types, hooks, data, and components.
- **YAGNI‑aware**: shared types/hooks live at the feature level until proven reusable across 3+ features.
- **Testable**: hooks and components are colocated with unit tests.
- **DRY via config, not abstraction**: magic numbers live in `config.ts` at the feature level — no premature utility extraction.

## Folder Layout

```
src/
├── app/                          # Next.js App Router pages
├── features/
│   └── portfolio/
│       ├── components/           # Feature‑level components
│       │   ├── Hero/             # has data‑nav-type on <section>
│       │   ├── AboutMe/          # id="about"
│       │   ├── ExperienceIntro/  # id="experience-intro"
│       │   ├── ProjectsIntro/    # id="projects-intro"
│       │   └── Experience/       # self‑contained feature
│       │       ├── components/   # TimelineLine, PinIcon
│       │       ├── hooks/        # useTimelineLine + test
│       │       ├── data.ts       # default company + projects
│       │       ├── types.ts      # ExperienceProps
│       │       ├── config.ts     # TAIL_HEIGHT, LINE_TOP_OFFSET
│       │       └── index.ts      # barrel export
│       └── ui/                   # Shared portfolio UI kit
│           ├── index.ts          # barrel: all top‑level UI
│           ├── navigation/
│           │   └── DotNavigation/  # right‑side section nav
│           ├── panels/ThemeToggle/
│           ├── layout/Section/   # wrapper with scroll‑snap
│           ├── projects/         # ProjectSection, ProjectsGrid
│           └── skills/           # SkillsSection, TechTooltip
├── shared/
│   ├── index.ts                  # top‑level barrel
│   ├── hooks/
│   │   ├── index.ts              # barrel
│   │   ├── observer/
│   │   │   ├── useActiveSection.ts   # IntersectionObserver → active index
│   │   │   ├── useIntersectionObserver.ts
│   │   │   └── useSections.ts        # wraps config + active → SectionState[]
│   │   ├── scroll/
│   │   ├── events/
│   │   ├── media/
│   │   └── state/
│   ├── types/
│   │   ├── index.ts              # barrel
│   │   ├── navigation.ts         # SectionConfig { id, label, level }
│   │   └── experience.ts         # CompanyData, ProjectData
│   ├── config/
│   │   ├── index.ts              # barrel
│   │   ├── navigation.ts         # SECTIONS with level (0=main, 1=sub)
│   │   ├── site.ts
│   │   ├── social.ts
│   │   ├── themes.ts
│   │   └── keyboard.ts
│   ├── utils/
│   │   └── index.ts              # cn, hexToRgba, scroll helpers
│   ├── components/ui/            # GlassButton, VisuallyHidden, Skeleton
│   └── services/storage.ts       # localStorage helpers
└── styles/
    ├── themes/core.css           # CSS variables for timeline, headings
    ├── base/                     # reset, typography
    ├── animations/               # keyframes, highlights, sparks
    └── utilities/                # accessibility, scroll‑snap
```

## Component State Machine — Experience

```
mounted
  ├─ filtering  (activeProjects filtered by projectFilter prop)
  ├─ rendering  (lineHeight measured by useTimelineLine hook)
  └─ guarded    (empty projects → "No projects to display";
                  empty points  → "No details available";
                  no company    → fallback "Unknown")
```

## Data Flow — Section Navigation (DotNavigation)

```
SECTIONS (static config in navigation.ts)
  └─ SectionConfig[] with level: 0 (main) | 1 (sub)

useSections()
  ├─ wraps useActiveSection() for IntersectionObserver tracking
  └─ returns SectionState[] → { id, label, level, isActive }

DotNavigation
  ├─ main sections → full-width dash (32→40px active)
  ├─ sub sections  → smaller dash  (20→28px active)
  ├─ always shows labels with opacity 0.5 (1.0 for active)
  └─ active dash glows with primary color + animation
```

## Data Flow — Experience Timeline

```
page.tsx
  └─ <Experience projectFilter={...} isLast />
        └─ merges feature data.ts + optional overrides
        └─ useTimelineLine measures DOM → lineHeight
        └─ TimelineLine renders <div className="line"> with computed height
        └─ each project → <ul class="points"><li>...</li></ul>
```

## Conventions

- Hooks use `'use client'` directive.
- Feature `index.ts` barrel exports: `export { default as X } from './X'` plus types.
- CSS Modules colocated with component.
- CSS variable names follow `--block-property` pattern (e.g. `--tl-width`, `--heading-size`).
- Vitest + jsdom for DOM‑dependent hook tests.
- No external icon libraries — inline SVGs in tiny components.
- All imports prefer barrel paths (`@/shared/config`, `@/shared/hooks`) over deep paths.
