Vue.component ('SearchLine', {
	template: `
		<form action="#" class="search-form">
			<input class="search-field"
						 v-model="query"
						 type="text"
			>
			<button class="btn-search"
							type="submit"
							@submit.prevent="filterProducts"
			>
				<i class="fas fa-search"></i>
			</button>
		</form>
	`,
	data() {
		return {
			query: '',
		};
	},
	methods: {
		filterProducts() {
			this.$root.$refs.catalog.filterProducts(this.query);
		}
	},
});
