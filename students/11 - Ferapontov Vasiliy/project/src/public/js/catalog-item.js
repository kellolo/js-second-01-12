export default {
  template: `
        <div class="product-item" :data-id="item.id_product">
          <img :src="image" alt="Some img">
          <div class="desc">
            <h3>{{item.product_name}}</h3>
            <p>{{item.price}} RUB</p>
            <button class="buy-btn"
                    :data-id="item.id_product"
                    :data-name="item.product_name"
                    :data-image="image"
                    :data-price="item.price"
                    @click="$root.$refs.cart.addProduct(item)">Купить</button>
          </div>
        </div>
      `,
  props: ['item'],

  data() {
    return {
      image: 'https://placehold.it/200x150'
    }
  }
};