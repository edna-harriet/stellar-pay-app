
<script>
    import { authStore } from '$lib/stores/authStore';

    let firstName = '', lastName = '', email = '', password = '';
    let message = '';

    async function handleSignup() {
        const response = await authStore.register({ firstName, lastName, email, password });
        message = response.message;
    }
</script>

<form on:submit|preventDefault={handleSignup}>
    <input bind:value={firstName} placeholder="First Name" required />
    <input bind:value={lastName} placeholder="Last Name" required />
    <input bind:value={email} type="email" placeholder="Email" required />
    <input bind:value={password} type="password" placeholder="Password" required />
    <button type="submit">Sign Up</button>
</form>

<p>{message}</p>
