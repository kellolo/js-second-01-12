<template>
  <div>
    <div class="product-bio">
      <img src="../assets/cart_item_default.png" alt="Some image">
      <div class="product-desc">
        <p class="product-title">{{ item.product_name }}</p>
        <p class="product-quantity">Quantity: {{ item.quantity }}</p>
        <p class="product-single-price">$ {{ item.price }} each</p>
      </div>
    </div>
    <div class="right-block">
      <p class="product-price">$ {{ item.quantity * item.price }}</p>
      <button class="del-btn"
              @click="deleteCartItemButtonHandler(item)"
      >&times;
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CartItemComponent",
    props: ['item'],
    methods: {
      deleteCartItemButtonHandler(item) {
        this.$emit('delete', item);
      },
    },
  }
</script>

<style lang="css" scoped>
  .product-bio {
    display: flex;
  }

  .product-desc {
    max-width: 150px;
    margin-left: 10px;
  }

  .product-quantity {
    margin-top: 15px;
    font-size: 0.75em;
  }

  .product-single-price {
    color: #474747;
    font-size: 0.5em;
  }

  .right-block {
    text-align: right;
  }

  .product-price {
    margin-left: 30px;
  }

  .del-btn {
    margin-top: 5px;
    background-color: #2f2a2d;
    padding: 5px 15px;
    border: 1px solid transparent;
    color: #fafafa;
    border-radius: 5px;
    transition: all ease-in-out .4s;
    cursor: pointer;
  }

  .del-btn:hover {
    background-color: #fafafa;
    color: #2f2a2d;
    border: 1px solid #2f2a2d;
  }
</style>