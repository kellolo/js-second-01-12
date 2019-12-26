Vue.component ('catalog', {
    template: `
    <div class="products">                
        <product-item v-for="catItem of catItems" :key="catItem.id_product" :item=catItem :img=catImg></product-item>
    </div>
    `,

    data () {
        return {
            items: [],
            catItems: [],
            //catUrl: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
            catUrl: '/catalog',
            catImg: 'https://placehold.it/200x150',            
        }        
    },

    methods: {
        filter (searchString) {
            let reg = new RegExp (searchString, 'i')
            this.catItems = []
            this.items.forEach(element => {
                if (reg.test (element.product_name)) {
                    this.catItems.push (element)
                }
            })
        }
    },

    mounted () {        
        this.$parent.getJson (this.catUrl)
            .then (data => {
                this.items = data
                this.catItems = data
            })
    },
})