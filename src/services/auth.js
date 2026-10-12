import { supabase } from './supabase.js';
import { createProfile, getProfileById, updateProfile } from './profiles.js';

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

export async function logout() {
    await supabase.auth.signOut();
}

export async function updateAuthProfile(data) {
    try {
        await updateProfile(userData.id, data);

        userData = {
            ...userData,
            ...data,
        };
        notifyAll();
    } catch (error) {
        throw error;
    }
}

export function subscribeToAuthChanges(callback) {
    observers.push(callback);

    notify(callback);
}

function notify(callback) {
    callback({ ...userData });
}

function notifyAll() {
    observers.forEach(notify);
}
