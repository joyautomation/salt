<script lang="ts">
	import type { InputProps } from './types.js'

	const { id, name, label, type, value, validation }: InputProps = $props()
	const validationResult = $derived(validation(value))
</script>

<div class="input">
	<label for={id}>{label}</label>
	<input {id} {name} {type} />
	{#if validationResult != null}<div class="input__validation">{validationResult}</div>{/if}
</div>

<style lang="scss">
	.input {
		display: flex;
		flex-direction: column;
		& > * {
			margin-top: var(--spacing-unit);
		}
	}
</style>
