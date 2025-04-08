import { readFile, writeFile } from 'fs/promises';
import type { CartItem } from './types';

const dataPath = 'data/cart.json';

export async function addToCart(productId: string, count: number) {
	let cart: CartItem[] = await loadCart();
	if (cart.some((item: CartItem) => item.productId === productId)) {
		cart = cart.map((item: CartItem) =>
			item.productId === productId ? { ...item, count: item.count + count } : item
		);
	} else {
		cart.push({ productId, count });
	}
	await writeFile(dataPath, JSON.stringify(cart, null, 2));
}

export async function loadCart() {
	try {
		const content = await readFile(dataPath, 'utf-8');
		return JSON.parse(content);
	} catch (error) {
		if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
			return [];
		}
		throw error;
	}
}
