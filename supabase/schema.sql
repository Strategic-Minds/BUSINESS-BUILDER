create extension if not exists "uuid-ossp";

create table if not exists clients (
  id uuid primary key default uuid_generate_v4(),
  company_name text not null,
  primary_contact_name text,
  primary_contact_email text unique,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists client_users (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  auth_user_id uuid unique,
  role text not null default 'client',
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid unique not null,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  client_id uuid references clients(id) on delete cascade,
  name text not null,
  status text not null default 'draft',
  gated_step text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_steps (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  step_number integer not null,
  title text not null,
  status text not null check (status in ('locked','active','submitted','approved','revision requested','complete')),
  explanation text,
  receipt_timestamp timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists deliverables (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  title text not null,
  deliverable_type text not null,
  status text not null default 'draft',
  storage_url text,
  thumbnail_url text,
  updated_at timestamptz not null default now()
);

create table if not exists approvals (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  deliverable_id uuid references deliverables(id) on delete set null,
  requested_by uuid,
  approved_by uuid,
  action text not null,
  notes text,
  status text not null default 'submitted',
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete set null,
  stripe_session_id text,
  package_id text,
  amount_cents integer,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  channel text not null,
  recipient text,
  message_preview text not null,
  approved_by uuid,
  sent_at timestamptz,
  status text not null default 'preview',
  created_at timestamptz not null default now()
);

create table if not exists receipts (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references projects(id) on delete cascade,
  receipt_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table clients enable row level security;
alter table client_users enable row level security;
alter table admin_users enable row level security;
alter table projects enable row level security;
alter table project_steps enable row level security;
alter table deliverables enable row level security;
alter table approvals enable row level security;
alter table payments enable row level security;
alter table notifications enable row level security;
alter table receipts enable row level security;

-- Policy recommendations:
-- Clients can only read rows tied to their client_users.client_id.
-- Admins can see all project, approval, deliverable, notification, and receipt records.
-- Service role handles system jobs, receipt writes, cron checks, and payment reconciliation.
-- Payments are server-only and should be written through Stripe webhooks or service role.
-- Notification sending is admin-approved before live Twilio/WhatsApp execution.
