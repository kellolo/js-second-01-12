Vue.component('catalog', {
    template: ` 
    <div class="productsPage" id="bodyShop">

    <product v-for="item in catalogItems" v-bind:key="item.id" v-bind:item="item"> </product>

    </div>
    `,
    data() {
        return {
            API: 'https://raw.githubusercontent.com/lotostoi/js-second-01-12/master/students/Alexander%20Plotnikov/project/responses/',
            CatURL: 'catalogData.json',
            catalogItems: []
        }
    },
    methods: {

    },
    mounted() {
        this.$root.getData(`${this.API}${this.CatURL}`)
            .then(data => {
                this.catalogItems = data
            })
    }
})