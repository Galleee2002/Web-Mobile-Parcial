CREATE TABLE posts (
    id bigint primary key generated always as identity,
    user_id uuid not null references auth.users (id),
    email text not null,
    body text not null,
    created_at timestamptz default now()
);

-- Activamos "realtime" para la tabla.
ALTER PUBLICATION supabase_realtime ADD TABLE posts;
