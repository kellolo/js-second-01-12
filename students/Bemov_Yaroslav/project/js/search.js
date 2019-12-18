const app = new Vue({
    el: '#app',
    data: {
        // msg: 'Hello, Vue!',
        search: '',
        isVisibleCart: false,
        placeHolder: "",
    },
    methods: {
        searchResult() {
            let list = document.querySelectorAll('div.product-item.invisible');

            list.forEach(item => {
                item.classList.remove('invisible');
            })

            catalog.items.forEach(item => {
                if (item.product_name.indexOf(this.search) === -1) {
                    document.querySelector(`div.product-item[data-id="${item.id_product}"]`).classList.add('invisible');
                }
            })
        },
        toggleCart() {
            this.isVisibleCart = this.isVisibleCart ? false : true;
        },
        isCartEmpty() {
            this.placeHolder = "Нет данных";
        },
    },
    computed: {

    },
});