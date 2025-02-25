<script>
	import '$lib/styles/main.scss'
	import { enhance } from '$app/forms'
	import Toast from '$lib/components/Toast.svelte'
</script>

<form class="m-10 flex align-center" method="post" action="?/click" use:enhance>
	<button class="button--primary">Click me</button>
</form>
<Toast />
