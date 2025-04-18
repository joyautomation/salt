<script>
	import '$lib/styles/main.scss'
	import { enhance } from '$app/forms'
	import Toast from '$lib/components/Toast.svelte'
	import Icon from '../lib/components/Icon.svelte'
</script>

<form class="m-10 flex align-center" method="post" action="?/click" use:enhance>
	<button class="button--primary">Click me</button>
</form>
<Icon path="outline/academic-cap" size={48} />
<Toast />
