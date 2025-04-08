<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import Slider from './Slider.svelte';
	import type { CartItem } from '$lib/types';
	import type { Product } from './types';
	import type { Snapshot } from './$types';

	let { data } = $props();
	const product = $derived(data.product);
	const cart = $derived(data.cart);

	// 商品IDごとのカウント値を保持するオブジェクト
	let countMap = $state<Record<string, number>>({});
	// 現在の商品のカウント値（product?.idが変わるとリアクティブに更新される）
	const count = $derived(product?.id ? countMap[product.id] || 1 : 1);

	// カウント値を増減する関数
	function incrementCount() {
		if (product?.id) {
			countMap[product.id] = (countMap[product.id] || 1) + 1;
		}
	}

	function decrementCount() {
		if (product?.id && countMap[product.id] > 1) {
			countMap[product.id] = countMap[product.id] - 1;
		}
	}

	let recommendRequest: Promise<Product[]> = $state(new Promise(() => []));

	afterNavigate(() => {
		recommendRequest = fetch(`/api/recommend?id=${product?.id}`).then((response) =>
			response.json()
		);
	});

	export const snapshot: Snapshot = {
		capture: () => countMap,
		restore: (value) => {
			countMap = value;
		}
	};
</script>

<header class="header">
	<a class="header-title" href="/">Svelte EC</a>
	<nav>
		<ul class="header-links">
			<li>ようこそゲストさん</li>
			<li>
				<a href="/cart"
					>カート ({cart.reduce((acc: number, item: CartItem) => acc + item.count, 0)})</a
				>
			</li>
		</ul>
	</nav>
</header>

{#if product}
	<article class="product">
		<div class="product-main">
			<div class="image-container">
				<Slider images={product.images} />
			</div>
			<div>
				<h2>{product.name}</h2>
				<dl>
					<dt>価格</dt>
					<dd>{product.price}</dd>
				</dl>
				<div>
					<div class="count-container">
						<button onclick={() => decrementCount()}>-</button>
						<p>{count}</p>
						<button onclick={() => incrementCount()}>+</button>
					</div>
					<form method="post">
						<input type="hidden" name="productId" value={product.id} />
						<input type="hidden" name="count" value={count} />
						<button>カートに入れる</button>
					</form>
				</div>
			</div>
		</div>

		<footer>
			<h3>おすすめ商品</h3>
			{#await recommendRequest}
				<p>読み込み中...</p>
			{:then products}
				<ul>
					{#each products as product}
						<li>
							<a href="/products/{product.id}">{product.name}</a>
							- {product.price}円
						</li>
					{/each}
				</ul>
			{/await}
		</footer>
	</article>
{:else}
	<p>商品が見つかりませんでした</p>
{/if}

<style>
	:global(body) {
		margin: 0;
		background-color: #eee;
		padding: 0;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		padding: 0 15px;
		background-color: #fff;
		width: 100%;
		max-width: 800px;
		height: 50px;
	}

	.header-links {
		display: flex;
		gap: 10px;
		margin: 0;
		list-style: none;
		padding: 0;
	}

	.product {
		margin: 0 auto;
		background-color: #fff;
		padding: 15px;
		width: 100%;
		max-width: 800px;
	}

	.product-main {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}

	.image-container {
		width: 200px;
		max-width: 400px;
		overflow: hidden;
	}

	.count-container {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.count-container button {
		width: 20px;
		height: 20px;
		padding: 0;
	}
</style>
