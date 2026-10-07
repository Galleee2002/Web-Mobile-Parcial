import { supabase } from './supabase.js';

/**
 * Trae el perfil de un usuario por su id.
 *
 * @param {string} id
 * @returns {Promise<{id: string, email: string, display_name: string|null, bio: string|null, created_at: string}|undefined>}
 */
export async function getProfileById(id) {
    const { data, error } = await supabase.from('profiles').select().eq('id', id);

    if (error) {
        console.error('[profiles.js getProfileById] Error al traer el perfil: ', error);
        throw new Error(error.message);
    }

    // Se filtra por la PK, así que hay un solo resultado como máximo.
    return data[0];
}

/**
 * Crea el perfil de un usuario recién registrado.
 *
 * @param {{id: string, email: string}} data
 * @returns {Promise<void>}
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
