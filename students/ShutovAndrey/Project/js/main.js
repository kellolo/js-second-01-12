const API = 'https://raw.githubusercontent.com/ShutovAndrey/Study/master';
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
    constructor(cart, url = '/StudyDB.json', container = '.products') {
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
} //уже готово

class Cart extends List {
    constructor(url = '/getBasket.json', container = '.cart-block') {
        super(url, container)
    }

    _addListeners() {
        //открыть карзину
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
        //удалить из кaddToBasket.jsonарзины
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

//----------------------------------------------------------------------------------------------------------------
/*class ProdList {
    makeGETRequest(url) {
        return fetch(url)
    }

    renderItem(product_name, price, id_product) {
        const img = 'https://placehold.it/200x150';
        return ` <div class="product-item" data-id="${id_product}">
                            <img src="${img}" alt="Some img">
                            <div class="desc">
                                <h3>${product_name}</h3>
                                <p>${price} $</p>
                                <button class="buy-btn" 
                                data-id="${id_product}"
                                data-name="${product_name}"
                                data-image="${img}"
                                data-price="${price}">Купить</button>
                            </div>
                        </div>`;
    }

    renderProducts(dataArr) {
        let str = '';
        dataArr.forEach(good => {
            str += this.renderItem(good.product_name, good.price, good.id_product);
        });
        document.querySelector('.products').innerHTML = str;
    }

    //кнопки покупки товара (добавляется один раз)
    toBye(evt) {
        if (evt.target.classList.contains('buy-btn')) {
            goodsList.addProduct(evt.target);
        }
    }
}

const productList = new ProdList();

productList.makeGETRequest(dataCatalog)
    .then(dJSON => dJSON.json())
    .then(data => {
        dataFromWeb = data
    })
    .then(() => {
        productList.renderProducts(dataFromWeb)
    })
    .catch(error => {
        console.log('error')
    });

let toByeBtn = document.querySelector('.products');
toByeBtn.addEventListener('click', (evt) => productList.toBye(evt));

class Goodslist {
    constructor(userCart) {
        this.userCart = userCart;
    }

    //кнопка скрытия и показа корзины
    showCart() {
        document.querySelector('.btn-cart').addEventListener('click', () => {
            document.querySelector('.cart-block').classList.toggle('invisible');
        })
    }

    addProduct(product) {
        let productId = +product.dataset['id']; //data-id="1"
        let cartImage = 'https://placehold.it/100x80';
        let find = this.userCart.find(element => element.id === productId); //товар или false
        if (!find) {
            this.userCart.push({
                name: product.dataset['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        this.renderCart()
    }

    //удаление товаров
    removeProduct(product) {
        let productId = +product.dataset['id'];
        let find = this.userCart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.userCart.splice(this.userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.renderCart();
    }

    //перерендер корзины
    renderCart() {
        let allProducts = '';
        for (let el of this.userCart) {
            allProducts += `<div class="cart-item" data-id="${el.id}">
                            <div class="product-bio">
                                <img src="${el.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${el.name}</p>
                                    <p class="product-quantity">Quantity: ${el.quantity}</p>
                                    <p class="product-single-price">$${el.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${el.quantity * el.price}</p>
                                <button class="del-btn" data-id="${el.id}">&times;</button>
                            </div>
                        </div>`
        }

        document.querySelector(`.cart-block`).innerHTML = allProducts + this.priceCount();

    }
    //подсчет стоимости корзины
    priceCount() {
        let priceCount = 0;
        this.userCart.forEach(function (el) {
            priceCount += (el.price * el.quantity);
        });
        let total = ` <div> <p class="product-title"> Total price: ${priceCount}</p></div> `;
        return total;
    }

}

let userCart = [];
const goodsList = new Goodslist(userCart);
goodsList.showCart();
goodsList.renderCart();

let toDelBtn = document.querySelector('.cart-block');
toDelBtn.addEventListener('click', (evt) => goodsList.removeProduct(evt.target));*/
