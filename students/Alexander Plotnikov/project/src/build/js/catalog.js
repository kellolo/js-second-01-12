import item from './product'

let catalog = {
    components: {
        item
    },
    template: ` 
    <div class="productsPage" id="bodyShop">
    <item v-for="item in catalogItems" v-bind:key="item.id" v-bind:item="item"></item>
    </div>
    `,
    data() {
        return {
            CatURL: '/catalogData.json',
            catalogItems: []
        }
    },
    mounted() {
        this.$root.getData(this.CatURL)
            .then(data => {
                this.catalogItems = data
            })
    }
}
export default catalog