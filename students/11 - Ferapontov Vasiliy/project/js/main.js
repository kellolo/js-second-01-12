//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class List {
  constructor(url, container) {
    this.container = container;
    this.items = [];
    this.url = url;
    this._init();
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

  _init() {
    return false;
  }

  getJSON(url) {
    return fetch(url)
            .then(d => d.json())
  }

  _render() {
    let block = document.querySelector(this.container);
    let str = '';
    this.items.forEach(item => {
      let product = new lists [this.constructor.name] (item);
      str += product.render();
    });
    block.innerHTML = str;
  }
}

class Item {
  constructor(obj, img = image) {
    this.product_name = obj.product_name;
    this.price = obj.price;
    this.id_product = obj.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
                        <img src="${image}" alt="Some img">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-id="${this.id_product}"
                            data-name="${this.product_name}"
                            data-image="${this.img}"
                            data-price="${this.price}">Купить</button>
                        </div>
                    </div>`
  }
}

class Catalog extends List {
  constructor(cart, url = '/catalogData.json', container = '.products') {
    super (url, container);
    this.cart = cart;
  }

  _addListeners() {
    //кнопки покупки товара (добавляется один раз)
    document.querySelector('.products').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('buy-btn')) {
        this.cart.addProduct(evt.target);
      }
    });
  }

  _init() {
    this.getJSON(API + this.url)
            .then(data => {this.items = data})
            .then(() => {this._render()})
            .finally(() => {this._addListeners()})
  }
}

class CatalogItem extends Item {};

class Cart extends List {
  constructor(url = '/getBasket.json', container = '.cart-block') {
    super(url, container);
  }
  _addListeners() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector('.cart-block').classList.toggle('invisible');
    });

    document.querySelector('.cart-block').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('del-btn')) {
        this.removeProduct(evt.target);
      }
    });
  }

  _init() {
    this.getJSON(API + this.url)
        .then(data => {this.items = data.contents})
        .then(() => {this._render()})
        .finally(() => {this._addListeners()})
  }

  _render() {
    let block = document.querySelector(this.container);
    let str = '';
    this.items.forEach(item => {
      let product = new lists [this.constructor.name] (item);
      product.quantity = item.quantity;
      str += product.render();
    });
    block.innerHTML = str;
  }

  addProduct(prod) {
    this.getJSON(API + '/addToBasket.json')
        .then(d => {
          if (d.result) {
            let productId = +prod.dataset['id'];
            let find = this.items.find(element => element.id_product === productId); //товар или false
            if (!find) {
              this.items.push({
                product_name: prod.dataset['name'],
                id_product: productId,
                img: cartImage,
                price: +prod.dataset['price'],
                quantity: 1
              })
            } else {
              find.quantity++
            }
            console.log(`Товар ${prod.dataset['name']} добавлен в корзину`);
            this._render();
          }
        })
  }

  removeProduct(prod) {
    this.getJSON(API + '/deleteFromBasket.json')
        .then(d => {
          if (d.result) {
            let productId = +prod.dataset['id'];
            let find = this.items.find(element => element.id_product === productId);
            if (find.quantity > 1) {
              find.quantity--;
            } else {
              this.items.splice(this.items.indexOf(find), 1);
              document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
            }
            console.log(`Товар ${prod.dataset['id']} удален из корзины`);
            this._render();
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
    return `<div class="cart-item" data-id="${this.id_product}">
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
                        </div>`
  }
}


const lists = {
  Catalog: CatalogItem,
  Cart: CartItem,
};

let cart = new Cart();
let catalog = new Catalog(cart);






