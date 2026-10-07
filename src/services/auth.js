import { supabase } from './supabase.js';
import { createProfile, getProfileById } from './profiles.js';

// Datos del usuario autenticado (el "subject" del patrón observer).
let userData = {
    id: null,
    email: null,
    display_name: null,
    bio: null,
};

// Callbacks suscriptos a los cambios de userData.
let observers = [];

supabase.auth.onAuthStateChange((event, session) => {
    if (session !== null) {
        userData = {
            id: session.user.id,
            email: session.user.email,
            display_name: null,
            bio: null,
        };

        getProfileById(userData.id).then((profile) => {
            // Justo después del registro el perfil todavía no existe.
            if (profile !== undefined) {
                userData = {
                    ...userData,
                    display_name: profile.display_name,
                    bio: profile.bio,
                };

                notifyAll();
            }
        });
    } else {
        userData = {
            id: null,
            email: null,
            display_name: null,
            bio: null,
        };
    }

    notifyAll();
});

/**
 * Crea una cuenta nueva y su perfil en la tabla profiles.
 *
 * @param {{email: string, password: string}} data
 * @returns {Promise<{id: string, email: string}>}
 */
export async function register({ email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error('[auth.js register] Error al crear la cuenta: ', error);
        throw new Error(error.message);
    }

    await createProfile({
        id: data.user.id,
        email: data.user.email,
    });

    return {
        id: data.user.id,
        email: data.user.email,
    };
}

/**
 * Inicia sesión con email y contraseña.
 *
 * @param {{email: string, password: string}} data
 * @returns {Promise<{id: string, email: string}>}
 */
export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('[auth.js login] Error al iniciar sesión: ', error);
        throw new Error(error.message);
    }

    return {
        id: data.user.id,
        email: data.user.email,
    };
}

/**
 * Cierra la sesión del usuario autenticado.
 *
 * @returns {Promise<void>}
 */
export async function logout() {
    await supabase.auth.signOut();
}

/**
 * Suscribe un callback a los cambios del usuario autenticado.
 * Lo ejecuta en el momento con los datos actuales.
 *
 * @param {(user: {id: string|null, email: string|null, display_name: string|null, bio: string|null}) => void} callback
 * @returns {void}
 */
export function subscribeToAuthChanges(callback) {
    observers.push(callback);

    notify(callback);
}

/**
 * @param {(user: {id: string|null, email: string|null, display_name: string|null, bio: string|null}) => void} callback
 */
function notify(callback) {
    callback({ ...userData });
}

function notifyAll() {
    observers.forEach(notify);
}
