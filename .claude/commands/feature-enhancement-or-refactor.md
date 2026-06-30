---
name: feature-enhancement-or-refactor
description: Workflow command scaffold for feature-enhancement-or-refactor in website.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /feature-enhancement-or-refactor

Use this workflow when working on **feature-enhancement-or-refactor** in `website`.

## Goal

Refines, tweaks, or reorganizes existing components, layouts, or logic, often in response to design improvements or code quality.

## Common Files

- `src/components/[area]/*.astro`
- `src/components/[area]/*.tsx`
- `src/components/ui/*.tsx`
- `src/components/shared/*.astro`
- `src/pages/*.astro`
- `src/styles/global.css`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Modify one or more component files under src/components/[area]/ or src/components/ui/
- Update shared layout or wrapper components if needed
- Update relevant page(s) under src/pages/
- Adjust styles or utility files as needed

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.