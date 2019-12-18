const image = 'https://placehold.it/200x150',
    cartImage = 'https://placehold.it/100x80',
    API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/',
    URL_APPROVE_ADD = 'addToBasket.json',
    URL_APPROVE_DELETE = 'deleteFromBasket.json';


//super for Goods and Cart
class List {
    constructor(url, container) {
        this.container = container;
        this.url = url;
        this.items = [];
        this.init();
    }

    init() {
        return false
    }

    getObjectFromJSON(url) {
        return fetch(url)
            .then(data => data.json());
    }

    render() {
        let listHTML = '',
            block = document.querySelector(this.container);
        this.items.forEach(item => {
            let listItem = new lists[this.constructor.name](item);
            listHTML += listItem.render();
        })
        block.innerHTML = listHTML;
    }
}

//super for GoodsItem and CartItem
class Item {
    constructor(object, img = image) {
        this.id_product = object.id_product;
        this.product_name = object.product_name;
        this.price = object.price;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id_product}">
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
                </div>`
    }
}

//класс для элемента списка товаров
class GoodsItem extends Item {}

//класс для списка товаров
class GoodsList extends List {
    constructor(cart, url = 'catalogData.json', container = '.products') {
        super(url, container);
        this.cart = cart;
    }

    _addListeners() {
        //кнопки покупки товара (добавляется один раз)
        document.querySelector('.products').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                this.cart.addProduct(evt.target);
            }
        })
    }

    init() {
        this.getObjectFromJSON(API_URL + this.url)
            .then(data => {
                this.items = data
            })
            .then(() => {
                this.render()
            })
            .finally(() => {
                this._addListeners()
            })
    }
}

//класс для элемента корзины товаров
class CartItem extends Item {
    constructor(object, img = cartImage) {
        super(object, img);
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

//класс для корзины товаров
class CartList extends List {
    constructor(url = 'getBasket.json', container = '.cart-block') {
        super(url, container);
    }

    _addListeners() {
        //кнопка скрытия и показа корзины
        // document.querySelector('.btn-cart').addEventListener('click', () => {
        //     document.querySelector('.cart-block').classList.toggle('invisible');
        // });

        //кнопки удаления товара (добавляется один раз)
        document.querySelector('.cart-block').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('del-btn')) {
                this.removeProduct(evt.target);
            }
        })
    }

    init() {
        this.getObjectFromJSON(API_URL + this.url)
            .then(data => {
                this.items = data.contents
            })
            .then(() => {
                this.render()
            })
            .catch(() => {
                app.isCartEmpty()
            })
            .finally(() => {
                this._addListeners()
            })
    }

    addProduct(product) {
        let approveFromServer;

        this.getObjectFromJSON(API_URL + URL_APPROVE_ADD)
            .then(data => {
                approveFromServer = data.result
            })
            .finally(() => {
                if (approveFromServer) {
                    console.log(`Товар ${product.dataset.name} добавлен в корзину`);
                }
            })
    }

    removeProduct(product) {
        this.getObjectFromJSON(API_URL + URL_APPROVE_DELETE)
            .then(data => {
                if (data.result) {
                    console.log(`Товар ${product.dataset.id} удален из корзины`)
                }
            })
    }
}

const lists = {
    GoodsList: GoodsItem,
    CartList: CartItem
};

let cart = new CartList();
let catalog = new GoodsList(cart);