import { supabase } from './supabase.js';

/**
 *
 * @returns {Promise<{id: number, user_id: string, email: string, body: string, created_at: string}[]>}
 */
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

/**
 *
 * @param {string} userId
 * @returns {Promise<{id: number, user_id: string, email: string, body: string, created_at: string}[]>}
 */
export async function getPostsByUser(userId) {
    const { data, error } = await supabase
        .from('posts')
        .select()
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error(
            '[posts.js getPostsByUser] Error al traer las publicaciones del usuario: ',
            error,
        );
        throw new Error(error.message);
    }

    return data;
}

/**
 *
 * @param {{user_id: string, email: string, body: string}} data
 */
export async function createPost({ user_id, email, body }) {
    const { error } = await supabase.from('posts').insert({
        user_id: user_id,
        email: email,
        body: body,
    });

    if (error) {
        console.error('[posts.js createPost] Error al crear la publicación: ', error);
        throw new Error(error.message);
    }
}

/**
 *
 * @param {(post: {id: number, user_id: string, email: string, body: string, created_at: string}) => void} callback
 * @returns {() => void} Función para cancelar la suscripción.
 */
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
