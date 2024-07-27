<script lang="ts">
	import { fetchAddressSuggestions } from '$lib/hooks/fetchAddressSuggestions.svelte';
	// 164 Ludlow St New York, NY, USA
	let address = $state('');
	let selectedAddress = $state<string | null>(null);

	let addressSuggestions = fetchAddressSuggestions(() => address);

	async function selectAddress(index: number) {
		if (!addressSuggestions.data) return;
		selectedAddress = addressSuggestions.data[index];

		return selectedAddress;
	}

	$inspect({
		address,
		isFetching: addressSuggestions.isFetching,
		data: addressSuggestions.data
	});
</script>

<div>
	<h2 class="text-xl font-medium">Enter your delivery address</h2>
	{#if !selectedAddress}
		<input type="text" bind:value={address} placeholder="Enter delivery address" />
	{/if}
	{#if addressSuggestions.isFetching || addressSuggestions.isPending}
		Loading...
	{/if}
	{#if addressSuggestions.error}
		An error has occurred: {addressSuggestions.error.message}
	{/if}
	{#if !selectedAddress && addressSuggestions.isSuccess && addressSuggestions.data.length}
		<ul>
			{#each addressSuggestions.data as suggestion, index}
				<li><button onclick={() => selectAddress(index)}>{suggestion}</button></li>
			{/each}
		</ul>
	{/if}

	{#if selectedAddress}
		<div>
			<p>{selectedAddress}</p>
			<button onclick={() => (selectedAddress = null)}>change</button>
		</div>
	{/if}
</div>
