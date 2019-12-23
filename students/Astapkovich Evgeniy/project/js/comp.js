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
    }
  },

  methods: {
    addProduct(product) {
      this.$root.getJSON(this.$root.addURL)
        .then(ans => {
          if (ans.result === 1) {
            let find = this.$root.cartItems.find(item => item.id_product === product.id_product)

            if (find) {
              find.quantity++
            } else {
              this.$root.cartItems.push(Object.assign({}, product, { quantity: 1 }))
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
      }
    },

    props: ['item'],

    methods: {
      delProduct (product) {
        this.$root.getJSON (this.$root.delURL)
              .then( ans => {
                if (ans.result) {
                  let find = this.$root.cartItems.find (item => item.id_product === product.id_product)
  
                  if (find.quantity > 1) {
                    find.quantity--
                  } else {
                    this.$root.cartItems.splice (this.$root.cartItems.indexOf(find), 1)
                  }
                }
              })
      }
    }
})