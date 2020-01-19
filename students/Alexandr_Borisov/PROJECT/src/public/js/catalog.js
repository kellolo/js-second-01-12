import good from "./good";

const catalog = {
  template: `
			<main>
        <div class="products" v-if="!dataLoadingStatus">
          <p>Товары не найдены.</p>
				</div>
        <good :goods="filteredGoods" v-else></good>
      </main>	
	`,
  component: { good },
  data: function() {
    return {
      goodList: [],
      filteredGoods: [],
      dataLoadingStatus: false
    };
  },

  methods: {
    // Запрос списка товаров с сервера
    fetchGoods: function() {
      fetch("/catalog")
        .then(d => {
          return d.json();
        })
        .then(d => {
          this.goodList = d;
          this.filteredGoods = [...this.goodList];
          this.dataLoadingStatus = true;
        });
    }
  }
};

export default catalog;
