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
## 7. Established API Integration Pattern
- **Page Structure**: Integrated dashboard pages should be Server Components by default. Read `activeMessId` with `getActiveMessIdFromCookies()`, handle the no-active-mess empty state, fetch API data via service functions, then render `DashboardPageLayout`, `DashboardPageHeader`, filters, and `DataTable`.
- **Services**: Put API calls in `src/services/*.service.ts` with `"use server"`, `serverFetch`, `ApiResponse<T>`, `try/catch`, `buildQueryString(params)` for list endpoints, `tags` for GET, and `updateTag` for mutations.
- **Types**: Mirror backend response shapes in `src/types/*.type.ts`. Keep types explicit and close to the API contract; add optional fields only when backend data can vary.
- **Tables**: Use one `columns` export per table file, e.g. `export const columns: ColumnDef<T>[] = [...]`. Keep `ActionButtons` as a separate function inside `columns.tsx`. Do not create column factories or multiple column exports unless the existing module already does that.
- **Filtering & Pagination**: Use URL-driven filters with `useSmartFilter` and a small `*-filters.tsx` component. Pass backend `meta` into `DataTable` for server pagination. Do not use tabs for API status filtering when the backend supports query filters.
- **Modals & Actions**: Use `ModalWrapper` for view/create/convert/edit flows and `ConfirmationModal` for approve/reject/remove/status actions. Client modals should fetch their own auxiliary options when needed, matching existing modal patterns.
- **Cache Refresh**: Mutations should invalidate the relevant tags in services and call `router.refresh()` from client action components when the page data should update immediately.
- **Role Differences**: Prefer using the same `columns` file and hiding/showing action buttons inside `ActionButtons` based on route/role instead of creating separate table structures for manager/member views.
