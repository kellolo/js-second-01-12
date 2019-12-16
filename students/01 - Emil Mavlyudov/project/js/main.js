const API = 'https://raw.githubusercontent.com/lindoro7/js-second-01-12/master/students/01%20-%20Emil%20Mavlyudov/responses';
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

//super for Catalog and Cart
class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.items = [];
        this._init();
    }

    _init() {
        return false
        // здесь удобно навешивать листенеры на кнопки
    }

    getJSON(url) {
        return fetch(url)
            .then(d => d.json()) //не Джейсон
    }

    _render() {
        let block = document.querySelector(this.container);
        let htmlStr = '';
        this.items.forEach(item => {
            let prod = new lists [this.constructor.name](item);
            htmlStr += prod.render();
        });
        block.innerHTML = htmlStr;
    }
}

//super for CatalogItem and CartItem
class Item {
    constructor(obj, img = image) {
        this.product_name = obj.product_name;
        this.price = obj.price;
        this.id_product = obj.id_product;
        this.img = img;
    }

    render() {
        return `
            <div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" 
                    data-id="${this.id_product}"
                    data-name="${this.product_name}"
                    data-image="${this.img}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>
        `
    }
}

class Catalog extends List {
    constructor(cart, url = '/catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
    }

    _addListeners() {
        document.querySelector('.products').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                this.cart.addProduct(evt.target);
            }
        })
    }

    _init() {
        this.getJSON(API + this.url)
            .then(data => {
                this.items = data
            })
            .then(() => {
                this._render()
            })
            .finally(() => {
                this._addListeners()
            })
    }
}

class CatalogItem extends Item { 
     //уже готово
} 

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container)
    }

    _addListeners() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
        document.querySelector('.cart-block').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeProduct(evt.target);
            }
        })
    }

    _init() {
        this.getJSON(API + this.url)
            .then(data => {
                this.items = data.contents
            })
            .then(() => {
                this._render()
            })
            .finally(() => {
                this._addListeners()
            })
    }

    addProduct(prod) {
        let approveFromServer;
        this.getJSON(API + '/addToBasket.json')
            .then(d => {
                approveFromServer = d.result
            })
            .finally(() => {
                if (approveFromServer) {
                    //  console.log (`Товар ${prod.dataset.name} добавлен в корзину`)
                }
            })
    }

    removeProduct(prod) {
        this.getJSON(API + '/deleteFromBasket.json')
            .then(d => {
                if (d.result) {
                    // console.log (`Товар ${prod.dataset.id} удален из корзины`)
                }
            })
    }
}

class CartItem extends Item {
    constructor(obj, img = cartImage) {
        super(obj, img);
        this.quantity = 1;
    }

    render() {
        return `
            <div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                        <p class="product-title">${this.product_name}</p>
                        <p class="product-quantity">Quantity: ${this.quantity}</p>
                        <p class="product-single-price">$${this.price} each</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${this.quantity * this.price}</p>
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
            </div>
        `
    }
}

const lists = {
    Catalog: CatalogItem,
    Cart: CartItem
}

let cart = new Cart();
let catalog = new Catalog(cart);


