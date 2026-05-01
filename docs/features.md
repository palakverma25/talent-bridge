# Features Documentation

## Candidate Features

- Browse jobs with query, location, work mode, and job type filters.
- View job details with contextual information and a quick apply form.
- Save jobs for later review.
- Track applied jobs and current application status.

## Employer Features

- Sign in and select `employer` role through onboarding.
- Access employer dashboard with hiring funnel metrics.
- Post a new job using a structured form.
- View recent applicants and status buckets.

## Authentication And Roles

- Custom JWT-based authentication flow.
- Role (`candidate`, `employer`) is embedded in the JWT payload.
- Role checks gate dashboard routes and posting experience via Server Actions and `src/lib/auth.ts`.

## UX Decisions

- Mobile-first layouts and readable spacing hierarchy.
- Fast scanning via cards, chips, and concise metadata.
- High-signal CTAs for key actions: browse, post, apply.
- State visibility for demo/auth mode and form validations.
