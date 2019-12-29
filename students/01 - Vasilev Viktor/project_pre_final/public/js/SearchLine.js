Vue.component ('search-line', {
	template: `
		<form action="#" class="search-form" @submit.prevent="filterProducts">
			<input class="search-field"
						 type="text"
						 v-model="query"
			>
			<button class="btn-search" type="submit">
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
		},
	},
});
