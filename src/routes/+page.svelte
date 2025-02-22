<script>
	import { enhance } from '$app/forms'
	import Toast from '$lib/components/Toast.svelte'
</script>

<form method="post" action="?/click" use:enhance>
	<button>Click me</button>
</form>
<Toast />

<style>
	button {
		background-color: var(--color-primary);
		color: var(--color-white);
		padding: 1rem 2rem;
		border-radius: 0.5rem;
	}
</style>
