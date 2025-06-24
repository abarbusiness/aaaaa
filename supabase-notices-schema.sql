-- Supabase SQL for Notices Table
create table if not exists notices (
  id serial primary key,
  lines text[] not null,
  updated_at timestamptz default now()
);

-- Insert default notice (optional)
insert into notices (lines) values ('{"First notice line","Second notice line","Third notice line","Fourth notice line","Fifth notice line"}');
