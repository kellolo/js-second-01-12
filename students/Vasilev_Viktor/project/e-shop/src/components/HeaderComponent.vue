<template>
  <header>
    <div class="logo">E-shop</div>
    <div class="cart">
      <SearchLineComponent/>

      <button class="btn-cart"
              type="button"
              @click="cartButtonHandler"
      >Корзина
      </button>

      <div class="cart-block"
           v-show="isCartDisplaying"
      >
        <CartComponent ref="cart"/>
      </div>
    </div>
  </header>
</template>

<script>
  import SearchLineComponent from './SearchLineComponent.vue'
  import CartComponent from './CartComponent.vue'

  export default {
    name: "HeaderComponent",
    data() {
      return {
        isCartDisplaying: false,
      };
    },
    methods: {
      cartButtonHandler() {
        this.isCartDisplaying = !this.isCartDisplaying;
      },
    },
    components: {
      SearchLineComponent,
      CartComponent,
    },
  }
</script>

<style lang="css" scoped>
  .logo {
    text-transform: uppercase;
    font-weight: bold;
  }

  .cart {
    position: relative;
  }

  .btn-cart {
    background-color: #fafafa;
    padding: 10px 20px;
    border: 1px solid transparent;
    color: #2f2a2d;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .btn-cart:hover {
    background-color: transparent;
    border-color: #fafafa;
    color: #fafafa;
  }

  .btn-cart, .logo {
    align-self: center;
  }

  .cart-block {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.62);
    border-radius: 5px;
    box-sizing: border-box;
    right: 0;
    top: 130%;
    position: absolute;
    background-color: white;
    padding: 20px;
    color: black;
    width: 300px;
  }

  .cart-block:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: -10px;
    right: 35px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
  }
</style>