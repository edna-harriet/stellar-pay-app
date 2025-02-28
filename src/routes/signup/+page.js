// import { get } from 'svelte/store';
// import { goto } from '$app/navigation';
// import { authStore } from '$lib/stores/authStore';

// /** @type {import('./$types').PageLoad} */
// export function load() {
//     const auth = get(authStore);
//     // If the user is already authenticated, redirect them to the dashboard.
//     if (auth.isLoggedIn) {
//         goto('/dashboard');
//     }
// }

import { get } from 'svelte/store';
import { goto } from '$app/navigation';
import { isLoggedIn } from '$lib/stores/authStore';

export function load() {
    if (get(isLoggedIn)) {
        goto('/dashboard');
    }
}
