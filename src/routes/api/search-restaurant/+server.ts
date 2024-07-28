import { fetchRestaurantOutletsWorker } from '$workers/searchRestaurantWorker';

/** @type {import('./$types').RequestHandler} */
export const POST = async ({ request }: { request: Request }) => {
	const { address, restaurantName } = await request.json();

	try {
		const outlets = await fetchRestaurantOutletsWorker(address, restaurantName);
		return new Response(JSON.stringify(outlets), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(error.message, { status: 500 });
	}
};
