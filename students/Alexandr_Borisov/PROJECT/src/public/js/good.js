const good = {
  template: `
		<div class="products">
			<div
				class="product-item"
				:data-id="good.id_product"
				v-for="good in goods"
			>
				<img src="https://placehold.it/200x150" alt="Some img" />
				<div class="desc">
					<h3>{{ good.product_name }}</h3>
					<p>{{ good.price }} $</p>
					<button
						class="buy-btn"
						:data-id="good.id_product"
						@click.stop="$root.$refs.cart.addGoodToCart"
					>
						Купить
					</button>
				</div>
			</div>
		</div>
	`,

  props: ["goods"]
};

export default good;
