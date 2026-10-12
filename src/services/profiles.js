import { supabase } from './supabase.js';

export async function getProfileById(id) {
    const { data, error } = await supabase.from('profiles').select().eq('id', id);

    if (error) {
        console.error('[profiles.js getProfileById] Error al traer el perfil: ', error);
        throw new Error(error.message);
    }

    // Se filtra por la PK, así que hay un solo resultado como máximo.
    return data[0];
}

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
