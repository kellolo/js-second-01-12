Vue.component('catalog', {
  template: `
    
    <div class="products">
    <p v-show="searchMsgShown" class="search-message">{{searchMsg}}</p>
      <template v-if="content.length > 0">
        <catalog-item v-for="product of content" :key="product.id_product" :item="product" :image="image" @click></catalog-item>
      </template>
      <p v-else class="server-error">Нет ответа от сервера</p>
    </div>
  `,
  props: ['content', 'image'],
  data() {
    return {
      searchMsgShown: false,
      searchMsg: 'Такого товара в нашем каталоге нет :('
    }
  },
  methods: {
    some() {
      console.log(this);
    }
  },



});

Vue.component('catalog-item', {
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
                    @click="addProduct(item)">Купить</button>
          </div>
        </div>
      `,
  props: ['item', 'image'],
  methods: {
    some() {
      console.log(this);
    },
    addProduct(prod) {
      this.$root.getJSON(this.$root.API + '/addToBasket.json')
          .then(d => {
            if (d.result) {
              let productId = +prod['id_product'];
              let find = this.$root.$refs.cart.content.find(element => element.id_product === productId); //товар или false
              if (!find) {
                this.$root.$refs.cart.content.push(Object.assign({}, prod, {quantity: 1}))
              } else {
                find.quantity++
              }
              console.log(`Товар ${prod['product_name']} добавлен в корзину`);
            }
          })
    }

  }
});

Vue.component('cart', {
  template: `
    <div class="cart">
      <search></search>
      <button @click="cartShown = !cartShown" class="btn-cart" type="button">Корзина</button>
      <div v-show="cartShown" class="cart-block">
        <p v-if="cartError">Ошибка получения данных от сервера</p>
        <template v-show="content.length > 0">
          <cart-item v-for="product of content" :key="product.id_product" :item="product" :image="image"></cart-item>
          <div v-show="content.length > 0" class="total-cost">Total cost: {{totalCost()}} RUB</div>
        </template>
      </div>
    </div>
  `,
  props: ['content', 'image', 'cartError'],
  data() {
    return {
      cartShown: false,
      totalCost: () => {
        let res = 0;
        this.content.forEach((item) => {
          res += item.price * item.quantity;
        });
        return res;
      }
    }
  }
});

Vue.component('search', {
  template: `
      <form action="#" class="search-form">
        <input @input="showAll" v-model="searchLine" type="text" class="search-field">
        <button @click="filter" class="btn-search" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>`,
  props: [],
  data() {
    return {
      searchLine: null,
    }
  },
  methods: {
    filter() {
      let arr = document.querySelectorAll('.product-item');
      let hiddenItems = 0;
      arr.forEach((item) => {
        if (!(item.childNodes[2].childNodes[0].innerText.toLocaleLowerCase().includes(this.searchLine.toLocaleLowerCase()))) {
          item.style.display = 'none';
          hiddenItems++;
          if (hiddenItems === arr.length) {
            this.$root.$refs.catalog.searchMsgShown = true;
          }
        } else {
          item.style.display = 'block';
        }
      })
    },

    showAll() {
      let arr = document.querySelectorAll('.product-item');
      arr.forEach((item) => {
        if (!(item.childNodes[2].childNodes[0].innerText === this.searchLine)) {
          item.style.display = 'block';
          this.$root.$refs.catalog.searchMsgShown = false;
        }
      })
    }
  }
});

Vue.component('cart-item', {
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
              <button class="del-btn" :data-id="item.id_product" @click="removeProduct(item)">&times;</button>
            </div>
          </div>
      `,
  props: ['item', 'image'],
  methods: {
    removeProduct(prod) {
      this.$root.getJSON(this.$root.API + '/deleteFromBasket.json')
          .then(d => {
            if (d.result) {
              let productId = +prod['id_product'];
              let find = this.$root.$refs.cart.content.find(element => element.id_product === productId);
              if (find.quantity > 1) {
                find.quantity--;
              } else {
                this.$root.$refs.cart.content.splice(this.$root.$refs.cart.content.indexOf(find), 1);
                document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
              }
              console.log(`Товар id = ${prod['id_product']} удален из корзины`);
            }
          })
    },
  }
});