import { supabase } from './supabase.js';

/**
 *
 * @param {string} id
 * @returns {Promise<{id: string, email: string, display_name: string|null, bio: string|null, created_at: string}>}
 */
export async function getProfileById(id) {
    const { data, error } = await supabase.from('profiles').select().eq('id', id);

    if (error) {
        console.error('[profiles.js getProfileById] Error al traer el perfil: ', error);
        throw new Error(error.message);
    }

    return data[0];
}

/**
 *
 * @param {{id: string, email: string}} data
 */
export async function createProfile({ id, email }) {
    const { error } = await supabase.from('profiles').insert({
        id: id,
        email: email,
    });

    if (error) {
        console.error('[profiles.js createProfile] Error al crear el perfil: ', error);
        throw new Error(error.message);
    }
}

/**
 *
 * @param {string} id
 * @param {{display_name?: string|null, bio?: string|null}} data
 */
export async function updateProfile(id, data) {
    const { error } = await supabase.from('profiles').update(data).eq('id', id);

    if (error) {
        console.error('[profiles.js updateProfile] Error al editar el perfil: ', error);
        throw new Error(error.message);
    }
}
