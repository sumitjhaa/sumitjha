# Reorganization Plan

## Phase 1 — Clean up empty stubs (instant)
- Remove 16 empty root directories

## Phase 2 — Decouple config from features
- Move `PROJECTS` data from `ui/projects/data.ts` → `features/portfolio/data/projects.ts`
- Move `SKILL_CATEGORIES` from `ui/skills/data.ts` → `features/portfolio/data/skills.ts`
- Update `shared/config/navigation.ts` to accept project sections via injection instead of direct import
- Update barrel exports

## Phase 3 — Standardize styling
- Convert `projects/[slug]/page.tsx` to CSS Module
- Convert `error.tsx` → CSS Module
- Convert `loading.tsx` → CSS Module  
- Convert `not-found.tsx` → CSS Module

## Phase 4 — Fix naming & flatten UI barrel
- Rename sections used on homepage: `FooterPage` → `FooterSection`, `EducationPage` → `EducationSection`, `LastPage` → `LastSection`
- Flatten deep imports in barrel exports (improve DX)

## Phase 5 — Consolidate ClickHandler
- Move `src/app/ClickHandler.tsx` → `src/shared/components/effects/ClickEffect.tsx`
- Or inline into `layout.tsx` since it's a single hook call

## Phase 6 — Verify build
- Run `npm run typecheck && npm run lint && npm run build`
