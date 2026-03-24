<script lang="ts">
	import type { FormInputs, InputProps } from './types.js'

	let {
		id,
		name,
		label,
		value = $bindable('false')
	}: InputProps & { inputs?: FormInputs } = $props()

	const checked = $derived(value === 'true')

	function toggle() {
		value = value === 'true' ? 'false' : 'true'
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault()
			toggle()
		}
	}
</script>

<div class="switch-field">
	{#if label != null}
		<label for={id}>{label}</label>
	{/if}
	<button
		type="button"
		{id}
		class="switch"
		class:switch--active={checked}
		onclick={toggle}
		onkeydown={handleKeydown}
		role="switch"
		aria-checked={checked}
		aria-label={label ?? name}
	>
		<span class="switch__slider"></span>
	</button>
	<input {name} type="hidden" value={checked} />
</div>

<style lang="scss">
	.switch-field {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-unit) * 2);

		& > label {
			color: var(--theme-text);
			font-family: var(--theme-font-basic, inherit);
			font-size: var(--text-sm);
			line-height: var(--text-sm-lh);
			text-transform: capitalize;
		}
	}

	.switch {
		position: relative;
		display: inline-block;
		width: 40px;
		height: 24px;
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		flex-shrink: 0;
	}

	.switch__slider {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--theme-neutral-400);
		border-radius: 12px;
		transition: background-color 0.2s ease;

		&::before {
			content: '';
			position: absolute;
			top: 2px;
			left: 2px;
			width: 20px;
			height: 20px;
			background-color: white;
			border-radius: 50%;
			transition: transform 0.2s ease;
		}
	}

	.switch--active .switch__slider {
		background-color: var(--theme-primary);

		&::before {
			transform: translateX(16px);
		}
	}

	.switch:focus-visible .switch__slider {
		outline: 2px solid var(--theme-primary);
		outline-offset: 2px;
	}
</style>
