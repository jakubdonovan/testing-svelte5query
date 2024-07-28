export const RESTAURANT_LIST = ['mcdonalds', 'kfc'] as const;
export type RestaurantListOption = (typeof RESTAURANT_LIST)[number];

export const DEFAULT_RESTAURANT_NAME: RestaurantListOption = 'mcdonalds';
