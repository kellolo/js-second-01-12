Vue.component("search", {
  template: `
 									<form action="#" class="search-form">
										<input
											type="text"
											class="search-field"
											v-model="globaldata.searchLine"
											@input="setFilterGoods"
										/>
										<button class="btn-search" type="submit" @click="setFilterGoods">
											Q
										</button>
									</form>`,

  props: ["globaldata"],
  computed: {
    totalPrice: function() {
      let total = 0;
      this.globaldata.cartList.forEach(function(val) {
        total += val.price * val.qty;
      });
      return total;
    }
  },
  methods: {
    setFilterGoods: function() {
      let reg = new RegExp(this.globaldata.searchLine, "gi");

      let arr = this.globaldata.goodList.filter(function(val, index, arr) {
        return reg.test(arr[index].product_name);
      });

      this.globaldata.filteredGoods = [...arr];
    }
  }
});
