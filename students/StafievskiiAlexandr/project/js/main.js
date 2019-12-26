"use strict";

let domain = "https://raw.githubusercontent.com/heatmosk/online-store-api/master";

let API = {
  catalogData: `${domain}/responses/catalogData.json`,
  addToBasket: `${domain}/responses/addToBasket.json`,
  getBasket: `${domain}/responses/getBasket.json`,
  getGoodById: `${domain}/responses/getGoodById.json`,
  deleteFromBasket: `${domain}/responses/deleteFromBasket.json`,
};


let vue = new Vue({
  el: "#app",
  data: {
    cartVisibility: false,
    API: API,
    cartItems: [],
    catItems: [],
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(d => d.json())
    },
    removeProduct(prod) {
      this.getJson(this.API.deleteFromBasket)
        .then(ans => {
          if (ans.result) {
            let find = this.cartItems.find(item => item.id_product === prod.id_product);
            if (find.quantity > 1) {
              find.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(find), 1);
            }
          }
        });
    },
    addProduct(prod) {
      this.getJson(this.API.deleteFromBasket)
        .then(ans => {
          if (ans.result) {
            let find = this.cartItems.find(item => item.id_product === prod.id_product);
            if (find) {
              find.quantity++;
            } else { 
              this.cartItems.push(Object.assign({}, prod, {
                quantity: 1
              }));
            }
          }
        });
    }
  },
  computed: {
    getAmount() {
      let amount = 0;
      for (let item of this.cartItems) {
        amount += item.price * item.quantity;
      }
      return amount;
    },
    getCountGoods() {
      return this.cartItems.length;
    }
  },
  created() {
    this.getJson(this.API.catalogData)
      .then(data => {
        this.catItems = data;
      });
    fetch(this.API.getBasket)
      .then(resp => resp.json())
      .then(data => {
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.cartItems = data.contents;
      });

  },
});

Vue.component('catalog', { 
  template: `
    <div class="product-item">
      <img :src="product.product_image_big" alt="Some img" />
      <div class="desc">
        <h3>{{ product.product_name }}</h3>
        <p>{{ product.price }} $</p>
        <button class="buy-btn" :data-id="product.id_product" :data-name="product.product_name" 
                :data-image-big="product.product_image_big" :data-image-small="product.product_image_small"
                :data-price="product.price" @click="catAddProduct(product)">
          Купить
        </button>
      </div>
    </div>
  `,
  props: ['product'],
  methods: {
    catAddProduct(prod) {
      this.$root.addProduct(prod);
    }
  }
});


Vue.component('cart', {
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
        <button class="del-btn" :data-id="product.id_product" @click="cartRemoveProd(product)">
          &times;
        </button>
      </div> 
    </div> 
  `,
  props: ['product'],
  methods: {
    cartRemoveProd(prod) {
      this.$root.removeProduct(prod);
    }
  }
});