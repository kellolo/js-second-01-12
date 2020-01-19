const cart = {
  template: `
		<div class="cart-block" v-if="$root.cartShow">
			<div class="cart-item" v-for="goodInCart in cartList">
				<div class="product-bio">
					<img src="https://placehold.it/100x80" alt="Some image" />
					<div class="product-desc">
						<p class="product-title">{{ goodInCart.product_name }}</p>
						<p class="product-quantity">{{ goodInCart.qty }}</p>
						<p class="product-single-price">
							{{ goodInCart.price }}
						</p>
					</div>
				</div>
				<div class="right-block">
					<p class="product-price">
						{{ goodInCart.qty * goodInCart.price }}
					</p>
					<button
						class="del-btn"
						:data-id="goodInCart.id_product"
						@click="delGoodFromCart"
					>
						×
					</button>
				</div>
			</div>
			<p>Полная стоимость: {{ totalPrice }}</p>
		</div>
	`,

  data: function() {
    return {
      cartList: []
    };
  },

  computed: {
    // Расчет полной стоимости товаров в корзине
    totalPrice: function() {
      let total = 0;
      this.cartList.forEach(function(val) {
        total += val.price * val.qty;
      });
      return total;
    }
  },

  methods: {
    // Загрузка товаров в корзине с сервера
    fetchCart: function() {
      fetch("/cart")
        .then(d => {
          return d.json();
        })
        .then(d => {
          this.cartList = [...d];
        });
    },

    // Добавление товара в корзину
    addGoodToCart: function() {
      let goodId = +event.target.dataset.id;
      let goodList = this.$root.$refs.catalog.goodList;
      let good = goodList.find(val => val.id_product === goodId);

      fetch("/addtocart", {
        method: "POST",
        body: JSON.stringify(good),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(d => {
          return d.json();
        })
        .then(d => {
          this.cartList = [...d];
        });
    },

    // Удаление товара из корзины
    delGoodFromCart: function() {
      console.log(+event.target.dataset.id);
      let goodId = +event.target.dataset.id;
      let goodList = this.$root.$refs.catalog.goodList;
      let good = goodList.find(val => val.id_product === goodId);

      fetch("/delfromcart", {
        method: "DELETE",
        body: JSON.stringify(good),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(d => {
          return d.json();
        })
        .then(d => {
          this.cartList = [...d];
        });
    }
  }
};

export default cart;
