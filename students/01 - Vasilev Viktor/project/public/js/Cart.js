Vue.component ('cart', {
	template: `
		<div>
			<cart-item class="cart-item"
								 v-for="item in cartItems" 
								 :key="item.id_product"
								 :item="item"
								 @delete="deleteCartItemButtonHandler"
	    />
		</div>
	`,
	data() {
		return {
			cartItems: [],
		};
	},
	methods: {
		fetchCart() {
			return fetch('/cart')
				.then(response => response.json())
				.then(cartItems => {
					this.cartItems = cartItems;
				});
		},

		addProductToCart(product) {
			fetch('/cart', {
          method: 'POST',
          body: JSON.stringify({...product, quantity: 1}),
          headers: {
            'Content-type': 'application/json',
          },
        })
				.then(response => response.json())
				.then(parsedData => {
					this.cartItems.push({...parsedData, quantity: 1});
				});
		},

		updateCartItem(cartItem, newQty) {
			fetch(`/cart/${cartItem.id_product}`, {
				method: 'PATCH',
				body: JSON.stringify({quantity: newQty}),
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then(response => response.json())
				.then(data => {
					const currentCartItem = this.getCurrentCartItem(data);
					currentCartItem.quantity = data.quantity;
				});
		},

		deleteCartItem(cartItem) {
			fetch(`/cart/${cartItem.id_product}`, {
          method: 'DELETE',
        })
				.then(response => response.json())
        .then(parsedData => {
					if (parsedData.quantity > 1) {
						cartItem.quantity--;
					} else {
						this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
					}
				});
		},

		deleteCartItemButtonHandler(item) {
			let newQty = item.quantity - 1;
			newQty < 1 ? this.deleteCartItem(item) : this.updateCartItem(item, newQty);
		},

		getCurrentCartItem(product) {
			return this.cartItems.find(cartItem => cartItem.id_product === product.id_product);
		},
	},
	mounted() {
		this.fetchCart();
	}
});
