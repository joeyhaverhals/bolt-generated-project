-- Enable RLS
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.categories enable row level security;
alter table public.services enable row level security;
alter table public.testimonials enable row level security;
alter table public.faq enable row level security;
alter table public.media enable row level security;

-- Create tables
create table public.profiles (
  id uuid references auth.users on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content text,
  featured_image text,
  excerpt text,
  author_id uuid references public.profiles(id),
  status text default 'draft',
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  views integer default 0
);

create table public.post_categories (
  post_id uuid references public.posts(id) on delete cascade,
  category_id uuid references public.categories(id) on delete cascade,
  primary key (post_id, category_id)
);

create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  post_id uuid references public.posts(id) on delete cascade,
  author_id uuid references public.profiles(id),
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.reactions (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (post_id, user_id)
);

create table public.services (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  price decimal(10,2),
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.testimonials (
  id uuid default uuid_generate_v4() primary key,
  author_name text not null,
  content text not null,
  rating integer check (rating >= 1 and rating <= 5),
  avatar text,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.faq (
  id uuid default uuid_generate_v4() primary key,
  question text not null,
  answer text not null,
  category_id uuid references public.categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.media (
  id uuid default uuid_generate_v4() primary key,
  filename text not null,
  url text not null,
  mime_type text,
  size integer,
  uploaded_by uuid references public.profiles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes
create index idx_posts_author on public.posts(author_id);
create index idx_posts_status on public.posts(status);
create index idx_comments_post on public.comments(post_id);
create index idx_comments_status on public.comments(status);
create index idx_faq_category on public.faq(category_id);

-- Create functions
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Create triggers
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS Policies
-- Profiles
create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Posts
create policy "Published posts are viewable by everyone."
  on posts for select
  using ( status = 'published' );

create policy "Authors can create posts"
  on posts for insert
  with check ( auth.uid() = author_id );

create policy "Authors can update own posts"
  on posts for update
  using ( auth.uid() = author_id );

-- Comments
create policy "Comments are viewable by everyone."
  on comments for select
  using ( true );

create policy "Authenticated users can create comments"
  on comments for insert
  with check ( auth.role() = 'authenticated' );

create policy "Users can update own comments"
  on comments for update
  using ( auth.uid() = author_id );

-- Services
create policy "Services are viewable by everyone."
  on services for select
  using ( true );

create policy "Only admins can modify services"
  on services for all
  using ( auth.uid() in (
    select id from profiles where role = 'admin'
  ));

-- Testimonials
create policy "Approved testimonials are viewable by everyone."
  on testimonials for select
  using ( status = 'approved' );

create policy "Only admins can modify testimonials"
  on testimonials for all
  using ( auth.uid() in (
    select id from profiles where role = 'admin'
  ));

-- FAQ
create policy "FAQ entries are viewable by everyone."
  on faq for select
  using ( true );

create policy "Only admins can modify FAQ"
  on faq for all
  using ( auth.uid() in (
    select id from profiles where role = 'admin'
  ));
