import { chromium } from 'playwright';
import type { Restaurant } from '$lib/types';

export async function fetchRestaurantOutletsWorker(address: string, restaurantName: string) {
	if (!address) throw new Error('Address is required.');
	if (!restaurantName) throw new Error('Restaurant name is required.');

	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();
	try {
		await page.goto('https://www.ubereats.com/', { waitUntil: 'domcontentloaded' });
		await page.fill('#location-typeahead-home-input', address);
		await page.waitForSelector('#location-typeahead-home-menu', { state: 'visible' });
		await page.click('#location-typeahead-home-menu li:first-of-type');

		// search restaurant
		await page.fill('#search-suggestions-typeahead-input', restaurantName);
		await page.keyboard.press('Enter');
		await page.waitForSelector('[data-testid="feed-desktop"]');

		const restaurantData = await page.evaluate((restaurantName: string) => {
			const data: Restaurant[] = [];

			const storeCards = Array.from(document.querySelectorAll('.ak.bu')).filter(
				(card) => card.classList.length == 2
			);

			storeCards.forEach((card) => {
				const linkEl = card.querySelector('a');
				const href = linkEl?.getAttribute('href') || '';
				if (!href || !href.toLowerCase().includes(restaurantName.toLowerCase())) return;

				const nameEl = card.querySelector('a > h3');
				const ratingEl = card.querySelector(
					':scope > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)'
				);
				const deliveryTimeEl = card.querySelector(
					':scope > div > div:nth-child(2) > div:nth-child(2)'
				);
				const imgEl = card.querySelector('picture > source');
				const offersEl = card.querySelector(':scope > div > div:nth-child(1)');

				data.push({
					name: nameEl?.textContent ?? '',
					img: imgEl?.getAttribute('srcset') ?? '',
					link: linkEl ? 'https://ubereats.com' + href : '',
					rating: ratingEl?.textContent ?? '',
					deliveryTime: deliveryTimeEl?.textContent ?? '',
					offers: offersEl?.textContent ?? ''
				});
			});

			return data;
		}, restaurantName);
		return restaurantData;
	} catch (error) {
		console.error('Error fetching restaurant outlets:', error);
		throw error;
	} finally {
		await browser.close();
	}
}

self.onmessage = async (event) => {
	const { address, restaurantName } = event.data;
	try {
		const outlets = await fetchRestaurantOutletsWorker(address, restaurantName);
		self.postMessage(outlets);
	} catch (error) {
		self.postMessage({ error: error.message });
	}
};
