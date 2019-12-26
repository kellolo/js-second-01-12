//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//класс для элемента списка товаров
class GoodsItem {
    constructor(id, title, price, img = image) {
        this.id = id;
        this.name = title;
        this.price = price;
        this.img = img;
    }
    render() {
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
                </div>`
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
    constructor(id, title, price, img = image) {
        this.id = id;
        this.name = title;
        this.price = price;
        this.img = img;
    }
    render() {
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
                </div>`
    }
}

//класс для корзины товаров
class CartList {
    constructor() {
        this.goods = [];
    }

    addProduct(product) {
        let productId = +product.dataset['id']; //data-id="1"
        let find = userCart.find(element => element.id === productId); //товар или false
        if (!find) {
            userCart.push({
                name: product.dataset['name'],
                id: productId,
                img: cartImage,
                price: +product.dataset['price'],
                quantity: 1
            })
        } else {
            find.quantity++
        }
        renderCart()
    }

    removeProduct(product) {
        let productId = +product.dataset['id'];
        let find = userCart.find(element => element.id === productId);
        if (find.quantity > 1) {
            find.quantity--;
        } else {
            userCart.splice(userCart.indexOf(find), 1);
            document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
        }
        renderCart();
    }

    renderCart() {
        let allProducts = '';
        for (el of userCart) {
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

        document.querySelector(`.cart-block`).innerHTML = allProducts;
    }
}

function makeGetRequest(url) {
    return fetch(url);
};

let lol = new GoodsList();
lol.fetchGoods();

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
