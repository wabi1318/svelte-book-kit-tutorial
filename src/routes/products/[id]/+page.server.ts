import { addToCart, loadCart } from '$lib/cart';
import type { Product } from './types';
import { loadProducts } from '$lib/server/product';

export async function load({ params }) {
	const products = await loadProducts<Product>();
	const product = products.find((product: Product) => product.id === params.id);
	const relatedProducts = products.filter((product: Product) => product.id !== params.id);
	const cart = await loadCart();

	return {
		product,
		relatedProducts,
		cart
	};
}

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const productId = data.get('productId');
		const count = data.get('count');
		if (!productId) {
			return { success: false };
		}
		await addToCart(productId.toString(), Number(count));
	}
};
