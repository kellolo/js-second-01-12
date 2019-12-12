class Product {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = 0;
    }

    createTemplate() {
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


const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
const ids = [1, 2, 3, 4, 5, 6, 7, 8];


class ProdList {
    fetchData() {
        let arr = [];
        for (let i = 0; i < items.length; i++) {
            arr.push(new Product(ids[i], items[i], prices[i], image));
        }
        return arr
    }


    renderProducts() {
        let str = '';
        for (const item of this.fetchData()) {
            str += item.createTemplate()
        };
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
productList.renderProducts();

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
        let find = this.userCart.find(element => element.id === productId); //товар или false
        if (!find) {
            this.userCart.push({
                name: product.dataset ['name'],
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
//goodsList.addProduct();
goodsList.renderCart();

let toDelBtn = document.querySelector('.cart-block');
toDelBtn.addEventListener('click', (evt) => goodsList.removeProduct(evt.target));


