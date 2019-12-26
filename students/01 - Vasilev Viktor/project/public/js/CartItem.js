Vue.component ('cart-item', {
	template: `
		<div>
			<div class="product-bio">
        <img :src="cartImage" alt="Some image">
        <div class="product-desc">
          <p class="product-title">{{ item.product_name }}</p>
          <p class="product-quantity">Quantity: {{ item.quantity }}</p>
          <p class="product-single-price">$ {{ item.price }} each</p>
        </div>
      </div>
      <div class="right-block">
        <p class="product-price">$ {{ item.quantity * item.price }}</p>
        <button class="del-btn"
                @click="deleteCartItemButtonHandler(item)"
        >&times;</button>
      </div>
		</div>	
	`,
	props: ['item'],
	data() {
		return {
			cartImage: 'https://placehold.it/100x80',
		};
	},
	methods: {
		deleteCartItemButtonHandler(item) {
			this.$emit('delete', item);
		},
	},
});
