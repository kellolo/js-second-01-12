Vue.component("cart", {
  template: `
					<div class="cart-block" v-if="this.globaldata.cartShow">
            <div class="cart-item" v-for="goodInCart in this.globaldata.cartList">
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
									@click="$root.delGoodFromCart"
                >
                  ×
                </button>
              </div>
            </div>
            <p>Полная стоимость: {{ totalPrice }}</p>
					</div>
	`,
  props: ["globaldata"],
  computed: {
    totalPrice: function() {
      let total = 0;
      this.globaldata.cartList.forEach(function(val) {
        total += val.price * val.qty;
      });
      return total;
    }
  }
});
