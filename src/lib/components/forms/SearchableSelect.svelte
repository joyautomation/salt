<script lang="ts">
	import ChevronDown from '../icons/outline/ChevronDown.svelte';

	type Option = {
		value: string;
		label: string;
		sublabel?: string;
	};

	type Props = {
		options: Option[];
		placeholder?: string;
		onSelect: (option: Option) => void;
		disabled?: boolean;
	};

	let { options, placeholder = 'Select...', onSelect, disabled = false }: Props = $props();

	let isOpen = $state(false);
	let searchQuery = $state('');
	let highlightedIndex = $state(-1);
	let inputRef: HTMLInputElement | undefined = $state();
	let dropdownRef: HTMLDivElement | undefined = $state();

	let filteredOptions = $derived(
		searchQuery.trim() === ''
			? options
			: options.filter((opt) => {
					const query = searchQuery.toLowerCase();
					return (
						opt.label.toLowerCase().includes(query) ||
						(opt.sublabel && opt.sublabel.toLowerCase().includes(query))
					);
				})
	);

	function openDropdown() {
		if (disabled) return;
		isOpen = true;
		highlightedIndex = -1;
		setTimeout(() => inputRef?.focus(), 0);
	}

	function closeDropdown() {
		isOpen = false;
		searchQuery = '';
		highlightedIndex = -1;
	}

	function selectOption(option: Option) {
		onSelect(option);
		closeDropdown();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen) {
			if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
				e.preventDefault();
				openDropdown();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
				scrollToHighlighted();
				break;
			case 'ArrowUp':
				e.preventDefault();
				highlightedIndex = Math.max(highlightedIndex - 1, 0);
				scrollToHighlighted();
				break;
			case 'Enter':
				e.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
					selectOption(filteredOptions[highlightedIndex]);
				}
				break;
			case 'Escape':
				e.preventDefault();
				closeDropdown();
				break;
			case 'Tab':
				closeDropdown();
				break;
		}
	}

	function scrollToHighlighted() {
		if (!dropdownRef || highlightedIndex < 0) return;
		const items = dropdownRef.querySelectorAll('.searchable-select__option');
		const item = items[highlightedIndex] as HTMLElement;
		if (item) {
			item.scrollIntoView({ block: 'nearest' });
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as Node;
		if (dropdownRef && !dropdownRef.contains(target)) {
			closeDropdown();
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside, true);
			return () => document.removeEventListener('click', handleClickOutside, true);
		}
	});

	$effect(() => {
		if (searchQuery) {
			highlightedIndex = filteredOptions.length > 0 ? 0 : -1;
		}
	});
</script>

<div class="searchable-select" class:searchable-select--disabled={disabled}>
	<button
		type="button"
		class="searchable-select__trigger"
		onclick={openDropdown}
		onkeydown={handleKeydown}
		{disabled}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="searchable-select__placeholder">{placeholder}</span>
		<span class="searchable-select__chevron" class:searchable-select__chevron--open={isOpen}>
			<ChevronDown size="1rem" />
		</span>
	</button>

	{#if isOpen}
		<div class="searchable-select__dropdown" bind:this={dropdownRef}>
			<div class="searchable-select__search">
				<input
					bind:this={inputRef}
					type="text"
					class="searchable-select__input"
					placeholder="Search..."
					bind:value={searchQuery}
					onkeydown={handleKeydown}
				/>
			</div>
			<div class="searchable-select__options" role="listbox">
				{#if filteredOptions.length === 0}
					<div class="searchable-select__empty">No matches found</div>
				{:else}
					{#each filteredOptions as option, i}
						<button
							type="button"
							class="searchable-select__option"
							class:searchable-select__option--highlighted={i === highlightedIndex}
							onclick={() => selectOption(option)}
							onmouseenter={() => (highlightedIndex = i)}
							role="option"
							aria-selected={i === highlightedIndex}
						>
							<span class="searchable-select__option-label">{option.label}</span>
							{#if option.sublabel}
								<span class="searchable-select__option-sublabel">{option.sublabel}</span>
							{/if}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.searchable-select {
		position: relative;
		width: 100%;
	}

	.searchable-select--disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.searchable-select__trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 40px;
		padding: 0 calc(var(--spacing-unit) * 2);
		border: 1px solid var(--theme-neutral-300);
		border-radius: var(--rounded-sm);
		background-color: var(--theme-neutral-200);
		color: var(--theme-text);
		font-size: var(--text-base);
		cursor: pointer;
		transition:
			border-color 0.15s ease,
			background-color 0.15s ease;

		&:hover:not(:disabled) {
			border-color: var(--theme-neutral-400);
		}

		&:focus {
			outline: none;
			border-color: var(--theme-primary);
		}
	}

	.searchable-select__placeholder {
		color: var(--theme-neutral-500);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.searchable-select__chevron {
		display: flex;
		align-items: center;
		color: var(--theme-neutral-500);
		transition: transform 0.2s ease;
		flex-shrink: 0;
		margin-left: calc(var(--spacing-unit) * 1);
	}

	.searchable-select__chevron--open {
		transform: rotate(-180deg);
	}

	.searchable-select__dropdown {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		right: 0;
		z-index: 100;
		border: 1px solid var(--theme-neutral-300);
		border-radius: var(--rounded-md, var(--rounded-sm));
		background-color: var(--theme-neutral-100);
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.searchable-select__search {
		padding: calc(var(--spacing-unit) * 1.5);
		border-bottom: 1px solid var(--theme-neutral-200);
	}

	.searchable-select__input {
		width: 100%;
		height: 32px;
		padding: 0 calc(var(--spacing-unit) * 1.5);
		border: 1px solid var(--theme-neutral-300);
		border-radius: var(--rounded-sm);
		background-color: var(--theme-neutral-50, var(--theme-neutral-100));
		color: var(--theme-text);
		font-size: var(--text-sm);

		&::placeholder {
			color: var(--theme-neutral-400);
		}

		&:focus {
			outline: none;
			border-color: var(--theme-primary);
		}
	}

	.searchable-select__options {
		max-height: 240px;
		overflow-y: auto;
	}

	.searchable-select__option {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 2);
		border: none;
		background: transparent;
		color: var(--theme-text);
		font-size: var(--text-sm);
		text-align: left;
		cursor: pointer;
		transition: background-color 0.1s ease;

		&:hover,
		&.searchable-select__option--highlighted {
			background-color: var(--theme-neutral-200);
		}
	}

	.searchable-select__option-label {
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.searchable-select__option-sublabel {
		font-size: var(--text-xs);
		color: var(--theme-neutral-500);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	.searchable-select__empty {
		padding: calc(var(--spacing-unit) * 3) calc(var(--spacing-unit) * 2);
		text-align: center;
		color: var(--theme-neutral-500);
		font-size: var(--text-sm);
	}
</style>
