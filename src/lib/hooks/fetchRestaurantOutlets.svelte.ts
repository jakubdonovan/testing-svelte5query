import { createQuery } from '@tanstack/svelte-query';
import type { Restaurant } from '$lib/types';

export const fetchRestaurantOutlets = (restaurantName: () => string, address: () => string) => {
	return createQuery<Restaurant[]>(() => ({
		queryKey: ['fetchRestaurantOutlets', restaurantName(), address()],
		queryFn: async () => {
			const res = await fetch(`/api/search-restaurant`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ address: address(), restaurantName: restaurantName() })
			});
			if (!res.ok) throw new Error('Failed to fetch restaurants');

			return await res.json();
		},
		enabled: false,
		initialData: []
	}));
};
