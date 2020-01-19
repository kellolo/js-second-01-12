import cart from "./cart";
import catalog from "./catalog";
import search from "./search";

const app = {
  el: "#app",
  components: {
    cart,
    catalog,
    search
  },
  data: {
    cartShow: false
  },

  mounted() {
    this.$refs.catalog.fetchGoods();
    this.$refs.cart.fetchCart();
  }
};

export default app;
