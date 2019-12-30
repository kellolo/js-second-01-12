<template>
  <div class="product-item">
    <img src="../assets/product_default.png" alt="Some img">
    <div class="desc">
      <h3>{{ product.product_name }}</h3>
      <p>{{ product.price }} $</p>
      <button class="buy-btn"
              @click="buyButtonHandler(product)"
      >Купить
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CatalogItemComponent",
    props: ['product'],
    methods: {
      buyButtonHandler(product) {
        const cart = this.$root.$children[0].$refs.headercomp.$refs.cart;
        const currentItem = cart.getCurrentCartItem(product);
        currentItem ? cart.updateCartItem(currentItem, currentItem.quantity + 1) : cart.addProductToCart(product);
      },
    },
  }
</script>

<style lang="css" scoped>
  .product-item {
    display: flex;
    flex-direction: column;
    width: 200px;
    border-radius: 5px;
    overflow: hidden;
    margin: 20px 0;
  }

  .desc {
    border: 1px solid #c0c0c040;
    padding: 15px
  }

  .buy-btn {
    margin-top: 5px;
    background-color: #2f2a2d;
    padding: 5px 15px;
    border: 1px solid transparent;
    color: #fafafa;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .buy-btn:hover {
    background-color: #fafafa;
    color: #2f2a2d;
    border: 1px solid #2f2a2d;
  }
</style>