# Deployment Documentation

## CI/CD Workflows

- `ci.yml` runs on PR and push to `main`:
  - install
  - lint
  - type-check
  - test
  - build
- `deploy-vercel.yml` runs after successful CI on `main` and deploys to Vercel.

## GitHub Secrets Required

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Vercel Setup

1. Create a Vercel project and connect the GitHub repository.
2. Add the required project/environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Ensure branch deployments are enabled.

## Production Validation Checklist

- Home page loads and navigation works.
- Job listing filters return expected results.
- Job detail and apply form validation works.
- Candidate and employer dashboards render.
- GitHub Actions CI passes.
- Vercel deployment is green.
