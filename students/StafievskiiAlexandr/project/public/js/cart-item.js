Vue.component('cart-item', {
  template: `
    <div class="cart-item">
      <div class="product-bio">
        <img :src="product.product_image_small" alt="Some image" />
        <div class="product-desc">
          <p class="product-title">{{ product.product_name }}</p>
          <p class="product-quantity">Quantity: {{ product.quantity }}</p>
          <p class="product-single-price">$ {{ product.price }} each</p>
        </div>
      </div>
      <div class="right-block">
        <p class="product-price">$ {{ product.quantity * product.price }}</p>
        <button class="del-btn" :data-id="product.id_product" @click="$root.$refs.cart.deleteFromBasket(product)">&times;</button>
      </div>
    </div>
  `,
  props: ['product'],

});