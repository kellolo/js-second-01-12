class Products extends List {
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container)
        this.cart = cart
        this.getJson()
            .then(data => this.handleData(data))
    }
    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.taget.classList.contains('buy-btn')) {
                const id = +e.target.dataset['id']
                cart.addProduct(this.getItem(id))
            }
        })
    }

}