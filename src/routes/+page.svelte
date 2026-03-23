<script lang="ts">
	import '$lib/styles/main.scss';
	import { enhance } from '$app/forms';
	import Toast from '$lib/components/Toast.svelte';
	import Form from '$lib/components/forms/Form.svelte';
	import SearchableSelect from '$lib/components/forms/SearchableSelect.svelte';
	import type { FormInputs } from '$lib/components/forms/types.js';
	import * as outlineIcons from '$lib/components/icons/outline/index.js';
	import * as solidIcons from '$lib/components/icons/solid/index.js';
	import type { Component } from 'svelte';

	const tabs = ['Toast', 'Icons', 'Forms'] as const;
	let activeTab: (typeof tabs)[number] = $state('Toast');

	type IconEntry = { name: string; component: Component<{ size?: string }> };
	const outlineList: IconEntry[] = Object.entries(outlineIcons).map(([name, component]) => ({
		name,
		component: component as Component<{ size?: string }>
	}));
	const solidList: IconEntry[] = Object.entries(solidIcons).map(([name, component]) => ({
		name,
		component: component as Component<{ size?: string }>
	}));

	let iconStyle: 'outline' | 'solid' = $state('outline');
	let iconSearch = $state('');
	const iconList = $derived(iconStyle === 'outline' ? outlineList : solidList);
	const filteredIcons = $derived(
		iconSearch.trim() === ''
			? iconList
			: iconList.filter((i) => i.name.toLowerCase().includes(iconSearch.toLowerCase()))
	);

	const contactInputs: FormInputs = $state([
		[
			{
				id: 'name',
				name: 'name',
				label: 'Name',
				type: 'text',
				value: '',
				validations: [[(v) => v.trim().length === 0, 'Name is required']]
			},
			{
				id: 'email',
				name: 'email',
				label: 'Email',
				type: 'email',
				value: '',
				validations: [
					[(v) => v.trim().length === 0, 'Email is required'],
					[(v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email']
				]
			}
		],
		[
			{
				id: 'subject',
				name: 'subject',
				label: 'Subject',
				type: 'select',
				value: 'general',
				validations: [],
				options: [
					{ value: 'general', label: 'General Inquiry' },
					{ value: 'support', label: 'Support' },
					{ value: 'feedback', label: 'Feedback' }
				]
			}
		],
		[
			{
				id: 'message',
				name: 'message',
				label: 'Message',
				type: 'textarea',
				value: '',
				validations: [[(v) => v.trim().length === 0, 'Message is required']]
			}
		]
	]);

	let selectedItem = $state('');
	const searchableOptions = [
		{ value: 'svelte', label: 'Svelte', sublabel: 'Cybernetically enhanced web apps' },
		{ value: 'react', label: 'React', sublabel: 'A JavaScript library for building UIs' },
		{ value: 'vue', label: 'Vue', sublabel: 'The progressive JavaScript framework' },
		{ value: 'angular', label: 'Angular', sublabel: 'Platform for building mobile & desktop apps' },
		{ value: 'solid', label: 'SolidJS', sublabel: 'Simple and performant reactivity' }
	];
</script>

<div class="demo">
	<h1>Salt Component Library</h1>

	<nav class="tabs">
		{#each tabs as tab}
			<button
				class="tabs__tab"
				class:tabs__tab--active={activeTab === tab}
				onclick={() => (activeTab = tab)}
			>
				{tab}
			</button>
		{/each}
	</nav>

	<div class="tab-content">
		{#if activeTab === 'Toast'}
			<section>
				<h2>Toast Notifications</h2>
				<p>Click the button to trigger a toast notification via a SvelteKit form action.</p>
				<form class="flex align-center" method="post" action="?/click" use:enhance>
					<button class="button--primary">Trigger Toast</button>
				</form>
			</section>
		{:else if activeTab === 'Icons'}
			<section>
				<h2>Icons ({filteredIcons.length})</h2>
				<div class="icon-controls">
					<div class="icon-style-toggle">
						<button
							class="tabs__tab"
							class:tabs__tab--active={iconStyle === 'outline'}
							onclick={() => (iconStyle = 'outline')}
						>
							Outline
						</button>
						<button
							class="tabs__tab"
							class:tabs__tab--active={iconStyle === 'solid'}
							onclick={() => (iconStyle = 'solid')}
						>
							Solid
						</button>
					</div>
					<input
						type="text"
						placeholder="Search icons..."
						bind:value={iconSearch}
						class="icon-search"
					/>
				</div>
				<div class="icon-grid">
					{#each filteredIcons as icon (icon.name + iconStyle)}
						<div class="icon-card">
							<icon.component size="1.5rem" />
							<span>{icon.name}</span>
						</div>
					{/each}
				</div>
			</section>
		{:else if activeTab === 'Forms'}
			<section>
				<h2>Form</h2>
				<Form inputs={contactInputs} action="?/contact" buttonText="Send Message" />
			</section>

			<section>
				<h2>Searchable Select</h2>
				<div class="searchable-select-demo">
					<SearchableSelect
						options={searchableOptions}
						placeholder="Choose a framework..."
						onSelect={(opt) => (selectedItem = opt.label)}
					/>
					{#if selectedItem}
						<p>Selected: <strong>{selectedItem}</strong></p>
					{/if}
				</div>
			</section>
		{/if}
	</div>
</div>

<Toast />

<style lang="scss">
	.demo {
		max-width: 900px;
		margin: 0 auto;
		padding: calc(var(--spacing-unit) * 6);
	}

	h1 {
		margin-bottom: calc(var(--spacing-unit) * 4);
	}

	h2 {
		margin-bottom: calc(var(--spacing-unit) * 2);
		font-size: var(--text-lg);
	}

	p {
		margin-bottom: calc(var(--spacing-unit) * 2);
		font-size: var(--text-sm);
		color: var(--theme-neutral-500);
	}

	section {
		margin-bottom: calc(var(--spacing-unit) * 6);
	}

	.tabs {
		display: flex;
		gap: calc(var(--spacing-unit) * 0.5);
		border-bottom: 1px solid var(--theme-neutral-300);
		margin-bottom: calc(var(--spacing-unit) * 4);
	}

	.tabs__tab {
		padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
		background: transparent;
		color: var(--theme-neutral-500);
		font-size: var(--text-sm);
		font-weight: 500;
		border: none;
		border-bottom: 2px solid transparent;
		cursor: pointer;
		transition:
			color 0.15s ease,
			border-color 0.15s ease;
		margin-bottom: -1px;

		&:hover {
			color: var(--theme-text);
		}
	}

	.tabs__tab--active {
		color: var(--theme-primary);
		border-bottom-color: var(--theme-primary);
	}

	.icon-controls {
		display: flex;
		align-items: center;
		gap: calc(var(--spacing-unit) * 2);
		margin-bottom: calc(var(--spacing-unit) * 3);
	}

	.icon-style-toggle {
		display: flex;
		gap: calc(var(--spacing-unit) * 0.5);
		border-bottom: 1px solid var(--theme-neutral-300);
	}

	.icon-search {
		flex: 1;
		max-width: 300px;
	}

	.icon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
		gap: calc(var(--spacing-unit) * 2);
	}

	.icon-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: calc(var(--spacing-unit) * 1);
		padding: calc(var(--spacing-unit) * 3) calc(var(--spacing-unit) * 1);
		border: 1px solid var(--theme-neutral-300);
		border-radius: var(--rounded-sm);
		background: var(--theme-neutral-100);

		span {
			font-size: var(--text-xs);
			color: var(--theme-neutral-500);
			text-align: center;
			word-break: break-word;
		}
	}

	.searchable-select-demo {
		max-width: 300px;

		p {
			margin-top: calc(var(--spacing-unit) * 2);
		}
	}
</style>
