<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	import type { FormInputs } from './types.js';
	import { slide } from 'svelte/transition';

	const {
		inputs: propInputs,
		action,
		buttonText = 'Submit',
		onsubmitstart,
		onsubmitend
	}: {
		inputs: FormInputs;
		action: string;
		buttonText?: string;
		onsubmitstart?: () => void;
		onsubmitend?: () => void;
	} = $props();

	let inputs = $state(propInputs);
	let submitting = $state(false);

	$effect(() => {
		inputs = propInputs;
	});

	const valid = $derived(
		inputs.every((row) =>
			row.every((input) => {
				return input.validations.every(([validation, _message]) => {
					return !validation(input.value, inputs);
				});
			})
		)
	);
</script>

<form
	class="form space-y-1"
	method="post"
	{action}
	use:enhance={() => {
		submitting = true;
		onsubmitstart?.();
		return async ({ update }) => {
			submitting = false;
			onsubmitend?.();
			update({ reset: false });
		};
	}}
>
	{#each inputs as row}
		<div class="form__row">
			{#each row as input}
				<div>
					{#if input.type === 'select'}
						<Select {...input} bind:value={input.value} {inputs} options={input.options || []} />
					{:else}
						<Input {...input} bind:value={input.value} {inputs} />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
	<button class="button--primary" disabled={!valid || submitting}>
		{#if submitting}
			<div class="form__spinner-container" transition:slide>
				<span class="form__spinner"></span>
			</div>
		{:else}
			<div transition:slide>
				{buttonText}
			</div>
		{/if}
	</button>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		& > .form__row {
			display: flex;
			& > * {
				flex-grow: 1;
			}
		}
	}

	.form__spinner-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.form__spinner {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid var(--theme-neutral-300);
		border-top-color: var(--white, #fff);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
