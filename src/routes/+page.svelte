<script lang="ts">
	import { fetchAddressSuggestions } from '$lib/hooks/fetchAddressSuggestions.svelte';
	// import { fetchRestaurantOutlets } from '$lib/hooks/fetchRestaurantOutlets.svelte';
	import {
		useQueryClient,
		type DefinedCreateQueryResult,
		type QueryClient
	} from '@tanstack/svelte-query';
	// import {
	// 	RESTAURANT_LIST,
	// 	DEFAULT_RESTAURANT_NAME,
	// 	type RestaurantListOption
	// } from '$lib/constants';
	// import Star from 'lucide-svelte/icons/star';
	// import Bike from 'lucide-svelte/icons/bike';
	import AddressInput from '$lib/components/AddressInput.svelte';

	const client = useQueryClient();

	// ADDRESS
	let address = $state('');
	let selectedAddress = $state<string | null>(null);
	let addressSuggestions = fetchAddressSuggestions(() => address);

	const handleSelectAddress = (
		index: number,
		addressSuggestions: DefinedCreateQueryResult<string[], Error>,
		address: string,
		selectedAddress: string | null,
		client: QueryClient
	): string => {
		console.log('triggered handleSelectAddress');
		address = '';
		selectedAddress = addressSuggestions.data[index];
		client.invalidateQueries({ queryKey: ['addressSuggestions'] });

		return selectedAddress;
	};

	const handleClearAddress = (
		client: QueryClient,
		address: string,
		selectedAddress: string | null
	) => {
		console.log('triggered handleClearAddress');
		address = '';
		selectedAddress = null;
		client.invalidateQueries({ queryKey: ['addressSuggestions'] });

		return selectedAddress;
	};

	$inspect(address, selectedAddress);

	// let selectedRestaurant: RestaurantListOption = $state(DEFAULT_RESTAURANT_NAME);
	// let restaurantOutlets = fetchRestaurantOutlets(
	// 	() => selectedRestaurant,
	// 	() => selectedAddress ?? ''
	// );
</script>

<AddressInput
	{client}
	bind:address
	bind:selectedAddress
	bind:addressSuggestions
	onSelectAddress={handleSelectAddress}
	onClearAddress={handleClearAddress}
/>

<!-- <div class="space-y-8 p-4"> -->
<!-- <div class=""> -->
<!-- 	<h2 class="mb-4 text-xl font-medium">What would you like to eat?</h2> -->
<!-- 	<div class="flex gap-6"> -->
<!-- 		{#each RESTAURANT_LIST as restaurant} -->
<!-- 			<button -->
<!-- 				onclick={() => (selectedRestaurant = restaurant)} -->
<!-- 				class="transform rounded-lg p-2 transition-transform hover:scale-105 focus:outline-none" -->
<!-- 				class:bg-gray-200={selectedRestaurant !== restaurant} -->
<!-- 				class:border-2={selectedRestaurant === restaurant} -->
<!-- 				class:border-red-500={selectedRestaurant === restaurant} -->
<!-- 				class:border-gray-300={!selectedRestaurant || selectedRestaurant !== restaurant} -->
<!-- 			> -->
<!-- 				<img src="{restaurant}-logo-900.webp" alt="{restaurant} logo" class="h-16 w-16" /> -->
<!-- 			</button> -->
<!-- 		{/each} -->
<!-- 	</div> -->
<!-- </div> -->

<!-- <button -->
<!-- 	onclick={() => restaurantOutlets.refetch()} -->
<!-- 	disabled={!selectedRestaurant || !selectedAddress} -->
<!-- 	class="rounded-md bg-green-500 px-2 py-1 text-lg font-medium" -->
<!-- > -->
<!-- 	Find Restaurants -->
<!-- </button> -->

<!-- <div class=""> -->
<!-- 	{#each restaurantOutlets.data as restaurant} -->
<!-- 		<div class="flex gap-2 p-4"> -->
<!-- 			<div -->
<!-- 				class="h-16 w-16 overflow-hidden rounded-full bg-cover bg-center" -->
<!-- 				style="background-image: url({restaurant.img})" -->
<!-- 			></div> -->
<!-- 			<div class="flex flex-col justify-center"> -->
<!-- 				<p class="text-base font-medium">{restaurant.name}</p> -->
<!-- 				<div class="flex gap-4 text-sm"> -->
<!-- 					<span class="flex items-center"> -->
<!-- 						<Star class="h-4" /> -->
<!-- 						{restaurant.rating}/5 -->
<!-- 					</span> -->
<!-- 					<span class="flex items-center"> -->
<!-- 						<Bike class="h-4" /> -->
<!-- 						{restaurant.deliveryTime} -->
<!-- 					</span> -->
<!-- 				</div> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	{/each} -->
<!-- </div> -->
<!-- </div> -->
