Vue.component('cart', {
  template: `
    <div>
      <button class="btn-cart" type="button" @click="cartVisibility = !cartVisibility">Корзина</button>
      <div class="cart-block" v-show="cartVisibility">
        <template v-if="items.length > 0">
          <cart-item v-for="item of items" :key="item.id_product" :product="item"></cart-item>
        </template>
        <div>Total items: {{ getCountGoods }}</div>
        <div>Amount: {{ getAmount }}</div>
      </div>
    </div>
  `,
  data() {
    return {
      cartVisibility: false,
      getBasketUrl: "https://raw.githubusercontent.com/heatmosk/online-store-api/master/responses/getBasket.json",
      deleteFromBasketUrl: "https://raw.githubusercontent.com/heatmosk/online-store-api/master/responses/deleteFromBasket.json",
      addToBasketUrl: "https://raw.githubusercontent.com/heatmosk/online-store-api/master/responses/addToBasket.json",
      items: [],
    }
  },
  ref: ["cart"],
  refs: ["cart"],
  // props: ['product'],
  methods: {
    deleteFromBasket(prod) {
      fetch(this.deleteFromBasketUrl)
        .then(d => d.json())
        .then(ans => {
          if (ans.result) {
            let find = this.items.find(item => item.id_product === prod.id_product);
            if (find.quantity > 1) {
              find.quantity--;
            } else {
              this.items.splice(this.items.indexOf(find), 1);
            }
          }
        });
    },
    addToBasket(prod) {
      fetch(this.addToBasketUrl)
        .then(d => d.json())
        .then(ans => {
          if (ans.result) {
            let find = this.items.find(item => item.id_product === prod.id_product);
            if (find) {
              find.quantity++;
            } else {
              this.items.push(Object.assign({}, prod, {
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
      for (let item of this.items) {
        amount += item.price * item.quantity;
      }
      return amount;
    },
    getCountGoods() {
      return this.items.length;
    }
  },
  created() {
    fetch(this.getBasketUrl)
      .then(d => d.json())
      .then(data => {
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.items = data.contents;
      });
  }
});