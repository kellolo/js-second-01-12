const API_URL = 'https://raw.githubusercontent.com/ShutovAndrey/Study/master';
const dataCatalog = `${API_URL}/StudyDB.json`;

class ProdList {

    makeGETRequest(url) {

        return new Promise((res, rej) => {

            let xhr;
            // IE detection
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        res(xhr.responseText)
                    } else {
                        rej('error')
                    }
                }
            }
            xhr.open('GET', url, true)
            xhr.send()
        })
    };

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
    .then(dJSON => JSON.parse(dJSON)) //parse from JSON
    .then(dataNotJSON => {
        dataFromWeb = dataNotJSON
    }) //присвоение не джейсона в переменную
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
toDelBtn.addEventListener('click', (evt) => goodsList.removeProduct(evt.target));