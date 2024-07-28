// import { chromium } from 'playwright';

export async function fetchAddressSuggestionsWorker(address: string) {
	if (!address) throw new Error('Address is required.');

	// const browser = await chromium.launch({ headless: true });
	// const page = await browser.newPage();

	try {
		// await page.goto('https://www.ubereats.com/', { waitUntil: 'domcontentloaded' });
		// await page.fill('#location-typeahead-home-input', address);
		// await page.waitForSelector('#location-typeahead-home-menu', { state: 'visible' });
		// const suggestions = await page.evaluate(() => {
		// 	return Array.from(document.querySelectorAll('#location-typeahead-home-menu li')).map(
		// 		(item) => (item as HTMLElement).innerText
		// 	);
		// });

		const suggestions = new Promise((resolve) => {
			setTimeout(() => {
				resolve(['1', '2', '3']);
			}, 5000);
		});

		return suggestions;
	} catch (error) {
		console.error('Error fetching address suggestions:', error);
		throw error;
	} finally {
		// await browser.close();
	}
}

self.onmessage = async (event) => {
	const { address } = event.data;
	try {
		const suggestions = await fetchAddressSuggestionsWorker(address);
		self.postMessage(suggestions);
	} catch (error) {
		self.postMessage({ error: error.message });
	}
};
