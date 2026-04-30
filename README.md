# TalentBridge Job Board

A high-quality UX job board built with Next.js, TypeScript, Tailwind CSS, Supabase, and GitHub Actions CI/CD.

## Features

- Candidate discovery flow with filters, role pages, saved jobs, and application tracking.
- Employer flow with role-based dashboard, posting workflow, and applicant pipeline view.
- Role-based authentication setup (`candidate` and `employer`) with Supabase.
- Clean mobile-first UX with clear information hierarchy and state messaging.
- CI pipeline for lint, type-check, tests, and production build.
- Automated Vercel deployment workflow triggered after successful CI on `main`.

## Tech Stack

- `Next.js` (App Router) + `TypeScript`
- `Tailwind CSS`
- `Supabase` (`@supabase/supabase-js`, `@supabase/ssr`)
- `React Hook Form` + `Zod`
- `Vitest` + Testing Library
- `GitHub Actions` + `Vercel`

## Local Setup

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Fill `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Run development server:
   - `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript type checks
- `npm run test` - run test suite
- `npm run build` - build for production

## Database Setup

Run SQL migration from:

- `supabase/migrations/001_initial_schema.sql`

Core tables:

- `profiles`
- `companies`
- `jobs`
- `applications`
- `saved_jobs`

## CI/CD

- CI workflow: `.github/workflows/ci.yml`
- Deploy workflow: `.github/workflows/deploy-vercel.yml`

Required GitHub secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Documentation

- `docs/features.md`
- `docs/architecture.md`
- `docs/deployment.md`
