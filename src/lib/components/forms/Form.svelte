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
		resetButtonText = 'Reset',
		showReset = true,
		onsubmitstart,
		onsubmitend
	}: {
		inputs?: FormInputs
		groups?: FormGroup[]
		action: string
		buttonText?: string
		resetButtonText?: string
		showReset?: boolean
		onsubmitstart?: () => void
		onsubmitend?: () => void
	} = $props()

	let groups = $state(propGroups ?? [{ rows: propInputs ?? [] }])
	let submitting = $state(false)
	let defaultValues: Map<string, string> = $state(new Map())

	$effect(() => {
		groups = propGroups ?? [{ rows: propInputs ?? [] }]
	})

	const allInputs = $derived(groups.flatMap((g) => g.rows))

	// Capture defaults on first render
	$effect(() => {
		if (defaultValues.size === 0) {
			const defaults = new Map<string, string>()
			for (const row of allInputs) {
				for (const input of row) {
					defaults.set(input.id, input.value)
				}
			}
			defaultValues = defaults
		}
	})

	const valid = $derived(
		allInputs.every((row) =>
			row.every((input) => {
				return input.validations.every(([validation]) => {
					return !validation(input.value, allInputs)
				})
			})
		)
	)

	const hasChanges = $derived(
		allInputs.some((row) =>
			row.some((input) => {
				return defaultValues.get(input.id) !== input.value
			})
		)
	)

	function isChanged(inputId: string, value: string): boolean {
		return defaultValues.has(inputId) && defaultValues.get(inputId) !== value
	}

	function reset() {
		for (const row of allInputs) {
			for (const input of row) {
				const def = defaultValues.get(input.id)
				if (def !== undefined) {
					input.value = def
				}
			}
		}
	}

	function updateDefaults() {
		const defaults = new Map<string, string>()
		for (const row of allInputs) {
			for (const input of row) {
				defaults.set(input.id, input.value)
			}
		}
		defaultValues = defaults
	}
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
			updateDefaults()
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
									changed={isChanged(input.id, input.value)}
								/>
							{:else if input.type === 'checkbox'}
								<Switch
									{...input}
									bind:value={input.value}
									inputs={allInputs}
									changed={isChanged(input.id, input.value)}
								/>
							{:else}
								<Input
									{...input}
									bind:value={input.value}
									inputs={allInputs}
									changed={isChanged(input.id, input.value)}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/each}
		</fieldset>
	{/each}
	<div class="form__actions">
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
		{#if showReset && hasChanges}
			<button type="button" class="button--secondary form__reset" onclick={reset} transition:slide>
				{resetButtonText}
			</button>
		{/if}
	</div>
</form>

<style lang="scss">
	.form {
		display: flex;
		flex-direction: column;
		gap: calc(var(--spacing-unit) * 4);
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
	}

	.form__row {
		display: flex;
		& > * {
			flex-grow: 1;
		}
	}

	.form__actions {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-unit) * 2);
	}

	.form__reset {
		background: transparent;
		border: 1px solid var(--theme-neutral-400);
		color: var(--theme-text);
		padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
		border-radius: var(--rounded-sm);
		cursor: pointer;
		font-size: var(--text-sm);

		&:hover {
			background: var(--theme-neutral-200);
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
