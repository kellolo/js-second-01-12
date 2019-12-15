const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


// //FETCH
// function fetchRequest(url) {
//     return fetch(url)
// }

//super for GoodsList and Cart
class List {
    constructor(url, container) {
        this.container = container
        this.url = url
        this.goods = [];
        this._init();
    }

    // //Получение товаров через fetch
    // fetchGoods() {
    //     fetchRequest(`${API_URL}/catalogData.json`)
    //         .then(dJSON => dJSON.json())
    //         .then(data => {
    //             this.goods = data
    //             this.render();
    //         })
    //         .catch(error => console.error(error));

    // }
    // // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    // _totalPrice() {
    //     let totalPrice = 0;
    //     this.goods.forEach(item => totalPrice += item.price);
    //     return totalPrice;
    // }

    getJSON(url) {
        return fetch(url)
        .then(dJSON => dJSON.json()) //возвращает объект, т.к на входе принимает JSON
    }

    _init() {
        // this.fetchGoods()
        return false
    }

    _render () {
        let block = document.querySelector (this.container)
        let htmlStr = ''
        this.goods.forEach (item => {
            let prod = new lists [this.constructor.name] (item)
            htmlStr += prod.render()
        })
        block.innerHTML = htmlStr
    }
}

//super for GoodsItem and CartItem
class Item {
    constructor(obj) {
        this.product_name = obj.product_name;
        this.price = obj.price;
        this.image = 'https://placehold.it/200x150';
        this.id_product = obj.id_product;
        this.cartimg = 'https://placehold.it/100x80';
    }

    render() {
        return `<div class="product-item">
                    <img src="${this.image}" alt="Some img">
                    <div class="desc">
                        <h3>${this.product_name}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id_product}"
                        data-name="${this.product_name}"
                        data-image="${this.cartimg}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}


// Создаём класс для списка товаров
class GoodsList extends List {
    constructor (cart, url = '/catalogData.json', container = '.products') {
        super (url, container)
        this.cart = cart
    }
    _addListeners () {
        document.querySelector('.products').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('buy-btn')) {
                this.cart.addProduct (evt.target);
            }
        })
    }
    _init () {
        this.getJSON (API_URL + this.url)
            .then (data => { this.goods = data })
            .then (() => { this._render () })
            .finally (() => { this._addListeners () })
    }
}


// Создаём класс товара
class GoodsItem extends Item {}


//Создаём класс коризны товаров
class Cart extends List {
    constructor (url = '/getBasket.json', container = '.cart-block') {
        super (url, container)
    }
    _addListeners () {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })

        document.querySelector('.cart-block').addEventListener ('click', (evt) => {
            if (evt.target.classList.contains ('del-btn')) {
                this.removeProduct (evt.target);
            }
        })
    }

    _init () {
        this.getJSON (API_URL + this.url)
            .then (data => { this.goods = data.contents })
            .then (() => { this._render () })
            .finally (() => { this._addListeners () })
    }

    addProduct (prod) {
        let approveFromServer
        this.getJSON (API_URL + '/addToBasket.json')
            .then (dJSON => {approveFromServer = dJSON.result})
            .finally (() => {
                if (approveFromServer) {
                    console.log (`Товар ${prod.dataset.name} добавлен в корзину`)
                }
            })
    }

    removeProduct (prod) {
        this.getJSON (API_URL + '/deleteFromBasket.json')
        .then (dJSON => {
            if (dJSON.result) {
                console.log (`Товар ${prod.dataset.id} удален из корзины`)
            }
        })
    }
}


class CartItem extends Item {
    constructor (obj) {
        super (obj)
        this.quantity = 1
        this.cartimg = 'https://placehold.it/100x80';
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
            <img src="${this.cartimg}" alt="Some image">
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
    </div>`;
    }
}



const lists = {
    GoodsList: GoodsItem,
    Cart: CartItem
}




let cart = new Cart ()
const list = new GoodsList(cart);

// console.log(list._totalPrice());






// // //кнопки покупки товара (добавляется один раз)
// let addToCartBtn = document.querySelectorAll('.buy-btn');

// addToCartBtn.forEach(function (btn) {
//     btn.addEventListener ('click', addToCart)
// });


// function addToCart() {
//     let cartItem = new Cart ();
//     cartItem.addItems(this.title);
//     console.log(new Cart);
// }






