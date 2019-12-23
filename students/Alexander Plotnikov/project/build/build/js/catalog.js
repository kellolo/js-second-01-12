Vue.component('catalog', {
    template: ` 
    <div class="productsPage" id="bodyShop">

    <product v-for="item in catalogItems" v-bind:key="item.id" v-bind:item="item"> </product>

    </div>
    `,
    data() {
        return {
            CatURL: '/catalogData.json',
            catalogItems: []
        }
    },
    methods: {

    },
    mounted() {
        this.$root.getData(this.CatURL)
            .then(data => {
                this.catalogItems = data
            })
    }
})