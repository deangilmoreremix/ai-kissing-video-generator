create table public.kissing_video_creations (
  id uuid primary key default gen_random_uuid(),
  male_image text not null,
  female_image text not null,
  stitched_image text not null,
  prompt text not null,
  model_id text not null,
  aspect_ratio text default '16:9',
  duration integer default 5,
  resolution text default '720p',
  request_id text unique,
  status text default 'processing',
  result_video text,
  error text,
  credit_cost integer default 1,
  created_at timestamp default now()
);

alter table public.kissing_video_creations enable row level security;

create policy "Allow public read" on public.kissing_video_creations for select using (true);
