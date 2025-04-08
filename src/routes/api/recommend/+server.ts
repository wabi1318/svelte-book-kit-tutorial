import { getRecommendations } from '$lib/server/product';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	const productId = url.searchParams.get('id');
	if (productId) {
		const recommendations = await getRecommendations(productId);
		return json(recommendations);
	}
}
