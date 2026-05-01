# Architecture Documentation

## Application Layers

- `src/app` contains route-based UI surfaces (home, jobs, auth, dashboards).
- `src/components` contains reusable view components.
- `src/lib` contains data helpers, auth guards, server actions, and the file-based database logic.

## Data Flow

1. User navigates pages rendered via Next.js App Router.
2. Pages pull data directly from `src/lib/db.ts` (JSON file-based database).
3. Auth pages use Next.js Server Actions to issue `jose` JWT cookies for sign-in/sign-up.
4. Role-protected routes call `requireRole()` to enforce access via JWT payload.
5. Forms use Server Actions (`src/lib/actions.ts`) to mutate state (e.g., posting jobs, applying).

## Key Files

- `src/lib/auth.ts`
- `src/lib/actions.ts`
- `src/lib/db.ts`
- `src/lib/data/db.json`
- `src/app/jobs/page.tsx`
- `src/app/dashboard/candidate/page.tsx`
- `src/app/dashboard/employer/page.tsx`

## Database Model (db.json)

- `jobs` - posted roles with employer mapping.
- `applications` - candidate applications mapped to jobs.
