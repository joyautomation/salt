<script lang="ts">
	import { slide } from 'svelte/transition'
	import type { FormInputs, InputProps } from './types.js'

	let {
		id,
		name,
		label,
		type,
		step,
		value = $bindable(''),
		validations,
		inputs,
		touched = false,
		changed = false,
		onblur = () => {}
	}: InputProps & {
		inputs?: FormInputs
		touched?: boolean
		changed?: boolean
		onblur?: () => void
	} = $props()
	const validationResult = $derived(
		validations.find(([validation]) => {
			return validation(value, inputs ?? [])
		})?.[1] || null
	)
</script>

<div
	class="input"
	class:input--invalid={touched && validationResult != null}
	class:input--changed={changed}
>
	{#if label != null}
		<label for={id}>{label}</label>
	{/if}
	{#if type === 'textarea'}
		<textarea {id} {name} bind:value {onblur}></textarea>
	{:else}
		<input {id} {name} {step} {type} bind:value {onblur} />
	{/if}
	{#if touched && validationResult != null}<div transition:slide class="input__validation">
			{validationResult}
		</div>{/if}
</div>

<style lang="scss">
	.input {
		display: flex;
		flex-direction: column;
		& > .input__validation {
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
		& > input,
		& > textarea {
			background-color: var(--theme-neutral-200);
			border: solid 1px var(--theme-neutral-300);
			color: var(--theme-text);
			padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
			border-radius: var(--rounded-sm);
			font-size: var(--text-base);
		}
		& > input:focus,
		& > textarea:focus {
			outline: none;
			border-color: var(--theme-primary);
		}
		& > textarea {
			resize: vertical;
			min-height: 100px;
			font-family: inherit;
		}
	}
	.input--changed {
		& > input,
		& > textarea {
			border-left: solid 3px var(--theme-primary);
		}
	}
	.input--invalid {
		& > input,
		& > textarea {
			border: solid 1px var(--theme-error-400, var(--red-400));
		}
	}
</style>
