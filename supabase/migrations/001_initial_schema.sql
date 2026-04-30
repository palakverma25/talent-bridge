create type user_role as enum ('candidate', 'employer');
create type work_mode as enum ('remote', 'hybrid', 'on-site');
create type job_type as enum ('full-time', 'part-time', 'contract', 'internship');
create type application_status as enum ('applied', 'in_review', 'shortlisted', 'interview', 'rejected', 'hired');

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique,
  role user_role not null,
  full_name text,
  headline text,
  created_at timestamptz not null default now()
);

create table if not exists companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  website text,
  location text,
  created_at timestamptz not null default now()
);

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references companies(id) on delete cascade,
  title text not null,
  location text not null,
  description text not null,
  salary_range text,
  work_mode work_mode not null,
  job_type job_type not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  candidate_id uuid not null references profiles(id) on delete cascade,
  cover_letter text,
  status application_status not null default 'applied',
  created_at timestamptz not null default now(),
  unique (job_id, candidate_id)
);

create table if not exists saved_jobs (
  candidate_id uuid not null references profiles(id) on delete cascade,
  job_id uuid not null references jobs(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (candidate_id, job_id)
);
