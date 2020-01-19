const search = {
  template: `
		<form action="#" class="search-form">
			<input
				type="text"
				class="search-field"
				v-model="searchLine"
				@input="setFilterGoods"
			/>
			<button class="btn-search" type="submit" @click="setFilterGoods">
				Q
			</button>
		</form>`,

  data: function() {
    return {
      searchLine: ""
    };
  },

  methods: {
    // Фильтрация товаров в катлоге
    setFilterGoods: function() {
      let reg = new RegExp(this.searchLine, "gi");

      let arr = this.$root.$refs.catalog.goodList.filter(function(
        val,
        index,
        arr
      ) {
        return reg.test(arr[index].product_name);
      });

      this.$root.$refs.catalog.filteredGoods = [...arr];
    }
  }
};

export default search;
