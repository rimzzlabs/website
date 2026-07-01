```markdown
# website Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches best practices and conventions for developing TypeScript-based Astro projects, as observed in the `website` repository. It covers file organization, code style, commit patterns, and testing approaches, ensuring consistency and maintainability across the codebase.

## Coding Conventions

### File Naming
- Use **kebab-case** for all file and directory names.
  - **Example:**  
    ```
    components/header-section.ts
    pages/about-us.astro
    ```

### Import Style
- Use **alias imports** for modules, preferring project-defined aliases over relative paths.
  - **Example:**
    ```typescript
    import { Button } from '@components/button';
    import { getUser } from '@utils/user';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - **Example:**
    ```typescript
    // Good
    export function fetchData() { ... }
    export const SITE_TITLE = 'My Website';

    // Avoid
    // export default function fetchData() { ... }
    ```

### Commit Patterns
- Follow **conventional commits** with the `feat` prefix for new features.
- Commit messages average 83 characters.
  - **Example:**
    ```
    feat: add responsive navigation bar to header section
    ```

## Workflows

### Feature Development
**Trigger:** When adding a new feature or component  
**Command:** `/feature-development`

1. Create a new file using kebab-case in the appropriate directory.
2. Use alias imports for dependencies.
3. Export all functions and constants as named exports.
4. Write or update corresponding test files (`*.test.*`).
5. Commit changes using the conventional commit format with the `feat` prefix.

### Testing
**Trigger:** When verifying the correctness of code  
**Command:** `/run-tests`

1. Create or update test files following the `*.test.*` pattern.
2. Use the project's test runner (framework not specified; check project documentation).
3. Run all tests and ensure they pass before committing.

## Testing Patterns

- Test files follow the `*.test.*` naming convention.
  - **Example:**
    ```
    utils.test.ts
    header-section.test.ts
    ```
- The specific testing framework is not identified; consult the project documentation or package.json for details.
- Place test files alongside the code they test or in a dedicated `tests` directory.

## Commands
| Command              | Purpose                                         |
|----------------------|-------------------------------------------------|
| /feature-development | Start the process for adding a new feature      |
| /run-tests           | Run all test suites in the project              |
```
