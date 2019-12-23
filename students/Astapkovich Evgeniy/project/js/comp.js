Vue.component('catalog-item', {
  template: `
        <div class="product-item">
            <img :src="catalogImage" alt="Image">
            <div class="desc">
                <h3>{{ item.product_name }}</h3>
                <p>{{ item.price }} $</p>
                <button class="buy-btn" @click="addProduct(item)">Купить</button>
            </div>
        </div>
    `,

  props: ['item'],

  data() {
    return {
      catalogImage: 'https://placehold.it/200x150',
      addURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json'
    }
  },

  methods: {
    addProduct(product) {
      this.getJSON(this.addURL)
        .then(ans => {
          if (ans.result === 1) {
            let find = this.cartItems.find(item => item.id_product === product.id_product)

            if (find) {
              find.quantity++
            } else {
              this.cartItems.push(Object.assign({}, product, { quantity: 1 }))
            }
          }
        })
    }
  }
})

Vue.component('cart-item', {
  template: `
    <div class="cart-item">
      <div class="product-bio">
        <img :src="cartImage" alt="Some image">
        <div class="product-desc">
          <p class="product-title">{{ item.product_name }}</p>
          <p class="product-quantity">Quantity: {{ item.quantity }}</p>
          <p class="product-single-price">$ {{ item.price }} each</p>
        </div>
      </div>
        <div class="right-block">
          <p class="product-price">{{ item.quantity * item.price }}</p>
          <button class="del-btn" @click="delProduct(item)">&times;</button>
        </div>
    </div>
    `,

    data() {
      return {
        cartImage: 'https://placehold.it/100x80',
        delURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
      }
    },

    props: ['item']
})