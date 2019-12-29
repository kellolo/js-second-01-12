import item from './cart-item'
import search from './search-comp'

let cart = {
  components: { item, search },
  template: `
    <div class="cart">
      <search></search>
      <button @click="cartShown = !cartShown" class="btn-cart" type="button">Корзина</button>
      <div v-show="cartShown" class="cart-block">
        <p v-if="cartErr">Ошибка получения данных от сервера</p>
        <template v-show="items.length > 0">
          <item v-for="product of items" :key="product.id_product" :item="product"></item>
          <div v-show="items.length > 0" class="total-cost">Total cost: {{ getSum.sum }} RUB</div>
        </template>
      </div>
    </div>
  `,

  data() {
    return {
      url: '/cart',
      delUrl: 'https://raw.githubusercontent.com/pwnyaka/Professional-layout/master/deleteFromBasket.json',
      addUrl: 'https://raw.githubusercontent.com/pwnyaka/Professional-layout/master/addToBasket.json',
      cartErr: false,
      cartShown: false,
      items: [],
    }
  },
  methods: {
    postData(url = '', data = {}) {
      return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      })
    },
    putData(url = '', data = {}) {
      return fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      })
    },
    deleteData(url = '', data = {}) {
      return fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
      })
    },
    removeProduct(prod) {
      this.$root.getJSON(this.delUrl)
          .then(d => {
            if (d.result) {
              let productId = +prod['id_product'];
              let find = this.items.find(element => element.id_product === productId);
              if (find.quantity > 1) {
                find.quantity--;
                this.putData('/putData', {"amount": this.getSum.sum,
                  "countGoods": this.getSum.qua,
                  "contents": this.items})
              } else {
                this.items.splice(this.items.indexOf(prod), 1);
                // document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                this.deleteData('/deleteData', {"amount": this.getSum.sum,
                  "countGoods": this.getSum.qua,
                  "contents": this.items})
              }
              console.log(`Товар id = ${prod['id_product']} удален из корзины`);
            }
          })
    },
    addProduct(prod) {
      this.$root.getJSON(this.addUrl)
          .then((d) => {
            if (d.result) {
              let productId = +prod['id_product'];
              let find = this.items.find(element => element.id_product === productId); //товар или false
              if (!find) {
                this.items.push(Object.assign({}, prod, {quantity: 1}));
                this.postData('/postData', {"amount": this.getSum.sum,
                  "countGoods": this.getSum.qua,
                  "contents": this.items})
              } else {
                find.quantity++;
                this.putData('/putData', {"amount": this.getSum.sum,
                  "countGoods": this.getSum.qua,
                  "contents": this.items})
              }
              console.log(`Товар ${prod['product_name']} добавлен в корзину`);
            } else {
              console.log('error');
            }
          })
    }
  },
  mounted() {
    this.$root.getJSON(this.url)
        .then(data => {
          this.items = data.contents;
        })
        .catch(() => {
          this.cartErr = true;
        });
  },
  computed: {
    getSum() {
      let sum = 0;
      let qua = 0;
      this.items.forEach(el => {
        sum += el.price * el.quantity;
        qua += el.quantity;
      });
      return {sum, qua}
    }
  }
};

export default cart;