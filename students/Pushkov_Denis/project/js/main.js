//заглушки (имитация базы данных)
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

class Catalog {
    constructor(container) {
        this.container = container;
        this.items = [];
        this._init();
    }

    _init() {
        //this.items = fetchData();
        this._returnItems(API_URL + 'catalogData.json');

    }

    _render() {
        let block = document.querySelector(this.container);
        let htmlStr = '';
        this.items.forEach(item => {
            let prod = new CatalogItem(item);
            htmlStr += prod.render()
        });
        block.innerHTML = htmlStr;
    }

    _requestItems(url) {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.responseText)
                    } else {
                        rej('error')
                    }
                }
            };
            xhr.open('GET', url, true);
            xhr.send();
        });
    }

    _returnItems(url) {
        let dataFromWeb = null;
        this._requestItems(url)
            .then(dJSON => JSON.parse(dJSON))
            .then(dataNotJSON => {
                dataFromWeb = dataNotJSON
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                this.items = dataFromWeb;
                this._render();
            });
    }
}

class CatalogItem {
    constructor(obj) {
        this.product_name = obj.product_name;
        this.price = obj.price;
        this.id_product = obj.id_product;
        this.img = image;
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
        `;
    }
}

class Cart {
    constructor(container) {
        this.contents = [];
        this.container = container;
        this.amount = null;
        this.countGoods = null;
        this._init();
    }

    _init() {
       this._returnCartItems(API_URL + 'getBasket.json');
        //кнопки удаления товара (добавляется один раз)
        document.querySelector('.cart-block').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('del-btn')) {
                this._removeProduct(evt.target);
            }
        });
        //кнопки покупки товара (добавляется один раз)
        document.querySelector('.products').addEventListener('click', (evt) => {
            if (evt.target.classList.contains('buy-btn')) {
                this._addToCart(evt.target);
            }
        });
    }

    _requestCartItems(url) {
        return fetch(url);
    }

    _returnCartItems(url) {
        let dataFromWeb = null;
        this._requestCartItems(url)
            .then(dJSON => dJSON.json())
            .then(data => {
                dataFromWeb = data
            })
            .finally(() => {
                this.contents = dataFromWeb.contents;
                this.amount = dataFromWeb.amount;
                this.countGoods = dataFromWeb.countGoods;
                this._render();
            })
    }

    _render() {
        let block = document.querySelector(this.container);
        let htmlStr = '';
        this.contents.forEach(item => {
            let prod = new CartItem(item);
            htmlStr += prod.render()
        });
        if (this.contents.length > 0) {
            htmlStr += `
                <div class="total">
                    Total goods: ${this.countGoods} Total amount: ${this.amount}
                </div>
            `;
        }
        block.innerHTML = htmlStr;
    }

    _removeProduct(product) {
        let productId = +product.dataset['id'];
        let find = this.contents.find(element => element.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            this.contents.splice(this.contents.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        this.countGoods--;
        this.amount -= find.price;
        this._render();
    }

    _addToCart(product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = this.contents.find(element => element.id_product === productId); //товар или false
        if (!find) {
            this.contents.push({
                product_name: product.dataset ['name'],
                id_product: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        this.amount += +product.dataset['price'];
        this.countGoods++;
        this._render();
    }
}

class CartItem {
    constructor(obj) {
        this.id_product = obj.id_product;
        this.img = cartImage;
        this.product_name = obj.product_name;
        this.price = obj.price;
        this.quantity = obj.quantity;
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
            `;
    }
}

let catalog = new Catalog('.products');
let cart = new Cart('.cart-block');

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});
