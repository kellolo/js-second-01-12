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
    cartItems: [],
    catItems: [],
    API: API,
  },
  methods: {
    removeProduct(prod) {
      prod.quantity--;
      if (prod.quantity <= 0) {
        this.cartItems = this.cartItems.filter(item => item.id_product !== prod.id_product)
      } 
      this.cartItems.splice(this.cartItems.length);
    },
    addProduct(prod) { 
      let p = this.cartItems.find(item => item.id_product === prod.id_product);
      if (p) {
        p.quantity++;
      } else {
        p = prod;
        p.quantity = 1;
        this.cartItems.splice(this.cartItems.length, 1, p); 
      } 
      this.cartItems.splice(this.cartItems.length);
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
  beforeMounted() {
  },
  mounted() {
    fetch(this.API.getBasket)
      .then(resp => resp.json())
      .then(data => {
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.cartItems = data.contents;
      });
    fetch(this.API.catalogData)
      .then(resp => resp.json())
      .then(data => {
        this.catItems = data;
      });
  }
}); 