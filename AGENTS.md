# Project Overview & Agent Guidelines

## Tech Stack
- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@import "tailwindcss";` in `src/index.css`)
- **UI Components**: shadcn/ui (`radix-nova` style, components configured via `components.json`, located in `@/components/ui/*`)
- **Icons**: Lucide React (`lucide-react`)
- **Animations**: GSAP & `@gsap/react` (`useGSAP` hook for scoped React animations)
- **Backend / Database**: Supabase (`@supabase/supabase-js`, client helper in `@/lib/supabase.ts`)
- **Path Alias**: `@/*` mapped to `src/*`

## Architecture & Conventions
- **Feature-Driven Modularization**: Group code by feature under `src/features/<feature-name>/` rather than flat dumping into global folders:
  - `types/`: Type definitions and interfaces (`*.types.ts`)
  - `data/` or `api/`: Static datasets or API requests
  - `utils/`: Pure helper functions (`*.utils.ts`)
  - `hooks/`: Custom stateful logic and animations (`use*.ts`)
  - `components/`: Focused presentational sub-components (`*.tsx`)
  - `index.ts`: Public barrel exports for the feature
- **File Length Ceiling**: Keep all `.tsx` and `.ts` files under 150–200 lines. When a file grows beyond this threshold, decompose it into focused single-responsibility modules.
- UI primitives live in `src/components/ui/`. Add new primitives via `npx shadcn@latest add <component>`.
- Use the `cn()` utility from `@/lib/utils` for merging Tailwind CSS classes.
- Scoped GSAP animations should use `useGSAP(() => { ... }, { scope: containerRef })`.
- Environment configuration:
  - Copy `.env.example` to `.env`
  - Populate `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for live Supabase integration.

## Agent Skills
- **anti-ui-slop** (`.agents/skills/anti-ui-slop/SKILL.md`):
  - Provides design authority and guidelines to stop coding agents from shipping generic UI slop.
  - Reference playbooks are located in `.agents/skills/anti-ui-slop/reference/`:
    - `new-work.md`: New screens and features
    - `operate.md`: Dashboards and data workflows
    - `polish.md`: Visual refinement and finish
    - `distill.md`: Simplification and decluttering
    - `audit.md`: Pre-ship design reviews

## Kokonut UI

This project installs components from Kokonut UI, a shadcn/ui registry.
The registry is set in components.json as "@kokonutui".

- Before building an animated or interactive component from scratch, check
  Kokonut UI: https://kokonutui.com/llms.txt lists every component with a
  one-line description.
- Install with the shadcn CLI, never by pasting code:
  `npx shadcn@latest add @kokonutui/<name>`
  It writes components/kokonutui/<name>.tsx and installs its dependencies.
- Installed components are project code. Edit them in place rather than
  wrapping them.
- Any docs page is available as Markdown, with the full source, by adding
  .md to its URL, e.g. https://kokonutui.com/docs/buttons/particle-button.md

