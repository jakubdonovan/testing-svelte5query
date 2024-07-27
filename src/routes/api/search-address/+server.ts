import { fetchAddressSuggestionsWorker } from '$workers/searchAddressSuggestionsWorker';

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }: { url: URL }) => {
	const address = url.searchParams.get('address');
	if (!address) return new Response('Address is required', { status: 400 });

	try {
		const suggestions = await fetchAddressSuggestionsWorker(address);
		return new Response(JSON.stringify(suggestions), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(error.message, { status: 500 });
	}
};
