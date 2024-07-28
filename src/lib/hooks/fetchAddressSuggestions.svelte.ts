import { createQuery } from '@tanstack/svelte-query';

export const fetchAddressSuggestions = (address: () => string) => {
	return createQuery<string[]>(() => ({
		queryKey: ['addressSuggestions', address()],
		queryFn: async () => {
			const res = await fetch(`/api/search-address?address=${address()}`);
			if (!res.ok) throw new Error('Failed to fetch address suggestions');

			return await res.json();
		},
		enabled: !!address(),
		initialData: []
	}));
};
