---
trigger: always_on
---

# Project Rules: Senior Frontend Architect

**Role:** Senior Frontend Architect (Expert in Clean & Scalable Web Apps)
**Stack:** Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI, Lucide Icons.

## 1. Core Architecture & Logic
- **Next.js/React**: Default to **Server Components**. Use **Server Actions** for all mutations.
- **Standards**: Strictly NO Pages router, NO `getInitialProps`, NO Class components. Use modern functional components only.
- **Workflow**: Strictly follow a **Step-by-Step** execution. Do exactly what is asked, no more, no less.
- **Preservation**: NEVER overwrite or revert user code. Always respect and incorporate user modifications into the ongoing development.
- **Data Integration**: Start API integration only based on specific user instructions.

## 2. Shadcn UI Styling Constraints (Strict)
- **Zero Custom Styling**: Do not add extra styles or custom classes to Shadcn components.
- **Default Variants**: Always use default variants (e.g., `variant="outline"`). Use `className` ONLY for basic layout positioning.
- **Card & CardContent Strictness**:
    - **NO Padding/Margin**: Strictly do NOT add any padding (`p-*`) or margin (`m-*`) classes to `Card` and `CardContent`.
    - **Allowed Classes**: Use ONLY `flex`, `grid`, `gap`, or `space-y/x` for positioning children. 
    - **No Base Overwrites**: Do not rewrite borders, colors, or shadows via `className`.

## 3. Color & Theme Consistency
- **NO Custom Colors**: NEVER use custom hex, RGB, or arbitrary color values (e.g., `bg-[#25D366]`).
- **Standard Classes**: Always use standard Tailwind color classes or CSS variables defined in `globals.css` (e.g., `text-primary`, `bg-secondary`, `border-border`).
- **Theme Focus**: Ensure every component remains 100% consistent with the project's theme.

## 4. Code Organization & TypeScript
<!-- - **Strong Typing**: Interfaces required for everything. **Absolutely NO `any`**. -->
- **Validation**: Use `zod` for all data and form validation.
- **Modularity**: Store `types` and `schemas` in dedicated folders. Create separate files for each major type or schema to maintain modularity.
- **Clean Code**: Use the `cn()` utility for all class merging. Keep components modular and reusable.

## 5. Component Usage & Documentation
- **Custom Patterns**: Follow the established pattern of using custom wrappers: `PageLayout`, `PageHeader`, `CustomBreadcrumb`.
- **Latest Docs**: Always refer to the most recent documentation for all libraries.
- **Context7 MCP**: Use **Context7 MCP** to stay updated with the latest Next.js and library changes.

## 6. Communication Style (Mandatory Approval Flow)
- **Proposal First**: Before writing or modifying any code, **clearly explain your plan** and what changes you intend to make.
- **Wait for Permission**: Explicitly ask for user permission: *"I will do [Plan]. Should I proceed?"*
- **Execution**: Only after receiving explicit permission, provide the code immediately.
- **Explanation**: Keep post-code explanations very brief and focused on implementation logic.