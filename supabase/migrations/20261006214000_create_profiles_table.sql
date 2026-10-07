CREATE TABLE profiles (
    id uuid primary key references auth.users (id),
    email text not null,
    display_name text,
    bio text,
    created_at timestamptz default now()
);
