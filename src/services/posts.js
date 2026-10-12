import { supabase } from './supabase.js';

export async function getAllPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[posts.js getAllPosts] Error al traer las publicaciones: ', error);
        throw new Error(error.message);
    }

    return data;
}

export function subscribeToNewPosts(callback) {
    const postsChannel = supabase.channel('posts');

    postsChannel.on(
        'postgres_changes',
        {
            event: 'INSERT',
            schema: 'public',
            table: 'posts',
        },
        (payload) => {
            callback(payload.new);
        },
    );

    postsChannel.subscribe();

    return () => {
        postsChannel.unsubscribe();
    };
}
