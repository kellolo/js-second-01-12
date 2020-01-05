<template>
  <div>
    <CartItemComponent class="cart-item"
                       v-for="item in cartItems"
                       :key="item.id_product"
                       :item="item"
                       @delete="deleteCartItemButtonHandler"
    />
  </div>
</template>

<script>
  import CartItemComponent from './CartItemComponent.vue'

  export default {
    name: "CartComponent",
    data() {
      return {
        cartItems: [],
      };
    },
    methods: {
      fetchCart() {
        return fetch('/api/cart')
          .then(response => response.json())
          .then(cartItems => {
            this.cartItems = cartItems;
          });
      },

      addProductToCart(product) {
        fetch('/api/cart', {
          method: 'POST',
          body: JSON.stringify({...product, quantity: 1}),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(parsedData => {
            this.cartItems.push({...parsedData, quantity: 1});
          });
      },

      updateCartItem(cartItem, newQty) {
        fetch(`/api/cart/${cartItem.id_product}`, {
          method: 'PATCH',
          body: JSON.stringify({quantity: newQty}),
          headers: {
            'Content-type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(data => {
            const currentCartItem = this.getCurrentCartItem(data);
            currentCartItem.quantity = data.quantity;
          });
      },

      deleteCartItem(cartItem) {
        fetch(`/api/cart/${cartItem.id_product}`, {
          method: 'DELETE',
        })
          .then(response => response.json())
          .then(parsedData => {
            if (parsedData.quantity > 1) {
              cartItem.quantity--;
            } else {
              this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
            }
          });
      },

      deleteCartItemButtonHandler(item) {
        let newQty = item.quantity - 1;
        newQty < 1 ? this.deleteCartItem(item) : this.updateCartItem(item, newQty);
      },

      getCurrentCartItem(product) {
        return this.cartItems.find(cartItem => cartItem.id_product === product.id_product);
      },
    },
    mounted() {
      this.fetchCart();
    },
    components: {
      CartItemComponent,
    },
  }
</script>

<style lang="css" scoped>
  .cart-item {
    display: flex;
    justify-content: space-between;
  }

  .cart-item:not(:last-child) {
    margin-bottom: 20px;
  }

  .cart-item img {
    align-self: flex-start;
    margin-right: 15px;
  }
</style>