<script lang="ts">
	import { slide } from 'svelte/transition'
	import type { FormInputs, InputProps } from './types.js'

	let {
		id,
		name,
		label,
		value = $bindable(''),
		validations,
		inputs,
		options,
		changed = false
	}: InputProps & {
		inputs?: FormInputs
		options: { value: string; label: string }[]
		changed?: boolean
	} = $props()
	const validationResult = $derived(
		validations.find(([validation]) => {
			return validation(value, inputs ?? [])
		})?.[1] || null
	)
</script>

<div
	class="select-field"
	class:select-field--invalid={validationResult != null}
	class:select-field--changed={changed}
>
	{#if label != null}
		<label for={id}>{label}</label>
	{/if}
	<select {id} {name} bind:value>
		{#each options as option}
			<option value={option.value}>{option.label}</option>
		{/each}
	</select>
	{#if validationResult != null}<div transition:slide class="select-field__validation">
			{validationResult}
		</div>{/if}
</div>

<style lang="scss">
	.select-field {
		display: flex;
		flex-direction: column;
		& > .select-field__validation {
			color: var(--theme-error-400, var(--red-400));
			font-size: var(--text-xs);
			line-height: var(--text-xs-lh);
		}
		& > label {
			color: var(--theme-text);
			font-family: var(--theme-font-basic, inherit);
			font-size: var(--text-sm);
			line-height: var(--text-sm-lh);
			text-transform: capitalize;
		}
		& > * {
			margin-top: var(--spacing-unit);
		}
		& > select {
			background-color: var(--theme-neutral-200);
			border: solid 1px var(--theme-neutral-300);
			color: var(--theme-text);
			padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
			border-radius: var(--rounded-sm);
			font-size: var(--text-base);
		}
		& > select:focus {
			outline: none;
			border-color: var(--theme-primary);
		}
	}
	.select-field--changed {
		& > select {
			border-left: solid 3px var(--theme-primary);
		}
	}
	.select-field--invalid {
		& > select {
			border: solid 1px var(--theme-error-400, var(--red-400));
		}
	}
</style>
