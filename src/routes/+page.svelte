<script lang="ts">
	import { fetchRestaurantOutlets } from '$lib/hooks/fetchRestaurantOutlets.svelte';
	// import Address from '$lib/components/Address.svelte';
	// import Star from 'lucide-svelte/icons/star';
	// import Bike from 'lucide-svelte/icons/bike';

	const restaurantList = ['mcdonalds', 'kfc'] as const;
	type restaurantListOption = (typeof restaurantList)[number];

	let address = $state('164 Ludlow St New York, NY, USA');
	let selectedRestaurant: restaurantListOption = $state('mcdonalds');
	let restaurants = fetchRestaurantOutlets(
		() => selectedRestaurant,
		() => address
	);

	$inspect(restaurants);
</script>

<div class="p-4">
	<h2 class="mb-4 text-xl font-medium">What would you like to eat?</h2>
	<div class="flex gap-6">
		{#each restaurantList as restaurant}
			<button
				onclick={() => (selectedRestaurant = restaurant)}
				class="transform rounded-lg p-2 transition-transform hover:scale-105 focus:outline-none"
				class:bg-gray-200={selectedRestaurant !== restaurant}
				class:border-2={selectedRestaurant === restaurant}
				class:border-red-500={selectedRestaurant === restaurant}
				class:border-gray-300={!selectedRestaurant || selectedRestaurant !== restaurant}
			>
				<img src="{restaurant}-logo-900.webp" alt="{restaurant} logo" class="h-16 w-16" />
			</button>
		{/each}
	</div>
</div>

<!-- <Address /> -->

<!-- <button -->
<!-- 	on:click={async () => (restaurants = await fetchRestaurants(selectedAddress, selectedRestaurant))} -->
<!-- 	class="rounded-md bg-green-500 px-2 py-1 text-lg font-medium" -->
<!-- > -->
<!-- 	Find Restaurants -->
<!-- </button> -->
<!---->
<!-- <div> -->
<!-- 	{#each restaurants as restaurant} -->
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
