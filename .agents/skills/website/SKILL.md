```markdown
# website Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill covers the core development patterns, coding conventions, and workflows for the `website` repository, a TypeScript-based Astro project. It provides step-by-step guidance for adding features, enhancing UI, managing content collections, working with edge/serverless functions, and maintaining documentation. The patterns here ensure consistency, maintainability, and scalability across the codebase.

---

## Coding Conventions

**File Naming**
- Use `camelCase` for file and folder names.
  - Example: `appLayout.astro`, `noteCard.tsx`, `contentConfig.ts`

**Import Style**
- Use alias imports for modules.
  - Example:
    ```typescript
    import { NoteCard } from '@/components/notes/noteCard';
    import { useLocale } from '@/hooks/useLocale';
    ```

**Export Style**
- Prefer named exports.
  - Example:
    ```typescript
    // noteCard.tsx
    export function NoteCard(props: NoteCardProps) { ... }
    ```

**Commit Messages**
- Use [Conventional Commits](https://www.conventionalcommits.org/) with these prefixes: `feat`, `chore`, `docs`, `refactor`.
  - Example: `feat: add experience section to homepage`

---

## Workflows

### Feature Development: Section or Component
**Trigger:** When adding a new section, feature, or major UI component (e.g., Experience, Notes, Now, Archive, Dock, SEO, etc.)
**Command:** `/new-section`

1. Create new component(s) under `src/components/[area]/` or `src/components/ui/`.
2. If needed, add supporting modules/hooks under `src/modules/` or `src/hooks/`.
3. Update shared layout or wrapper components (e.g., `appLayout.astro`, `section.astro`, `footer.astro`).
4. Wire new component(s) into relevant page(s) under `src/pages/`.
5. Update styles in `src/styles/global.css` or similar.
6. If needed, update config or content files (e.g., `src/content.config.ts`, `src/content/`).

**Example:**
```typescript
// src/components/experience/experienceSection.tsx
export function ExperienceSection() { ... }

// src/pages/index.astro
---
import { ExperienceSection } from '@/components/experience/experienceSection';
---
<ExperienceSection />
```

---

### Feature Enhancement or Refactor
**Trigger:** When improving, refactoring, or reorganizing an existing feature, section, or component.
**Command:** `/refactor-section`

1. Modify one or more component files under `src/components/[area]/` or `src/components/ui/`.
2. Update shared layout or wrapper components if needed.
3. Update relevant page(s) under `src/pages/`.
4. Adjust styles or utility files as needed.

**Example:**
```typescript
// Refactor a button component for accessibility
export function Button(props: ButtonProps) {
  return <button aria-label={props.label}>{props.children}</button>;
}
```

---

### Add or Enhance Shared UI Primitive
**Trigger:** When introducing or upgrading a base UI building block used across features.
**Command:** `/new-ui-primitive`

1. Create or update a primitive component under `src/components/ui/`.
2. Update feature or section components to use the new/updated primitive.
3. Update styles if needed.
4. Test integration in relevant pages.

**Example:**
```typescript
// src/components/ui/accordion.tsx
export function Accordion(props: AccordionProps) { ... }
```

---

### Add or Update Content Collection
**Trigger:** When adding new content types or updating content-driven sections (e.g., blog/notes, authors).
**Command:** `/new-content-collection`

1. Add or update content files under `src/content/[collection]/`.
2. Update `src/content.config.ts` to register or configure the collection.
3. Update or create rendering components under `src/components/[area]/`.
4. Wire into relevant pages under `src/pages/`.
5. Update styles if needed.

**Example:**
```typescript
// src/content/notes/note1.mdx
export const metadata = { title: "First Note" };
# My First Note

// src/content.config.ts
import { defineCollection } from 'astro:content';
export default defineCollection({
  notes: { ... }
});
```

---

### Add or Enhance Edge Functionality
**Trigger:** When implementing or refining edge/serverless logic for routing, localization, or dynamic responses.
**Command:** `/new-edge-function`

1. Create or update function files under `functions/`.
2. If needed, update supporting config or index files (e.g., `astro.config.mjs`, `notes-index.json.ts`).
3. Test integration with static and dynamic routes.

**Example:**
```typescript
// functions/fuzzySlug.ts
export const onRequest = async ({ params }) => { ... };
```

---

### Add or Update Documentation
**Trigger:** When documenting workflows, conventions, or adding project guides.
**Command:** `/doc`

1. Create or update markdown documentation files in the repo root (e.g., `AGENTS.md`, `CLAUDE.md`).
2. If needed, update `package.json` scripts or related config.

---

## Testing Patterns

- Test files use the pattern `*.test.*` (e.g., `button.test.tsx`).
- The specific testing framework is not detected; check project dependencies for more details.
- Place tests alongside the component/module or in a dedicated `tests/` directory.

**Example:**
```typescript
// src/components/ui/button.test.tsx
import { render } from '@testing-library/react';
import { Button } from './button';

test('renders button with label', () => {
  render(<Button label="Click me" />);
  // assertions...
});
```

---

## Commands

| Command             | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| /new-section        | Add a new feature, section, or major UI component              |
| /refactor-section   | Refine, tweak, or reorganize an existing section or component  |
| /new-ui-primitive   | Add or enhance a shared UI primitive (e.g., accordion, drawer) |
| /new-content-collection | Add or update a content collection and its rendering        |
| /new-edge-function  | Add or update edge/serverless logic (e.g., routing, i18n)      |
| /doc                | Add or update project documentation                            |
```
