export default {
  template: `
        <div class="cart-item" :data-id="item.id_product">
            <div class="product-bio">
              <img :src="image" alt="Some image">
              <div class="product-desc">
                <p class="product-title">{{item.product_name}}</p>
                <p class="product-quantity">Quantity: {{item.quantity}}</p>
                <p class="product-single-price">RU {{item.price}} each</p>
              </div>
            </div>
            <div class="right-block">
              <p class="product-price">{{item.quantity * item.price}}</p>
              <button class="del-btn" :data-id="item.id_product" @click="$parent.removeProduct(item)">&times;</button>
            </div>
          </div>
      `,
  props: ['item'],

  data() {
    return {
      image: 'https://placehold.it/100x80'
    }
  }
};