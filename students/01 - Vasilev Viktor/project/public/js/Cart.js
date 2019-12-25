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
					this.cartItems = cartItems.contents;
				});
		},

		addProductToCart(product) {
			fetch('/cart')
				.then(response => response.json())
				.then(data => {
          if (data.result) {
						this.cartItems.push({...product, quantity: 1});
					}
				});
		},

		updateCartItem(cartItem) {
        fetch(`/cart/${cartItem.id_product}`, {
          method: 'PATCH',
          body: JSON.stringify({qty: cartItem.quantity++}),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(response => response.json())
					.then(data => {
						if (data.result) {
							cartItem.quantity++;
						}
          });
      },

		deleteCartItem(cartItem) {
			fetch(`/cart/${cartItem.id_product}`, {
          method: 'DELETE',
        })
				.then(response => response.json())
        .then(data => {
					if (data.result) {
						if (cartItem.quantity > 1) {
							cartItem.quantity--;
						} else {
							this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
						}
					}
				});
		},

		deleteCartItemButtonHandler(item) {
			this.deleteCartItem(item);
		},

		getCurrentCartItem(product) {
			return this.cartItems.find(cartItem => cartItem.id_product === product.id_product);
		},
	},
	mounted() {
		this.fetchCart();
	}
});
