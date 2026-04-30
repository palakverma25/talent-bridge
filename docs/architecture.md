# Architecture Documentation

## Application Layers

- `src/app` contains route-based UI surfaces (home, jobs, auth, dashboards).
- `src/components` contains reusable view components.
- `src/lib` contains data helpers, auth guards, and Supabase client wrappers.
- `supabase/migrations` contains database schema for production setup.

## Data Flow

1. User navigates pages rendered via Next.js App Router.
2. Pages pull data from mock data or Supabase-backed routes.
3. Auth pages use Supabase browser client for sign-in/sign-up.
4. Role-protected routes call `requireRole()` to enforce access.
5. API endpoints expose job listing and job detail responses.

## Key Files

- `src/lib/auth.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/data/mock.ts`
- `src/app/jobs/page.tsx`
- `src/app/dashboard/candidate/page.tsx`
- `src/app/dashboard/employer/page.tsx`

## Database Model

- `profiles` - user identities and role mapping.
- `companies` - employer-owned company entities.
- `jobs` - posted roles.
- `applications` - candidate applications for jobs.
- `saved_jobs` - candidate wishlist.
