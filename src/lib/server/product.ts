import { readFile } from 'fs/promises';
import type { CartItem } from '$lib/types';

export async function loadProducts<T>(): Promise<T[]> {
	const products = await readFile('./data/products.json', 'utf-8');
	return JSON.parse(products);
}

export async function getRecommendations(baseId: string) {
	const products = await loadProducts<CartItem>();
	const candidates = products.filter((product: CartItem) => product.productId !== baseId);
	return randomSelect(candidates, 3);
}

// 配列arrayから1個以上n個以下の要素をランダムに抽出する
function randomSelect<T>(array: Array<T>, n: number): T[] {
	const indicies = Array.from({ length: array.length }, (_, i) => i);
	indicies.sort(() => Math.random() - 0.5);
	const count = Math.floor(Math.random() * n + 1);
	return indicies.slice(0, count).map((index) => array[index]);
}
