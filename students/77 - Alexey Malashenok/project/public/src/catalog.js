'use strict';

Vue.component('catalog', {
    template: `
        <div class="products" id="products">
            <catalog-item v-for="item of filtered" :key="item.id_product" :product="item"></catalog-item>
        </div>
        `,

    data: function () {
        return {           
            catUrl: '/catalog',
            catItems: [],
            filtered: []
        }
    },

    methods: {
        filter(searchString) {
            let reg = new RegExp(searchString, 'i');
            this.filtered = this.catItems.filter(item => reg.test(item.product_name));
        }
    },

    mounted() {
        this.$parent.getRequest(this.catUrl)
            .then(d => d.json())
            .then(data => {
                this.catItems = data;
                this.filtered = data;
            }
            )
    }

})