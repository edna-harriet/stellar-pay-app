
import { get, derived } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

// Create a store to manage authentication state
function createAuthStore() {
    const { subscribe, set, update } = persisted('bpa:authStore', { userId: '', email: '' });

    return {
        subscribe,

        // @ts-ignore
        async register(user) {
            try {
                // Ensure all required fields are provided
                if (!user?.firstName || !user?.lastName || !user?.email || !user?.password) {
                    return { success: false, message: 'All fields are required' };
                }

                const response = await fetch('http://localhost:5000/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    return { success: false, message: errorData.message || 'Signup failed' };
                }

                const data = await response.json();
                
                set({ userId: data.userId, email: user.email });
                console.log('User registered:', data);

                return { success: true, message: 'Registration successful' };

            } catch (err) {
                console.error('Error registering user:', err);
                return { success: false, message: 'Failed to register. Please try again later.' };
            }
        },

        // async login({ email, password }) {
        //     try {
        //         if (!email || !password) {
        //             return { success: false, message: 'Email and password are required' };
        //         }

        //         const response = await fetch('http://localhost:5000/api/login', {
        //             method: 'POST',
        //             headers: { 'Content-Type': 'application/json' },
        //             body: JSON.stringify({ email, password }),
        //         });

        //         if (!response.ok) {
        //             const errorData = await response.json();
        //             return { success: false, message: errorData.message || 'Login failed' };
        //         }

        //         const data = await response.json();

        //         set({ userId: data.userId, email: email });
        //         console.log('User logged in:', data);

        //         return { success: true, message: 'Login successful' };

        //     } catch (err) {
        //         console.error('Error logging in:', err);
        //         return { success: false, message: 'Failed to log in. Please try again later.' };
        //     }
        // },

        // logout() {
        //     set({ userId: '', email: '' });
        //     console.log('User logged out');
        // }
    };
}

// Create an instance of the auth store
export const authStore = createAuthStore();

// Derived store to check if a user is logged in
export const isLoggedIn = derived(authStore, ($authStore) => !!$authStore.userId);
   