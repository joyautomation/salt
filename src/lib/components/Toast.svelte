<script lang="ts">
	import { page } from '$app/state'
	import { notifications, addNotification } from '$lib/state/notifications.svelte'
	import { slide } from 'svelte/transition'

	let lastProcessedTime = 0

	$effect(() => {
		const formData = page.form
		const now = Date.now()
		// Only process if we have new form data with a message
		// and enough time has passed since the last notification (e.g., 50ms)
		if (formData?.message && now - lastProcessedTime > 50) {
			lastProcessedTime = now
			addNotification(formData)
		}
	})
</script>

<div class="toast">
	{#each notifications.current as notification}
		<div
			class:toast--success={notification.type === 'success'}
			class:toast--error={notification.type === 'error'}
			class:toast--warning={notification.type === 'warning'}
			transition:slide
		>
			{notification.message}
		</div>
	{/each}
</div>

<style lang="scss">
	.toast {
		position: fixed;
		top: var(--spacing-unit);
		right: 0;
		left: 0;
		margin: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: calc(var(--spacing-unit) * 3);
		z-index: 1000;
		display: flex;
		flex-direction: column-reverse;
		gap: var(--spacing-unit);
		pointer-events: none;
		border-radius: var(--rounded-md);
		& > div {
			padding: calc(var(--spacing-unit) * 2);
			border-radius: var(--rounded-md);
			font-size: var(--text-sm);
			pointer-events: auto;
		}
	}
	.toast--success {
		border: solid 1px var(--green-600);
		background-color: var(--green-200);
		color: var(--green-600);
	}
	.toast--error {
		border: solid 1px var(--red-600);
		background-color: var(--red-200);
		color: var(--red-600);
	}
	.toast--warning {
		border: solid 1px var(--amber-600);
		background-color: var(--amber-200);
		color: var(--amber-600);
	}
</style>
