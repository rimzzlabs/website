---
name: feature-development-section-or-component
description: Workflow command scaffold for feature-development-section-or-component in website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-development-section-or-component

Use this workflow when working on **feature-development-section-or-component** in `website`.

## Goal

Adds a new feature, section, or UI component to the site, often including new files, updating shared layout/components, and wiring into pages.

## Common Files

- `src/components/[area]/*.astro`
- `src/components/[area]/*.tsx`
- `src/components/ui/*.tsx`
- `src/components/shared/*.astro`
- `src/components/shared/*.tsx`
- `src/pages/*.astro`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Create new component(s) under src/components/[area]/ or src/components/ui/
- If needed, add supporting modules/hooks under src/modules/ or src/hooks/
- Update shared layout or wrapper components (e.g., app-layout.astro, section.astro, footer.astro)
- Wire new component(s) into relevant page(s) under src/pages/
- Update styles in src/styles/global.css or similar

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.