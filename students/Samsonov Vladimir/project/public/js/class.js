//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


// // CALLBACK
// function makeGETRequest(url, callback) {
//     var xhr;

//     if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//     } else if (window.ActiveXObject) {
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//     }

//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4) {
//             callback(xhr.responseText);
//         }
//     }

//     xhr.open('GET', url, true);
//     xhr.send();
// }


// //PROMISE
// function promiseGETRequest(url) {
//     return new Promise((res, rej) => {
//         let xhr = new XMLHttpRequest()
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if (xhr.status === 200) {
//                     res(xhr.responseText)
//                 } else {
//                     rej('error')
//                 }
//             }
//         }
//         xhr.open('GET', url, true)
//         xhr.send()
//     })
// }


//FETCH
function fetchRequest (url) {
    return fetch (url)
}


// Создаём класс товара
class GoodsItem {
    constructor(product_name, price, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.image = 'https://placehold.it/200x150';
        this.id_product = id_product;
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
class GoodsList {
    constructor() {
        this.goods = [];
    }
    // fetchGoods() {
    //     this.goods = [
    //         { title: 'Mouse Pad', price: 50, id: 1 },
    //         { title: 'Mouse', price: 150, id: 2 },
    //         { title: 'Keyboard', price: 200, id: 3 },
    //         { title: 'Monitor', price: 350, id: 4 },
    //         { title: 'PC Case', price: 100, id: 5 },
    //         { title: 'CPU i9', price: 1000, id: 6 },
    //         { title: 'RAM', price: 500, id: 7 },
    //         { title: 'Graphics card', price: 800, id: 8 },
    //     ];
    // }

    // //Получение товаров через callback
    // fetchGoods(cb) {
    //     makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
    //       this.goods = JSON.parse(goods);
    //       cb();
    //     })
    //   }


    // //Получение товаров через promise
    // fetchGoods() {
    //     promiseGETRequest(`${API_URL}/catalogData.json`)
    //         .then(data => JSON.parse(data))
    //         .then(parsedData => {
    //             this.goods = parsedData;
    //             this.render();
    //         })
    //         .catch(error => console.error(error));
    // }

    //Получение товаров через fetch
    fetchGoods() {
        fetchRequest (`${API_URL}/catalogData.json`)
            .then (dJSON => dJSON.json ())
            .then (data => {
                this.goods = data
                this.render();
            })
            .catch(error => console.error(error));

    }

    // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    _totalPrice() {
        let totalPrice = 0;
        this.goods.forEach(item => totalPrice += item.price);
        return totalPrice;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}

// //Создаём класс коризны товаров
// class Cart {


//     render() {
//         return `<div class="cart-item" data-id="${this.id}">
//                     <div class="product-bio">
//                         <img src="${this.cartimg}" alt="Some image">
//                         <div class="product-desc">
//                             <p class="product-title">${this.title}</p>
//                             <p class="product-quantity">Quantity: </p>
//                             <p class="product-single-price">$${this.price} each</p>
//                         </div>
//                     </div>
//                     <div class="right-block">
//                         <p class="product-price">${this.price}</p>
//                         <button class="del-btn" data-id="${this.id}">&times;</button>
//                     </div>
//                 </div>`;
//     }

// }


const list = new GoodsList();
list.fetchGoods(() => {
    list.render();
    console.log(list._totalPrice());
});





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






