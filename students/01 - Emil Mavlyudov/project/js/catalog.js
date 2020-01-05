Vue.component ('catalog', {
    template: `
    <div class="products">
        <itemcat v-for="prod of filtered" :key="prod.id_product" :item="prod"></itemcat>
    </div>
    `,
    data () {
        return {
            url: 'https://raw.githubusercontent.com/lindoro7/js-second-01-12/master/students/01%20-%20Emil%20Mavlyudov/responses/catalogData.json',
            items: [],
            filtered: [],
        }
    },
    methods: {
        filter (searchString) {
            let reg = new RegExp (searchString, 'i')
            // this.filtered = this.items.filter (item => reg.test(item.product_name))
            this.filtered = []
            this.items.forEach(element => {
                if (reg.test (element.product_name)) {
                    this.filtered.push (element)
                }
            })
        }
    },
    mounted () {
        this.$parent.getJson (this.url)
            .then (data => {
                this.items = data
                this.filtered = data
            })
    }
})