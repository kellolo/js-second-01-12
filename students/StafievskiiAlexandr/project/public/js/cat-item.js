Vue.component('cat-item', {
  template: `
    <div>
      <img :src="product.product_image_big" alt="Some img" />
      <div class="desc">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.price }} $</p>
        <button class="buy-btn" :data-id="product.id_product" :data-name="product.product_name" 
                :data-image-big="product.product_image_big" :data-image-small="product.product_image_small"
                :data-price="product.price" @click="$root.$refs.cart.addToBasket(product)">
          Купить
        </button>
      </div>
    </div>
  `,
  props: ['product'],

});