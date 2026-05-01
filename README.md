# TalentBridge Job Board

A premium UX job board built with Next.js, TypeScript, Tailwind CSS, and a file-based state system.

## Features

- **Candidate Flow**: Discovery flow with filters, role pages, saved jobs, and application tracking.
- **Employer Flow**: Role-based dashboard, posting workflow, and applicant pipeline view.
- **Custom Authentication**: Custom JWT-based authentication flow (no third-party auth needed).
- **Stateful Local DB**: Fully stateful application using a file-based JSON database for jobs and applications.
- **Premium UI**: Vibrant color palette, glassmorphism, micro-animations, and dynamic data.
- **CI/CD Pipeline**: GitHub Actions for lint/test and automated Vercel deployment.

## Tech Stack

- `Next.js` (App Router) + `TypeScript`
- `Tailwind CSS`
- `jose` (for JWT Authentication)
- `React Hook Form` + `Zod`
- `Vitest` + Testing Library

## Local Setup

1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env.example` to `.env.local`
   - Add `JWT_SECRET` (optional, falls back to a default locally)
3. Run development server:
   - `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm run dev` - start local development server
- `npm run lint` - run ESLint
- `npm run typecheck` - run TypeScript type checks
- `npm run test` - run test suite
- `npm run build` - build for production

## Database & State

The project uses a local, lightweight file-based database for simplicity and immediate functionality.
Data is stored in `src/lib/data/db.json` and handled by `src/lib/db.ts`.

## CI/CD

- CI workflow: `.github/workflows/ci.yml`
- Deploy workflow: `.github/workflows/deploy-vercel.yml`

## Documentation

- `docs/features.md`
- `docs/architecture.md`
- `docs/deployment.md`
