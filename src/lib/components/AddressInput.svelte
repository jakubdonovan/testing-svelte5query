<script lang="ts">
	import type { DefinedCreateQueryResult, QueryClient } from '@tanstack/svelte-query';

	type Props = {
		client: QueryClient;
		address: string;
		addressSuggestions: DefinedCreateQueryResult<string[]>;
		selectedAddress: string | null;
		onSelectAddress: (
			index: number,
			addressSuggestions: DefinedCreateQueryResult<string[]>,
			address: string,
			selectedAddress: string | null,
			client: QueryClient
		) => string;
		onClearAddress: (client: QueryClient, address: string, selectedAddress: string | null) => void;
	};

	let {
		client,
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
					<button
						onclick={() =>
							onSelectAddress(index, addressSuggestions, address, selectedAddress, client)}
						>{suggestion}</button
					>
				</li>
			{/each}
		</ul>
	{/if}

	{#if selectedAddress}
		<div>
			<p>{selectedAddress}</p>
			<button onclick={() => onClearAddress(client, address, selectedAddress)}>change</button>
		</div>
	{/if}
</div>
