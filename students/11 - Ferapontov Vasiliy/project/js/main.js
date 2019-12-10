//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8];


class Cart {

  constructor() {
    this.cartList = [];
  }

  addProduct(product) {
    let productId = +product.dataset['id']; //data-id="1"
    let find = this.cartList.find(element => element.id === productId); //товар или false
    if (!find) {
      this.cartList.push({
        name: product.dataset ['name'],
        id: productId,
        img: cartImage,
        price: +product.dataset['price'],
        quantity: 1
      })
    } else {
      find.quantity++
    }
    this.renderCart();
  }

  removeProduct(product) {
    let productId = +product.dataset['id'];
    let find = this.cartList.find(element => element.id === productId);
    if (find.quantity > 1) {
      find.quantity--;
    } else {
      this.cartList.splice(this.cartList.indexOf(find), 1);
      document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
    }
    this.renderCart();
  }

  renderCart() {
    let allProducts = '';
    for (let el of this.cartList) {
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
    this._calcTotalPrice();
  }

  _calcTotalPrice() {
    let result = 0;
    this.cartList.forEach(function (element) {
      result += +element.price * +element.quantity;
    });
    if (this.cartList.length > 0) {
      document.querySelector(`.cart-block`).insertAdjacentHTML('beforeend', `<span class="total-price">TOTAL PRICE ${result} $</span>`)
    }
  }
}

class ProductCatalog {
  constructor() {
    this.list = [];
  }

//variant #1 - callback
//   fetchData() {
//     this._makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json', (items) => {
//       this.list = JSON.parse(items);
//       this._renderProducts();
//     });
//   }
//
//   _makeGETRequest(url, callback) {
//     let xhr;
//     xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4) {
//         if (xhr.status === 200) {
//           callback(xhr.responseText);
//         } else {
//           throw 'error: resource not found, check URL';
//         }
//       }
//     };
//     xhr.open('GET', url, true);
//     xhr.send();
//   };

  // variant #2 - Promise
  // async fetchData() {
  //   await this._makeGETRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
  //       .then(items => {
  //         this.list = JSON.parse(items);
  //         // this._renderProducts(); (без async await)
  //       })
  //       .catch((error) => {throw error});
  //   this._renderProducts();
  // }
  //
  // _makeGETRequest(url) {
  //   return new Promise((resolve, reject) => {
  //     let xhr;
  //     xhr = new XMLHttpRequest();
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState === 4) {
  //         if (xhr.status === 200) {
  //           resolve(xhr.responseText);
  //         } else {
  //           reject('error: resource not found, check URL');
  //         }
  //       }
  //     };
  //     xhr.open('GET', url, true);
  //     xhr.send();
  //   })
  // }

  // variant #3 - Fetch
  fetchData() {
    this._fetchRequest('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json')
        .then(dJSON =>  dJSON.json())
        .then(data => {
          this.list = data;
          this._renderProducts();
        });
  }

  _fetchRequest(url) {
    return fetch(url);
  }

   _renderProducts() {
    let str = '';
    for (let item of this.list) {
      str += `<div class="product-item" data-id="${item.id_product}">
                        <img src="${image}" alt="Some img">
                        <div class="desc">
                            <h3>${item.product_name}</h3>
                            <p>${item.price} $</p>
                            <button class="buy-btn" 
                            data-id="${item.id_product}"
                            data-name="${item.product_name}"
                            data-image="${image}"
                            data-price="${item.price}">Купить</button>
                        </div>
                    </div>`
    }
    document.querySelector('.products').innerHTML = str;
  }
}

let cart = new Cart();
let catalog = new ProductCatalog();

catalog.fetchData();

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('del-btn')) {
    cart.removeProduct(evt.target);
  }
});
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('buy-btn')) {
    cart.addProduct(evt.target);
  }
});


