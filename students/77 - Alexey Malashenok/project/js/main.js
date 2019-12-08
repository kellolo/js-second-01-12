'use strict';

//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const names = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];

//Класс товара
class Item {

    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
    }

    /**
     * Метод формирует HTML для товара
     * @returns {string} HTML содержимое элемента в виде строки
     **/
    createItemHTML() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.name}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn" 
                    data-id="${this.id}"
                    data-name="${this.name}"
                    data-image="${this.img}"
                    data-price="${this.price}">Купить</button>
                </div>
            </div>`;
    }
}

//Класс корзины
class Cart {

    constructor() {
        this.items = [];
        this.totalSum = 0;
    }

    /**
     * Метод добавляет товар в корзину
     *  @param {Item} item
     **/
    addItem(item) {

        if (this.items[item.id] == undefined) {
            this.items[item.id] = {
                name: item.name,
                img: cartImage,
                price: item.price,
                quantity: 1,
            }
        } else {
            this.items[item.id].quantity++;
        }
    }

    /**
     * Метод удаляет товар из корзины, или уменьшает его
     * количество на единицу
     * @param {Item} item
     **/
    removeItem(item) {

        if (this.items[item.id].quantity == 1) {
            delete this.items[item.id];
        } else {
            this.items[item.id].quantity--;
        }
    }
    /**
     * Метод считает суммарную стоимость товаров в корзине
     * возвращает HTML с суммой в виде строки 
     * @returns {string}
     **/
    getTotalSum() {
        this.totalSum = this.items.reduce((sum, current) =>
            sum + current.price * current.quantity, 0);
        return `<div class="total-sum">
                    <h3>Total: $${this.totalSum}</h3>
                </div>`;
    }
    /**
     * Метод формирует содержимое корзины
     * возвращает HTML в виде строки 
     * @returns {string}
     **/
    createCartHTML() {
        return this.items.reduce((str, current, index) =>
            str + `<div class="cart-item" data-id="${index}">
                        <div class="product-bio">
                           <img src="${current.img}" alt="Some image">
                            <div class="product-desc">
                                <p class="product-title">${current.name}</p>
                                <p class="product-quantity">Quantity: ${current.quantity}</p>
                                <p class="product-single-price">$${current.price} each</p>
                            </div>
                        </div>
                        <div class="right-block">
                            <p class="product-price">${current.quantity * current.price}</p>
                            <button class="del-btn" data-id="${index}">&times;</button>
                        </div>
                    </div>`, '');
    }
}

//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
let userCart = new Cart();
let list = fetchData();

//создание массива объектов - имитация загрузки данных с сервера
function fetchData() {
    let arr = [];
    for (let i = 0; i < names.length; i++) {
        arr.push(new Item(ids[i], names[i], prices[i], image));
    }
    return arr;
};

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('del-btn')) {
        removeProduct(evt.target);
    }
})

//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
    if (evt.target.classList.contains('buy-btn')) {
        addProduct(evt.target);
    }
})

//Рендер списка товаров (каталога)
function renderProducts() {
    let str = '';
    list.forEach(item =>
        str += item.createItemHTML()
    );
    document.querySelector('.products').innerHTML = str;
}

//Добавление товаров в корзину
function addProduct(product) {
    userCart.addItem(list[+product.dataset.id - 1]);
    renderCart();
}

//удаление товаров из корзины
function removeProduct(product) {
    userCart.removeItem(list[+product.dataset.id - 1]);
    renderCart();
}

//Рендер корзины
function renderCart() {
    document.querySelector(`.cart-block`).innerHTML = userCart.createCartHTML() + userCart.getTotalSum();
}

renderProducts();