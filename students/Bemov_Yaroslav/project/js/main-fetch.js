//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//класс для элемента списка товаров
class GoodsItem {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

//класс для списка товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        makeGetRequest(`${API_URL}/catalogData.json`)
            .then(d => d.json())
            .then(data => {
                this.goods = data;
            })
            .finally(() => {
                this.render();
            })
    }

    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHTML += goodItem.render();
        })
        document.querySelector('.products').innerHTML = listHTML;
    }
}

//класс для элемента корзины товаров
class CartItem {
    constructor() {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

//класс для корзины товаров
class CartList {
    constructor() {
        this.goods = [];
    }
    addItem() {
        return false;
    }
    removeItem() {
        return false;
    }
    render() {
        return false;
    }
}

function makeGetRequest(url) {
    return fetch(url);
};