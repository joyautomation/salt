<script lang="ts">
	import { enhance } from '$app/forms'
	import Input from './Input.svelte'
	import Select from './Select.svelte'
	import Switch from './Switch.svelte'
	import type { FormGroup, FormInputs } from './types.js'
	import { slide } from 'svelte/transition'

	const {
		inputs: propInputs,
		groups: propGroups,
		action,
		buttonText = 'Submit',
		onsubmitstart,
		onsubmitend
	}: {
		inputs?: FormInputs
		groups?: FormGroup[]
		action: string
		buttonText?: string
		onsubmitstart?: () => void
		onsubmitend?: () => void
	} = $props()

	let groups = $state(propGroups ?? [{ rows: propInputs ?? [] }])
	let submitting = $state(false)

	$effect(() => {
		groups = propGroups ?? [{ rows: propInputs ?? [] }]
	})

	const allInputs = $derived(groups.flatMap((g) => g.rows))

	const valid = $derived(
		allInputs.every((row) =>
			row.every((input) => {
				return input.validations.every(([validation]) => {
					return !validation(input.value, allInputs)
				})
			})
		)
	)
</script>

<form
	class="form space-y-1"
	method="post"
	{action}
	use:enhance={() => {
		submitting = true
		onsubmitstart?.()
		return async ({ update }) => {
			submitting = false
			onsubmitend?.()
			update({ reset: false })
		}
	}}
>
	{#each groups as group}
		<fieldset class="form__group">
			{#if group.heading}
				<legend class="form__group-heading">{group.heading}</legend>
			{/if}
			{#each group.rows as row}
				<div class="form__row">
					{#each row as input}
						<div>
							{#if input.type === 'select'}
								<Select
									{...input}
									bind:value={input.value}
									inputs={allInputs}
									options={input.options || []}
								/>
							{:else if input.type === 'checkbox'}
								<Switch {...input} bind:value={input.value} inputs={allInputs} />
							{:else}
								<Input {...input} bind:value={input.value} inputs={allInputs} />
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</fieldset>
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
	}

	.form__group {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-unit) * 1);
	}

	.form__group-heading {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--theme-text);
		padding: 0;
		margin-bottom: calc(var(--spacing-unit) * 1);
	}

	.form__row {
		display: flex;
		& > * {
			flex-grow: 1;
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
