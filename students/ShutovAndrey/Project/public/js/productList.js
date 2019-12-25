Vue.component("products", {
    template: `
             <div class="products">
                <itemcat v-for="prod of filtered" :key="prod.id_product" :item="prod"></itemcat>
             </div>

    `,
    data() {
        return {
                url: '/catalog',
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
        },
        addProduct(pr) {
            //         let find = this.$root.cartItems.find(item => item.id_product === pr.id_product);
            //         if (find) {
                                    //             find.quantity++
                                    //         } else {
                                    //             // console.log('smth')
                                    //             this.$root.cartItems.push(Object.assign({}, pr, {quantity: 1}))
                                    //         }
            
            
            
            
            
            
            
            
            
       //     this.$root.postJson(this.addUrl, pr)
                                    // .then(ans => {
                                    //     if (ans.result) {
                                    //         let find = this.$root.cartItems.find(item => item.id_product === pr.id_product)
                                    //
                                    //         if (find) {
                                    //             find.quantity++
                                    //         } else {
                                    //             // console.log('smth')
                                    //             this.$root.cartItems.push(Object.assign({}, pr, {quantity: 1}))
                                    //         }
                                    //     }
                                    // })
        }

    },
    
    mounted(){
      this.$parent.getJson (this.url)
            .then (data => {
                this.items = data
                this.filtered = data
            })
    }

})
