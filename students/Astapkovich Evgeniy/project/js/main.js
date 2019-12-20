const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

// const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad', 'something'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24, 100500];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8, 000];

let app = new Vue ({
  el: '#app',
  data: {
    isVisibleCart: false
  },
  methods: {
  },
})

class List {  // super for Catalog and Cart
  constructor(url, container) {
    this.container = container
    this.url = url
    this.items = []
    this._init()
  }

  _init() {
    return false
    // Здесь удобно навешивать листенеры на кнопки
  }

  getJSON(url) {
    return fetch(url)
      .then(d => d.json())
  }

  _render(items) {
    let block = document.querySelector(this.container)
    let htmlStr = ''
    items.forEach(item => {
      let prod = new lists[this.constructor.name](item)
      htmlStr += prod.render()
    })

    block.innerHTML = htmlStr
  }
}

class Item {  // super for CatalogItem and CartItem
  constructor(obj, img = image) {
    this.product_name = obj.product_name
    this.price = obj.price
    this.id_product = obj.id_product
    this.img = img
  }

  render() {
    return `<div class="product-item" data-id="${this.id_product}">
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
            </div>`
  }
}

class Catalog extends List {
  constructor(cart, url = '/catalogData.json', container = '.products') {
    super(url, container)
    this.cart = cart
  }

  _addListeners() {
    document.querySelector('.products').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('buy-btn')) {
        this.cart._addProduct(evt.target);
      }
    })
  }

  _init() {
    this.getJSON(API + this.url)
      .then(data => { this.items = data })
      .then(() => { this._render(this.items) })
      .finally(() => { this._addListeners() })
  }
}

class CatalogItem extends Item { }  // уже готово. НО!!! метод render можно было оставить здесь, а не в супере. 

class Cart extends List { //TODO
  constructor(url = '/getBasket.json', container = '.cart-block') {
    super(url, container)
  }

  _init() {
    this.getJSON(API + this.url)
      .then(data => { this.items = data.contents })
      .then(() => { this._render(this.items) })
      .finally(() => { this._addListeners() })
  }

  _addListeners() {
    // //кнопка скрытия и показа корзины
    // document.querySelector('.btn-cart').addEventListener('click', () => {
    //   document.querySelector('.cart-block').classList.toggle('invisible');
    // })
    //кнопки удаления товара (добавляется один раз)
    document.querySelector('.cart-block').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('del-btn')) {
        this._removeProduct(evt.target)
      }
    })
  }

  _addProduct(prod) {
    this.getJSON(API + '/addToBasket.json')
        .then(d => {
          if (d.result) {
            console.log(`Товар ${prod.dataset.name} добавлен в корзину`)
          }
        })
  }

  _removeProduct(prod) {
    this.getJSON(API + '/deleteFromBasket.json')
        .then(d => {
          if (d.result) {
            console.log(`Товар ${prod.dataset.id} удален из корзины`)
          }
        })
  }
}

class CartItem extends Item {
  constructor(obj, img = cartImage) {
    super(obj, img)
    this.quantity = 1
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
  Cart: CartItem
}
const cart = new Cart()
const catalog = new Catalog(cart)


// Добавление продуктов в корзину
// function addProduct(product) {
//   let productId = +product.dataset['id']; //data-id="1"
//   let find = userCart.find(element => element.id === productId); //товар или false
//   if (!find) {
//     userCart.push({
//       name: product.dataset['name'],
//       id: productId,
//       img: cartImage,
//       price: +product.dataset['price'],
//       quantity: 1
//     })
//   } else {
//     find.quantity++
//   }
//   renderCart()
// }

//удаление товаров
// function removeProduct(product) {
//   let productId = +product.dataset['id'];
//   let find = userCart.find(element => element.id === productId);
//   if (find.quantity > 1) {
//     find.quantity--;
//   } else {
//     userCart.splice(userCart.indexOf(find), 1);
//     document.querySelector(`.cart-item[data-id="${productId}"]`).remove()
//   }
//   renderCart();
// }

// //перерендер корзины
// function renderCart() {
//   let allProducts = '';
//   for (el of userCart) {
//     allProducts += `<div class="cart-item" data-id="${el.id}">
//                             <div class="product-bio">
//                                 <img src="${el.img}" alt="Some image">
//                                 <div class="product-desc">
//                                     <p class="product-title">${el.name}</p>
//                                     <p class="product-quantity">Quantity: ${el.quantity}</p>
//                                     <p class="product-single-price">$${el.price} each</p>
//                                 </div>
//                             </div>
//                             <div class="right-block">
//                                 <p class="product-price">${el.quantity * el.price}</p>
//                                 <button class="del-btn" data-id="${el.id}">&times;</button>
//                             </div>
//                         </div>`
//   }

//   document.querySelector(`.cart-block`).innerHTML = allProducts;
// }