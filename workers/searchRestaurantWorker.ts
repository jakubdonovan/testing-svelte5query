import { chromium } from 'playwright';

export async function fetchRestaurantOutletsWorker(address: string, restaurantName: string) {
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
			const data: {
				name: string;
				link: string;
				img: string;
				rating: string;
				deliveryTime: string;
				offers: string;
			}[] = [];

			const storeCards = Array.from(document.querySelectorAll('.ak.bu')).filter(
				(card) => card.classList.length == 2
			);

			storeCards.forEach((card) => {
				const content = card.textContent;

				const linkEl = card.querySelector('a');
				const href = linkEl?.getAttribute('href');
				if (!href || !href.toLowerCase().includes(restaurantName.toLowerCase())) return;

				const nameEl = card.querySelector('a > h3');
				const ratingEl = card.querySelector(
					':scope > div > div:nth-child(2) > div:nth-child(1) > div:nth-child(3)'
				);
				const deliveryTimeEl = card.querySelector(
					':scope > div > div:nth-child(2) > div:nth-child(2)'
				);

				const offers = card.querySelector(':scope > div > div:nth-child(1)').textContent;
				const img = card.querySelector('picture > source').getAttribute('srcset');

				data.push({
					name: nameEl ? nameEl.textContent : '',
					img,
					link: linkEl ? 'https://ubereats.com' + href : '',
					rating: ratingEl ? ratingEl?.textContent : '',
					deliveryTime: deliveryTimeEl ? deliveryTimeEl?.textContent : '',
					offers
				});
			});

			return data;
		}, restaurantName);
		return restaurantData;
	} catch (error) {
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
