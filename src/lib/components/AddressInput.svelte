<script lang="ts">
	import type { DefinedCreateQueryResult } from '@tanstack/svelte-query';

	type Props = {
		address: string;
		addressSuggestions: DefinedCreateQueryResult<string[], Error>;
		selectedAddress: string | null;
		onSelectAddress: (index: number) => string;
		onClearAddress: () => void;
	};

	let {
		address = $bindable(),
		addressSuggestions = $bindable(),
		selectedAddress = $bindable(),
		onSelectAddress,
		onClearAddress
	}: Props = $props();
</script>

<div class="">
	<h2 class="mb-4 text-xl font-medium">Enter your delivery address</h2>
	{#if !selectedAddress}
		<input type="text" bind:value={address} placeholder="Enter delivery address" />
	{/if}
	{#if addressSuggestions.isFetching}
		Loading...
	{/if}
	{#if addressSuggestions.error}
		An error has occurred: {addressSuggestions.error.message}
	{/if}
	{#if !selectedAddress && addressSuggestions.isSuccess && addressSuggestions.data.length}
		<ul class="text-gray-500">
			{#each addressSuggestions.data as suggestion, index}
				<li>
					<button onclick={() => onSelectAddress(index)}>{suggestion}</button>
				</li>
			{/each}
		</ul>
	{/if}

	{#if selectedAddress}
		<div>
			<p>{selectedAddress}</p>
			<button onclick={onClearAddress}>change</button>
		</div>
	{/if}
</div>
