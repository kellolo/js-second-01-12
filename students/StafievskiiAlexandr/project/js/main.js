"use strict";

let remoteRep = !false;
let domain = null;
if (remoteRep) {
  domain = "https://raw.githubusercontent.com/heatmosk/online-store-api/master";
} else {
  domain = "http://127.0.0.1/gb-api";
}

let API = {
  catalogData: `${domain}/responses/catalogData.json`,
  addToBasket: `${domain}/responses/addToBasket.json`,
  getBasket: `${domain}/responses/getBasket.json`,
  getGoodById: `${domain}/responses/getGoodById.json`,
  deleteFromBasket: `${domain}/responses/deleteFromBasket.json`,
};


class List {
  constructor(url, container) {
    this.container = container;
    this.url = url;
    this.items = [];
    this._init();
  }
  _init() {
    return false;
  }
  _addHandlers() { }
  _render() {
    let htmlTag = document.querySelector(this.container);
    let html = this.items
      .map(item => new lists[this.constructor.name](item))
      .map(prod => prod.render())
      .join('');
    htmlTag.innerHTML = html;
  }
  getJSON(url) {
    return fetch(url)
      .then(d => d.json()) //не Джейсон
  }
}

class Catalog extends List {
  constructor(cart, url, container) {
    super(url, container);
    this.cart = cart;
  }
  _init() {
    fetch(this.url)
      .then(resp => resp.json())
      .then(data => {
        this.items = data;
      })
      .finally(() => {
        this._addHandlers();
        this._render();
      });
  }
  _addHandlers() {
    document.querySelector('.products').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('buy-btn')) {
        this.cart.addProduct(evt.target);
      }
    })
  }
}

class Cart extends List {
  constructor(url, container) {
    super(url, container);
    this.amount = 0;
    this.countGoods = 0;
  }
  _init() {
    fetch(this.url)
      .then(resp => resp.json())
      .then(data => {
        this.amount = data.amount;
        this.countGoods = data.countGoods;
        this.items = data.contents;
      })
      .finally(() => {
        this._addHandlers();
        this._render();
      });
  }
  _addHandlers() {
    document.querySelector('.btn-cart').addEventListener('click', () => {
      document.querySelector('.cart-block').classList.toggle('invisible');
    });
    document.querySelector('.cart-block').addEventListener('click', (evt) => {
      if (evt.target.classList.contains('del-btn')) {
        this.removeProduct(evt.target);
      }
    });
  }

  _findProductById(id_product) {
    return this.items.find(p => id_product == p.id_product);
  }

  _addProduct(prod) {
    let productData = {
      id_product: prod.dataset.id,
      product_name: prod.dataset.name,
      price: prod.dataset.price,
      product_image_big: prod.dataset.imageBig,
      product_image_small: prod.dataset.imageSmall,
      quantity: 1,
    };
    let cartProduct = this._findProductById(productData.id_product);
    if (cartProduct) {
      cartProduct.quantity++;
    } else {
      this.items.push(productData);
    }
  }
  addProduct(prod) {
    this.getJSON(API.addToBasket)
      .then(d => {
        if (d.result) {
          console.log(`Товар ${prod.dataset.name} добавлен в корзину`);
          this._addProduct(prod);
        }
        this._render();
      });
  }
  _removeProduct(prod) {
    let cartProduct = this._findProductById(prod.dataset.id);
    if (cartProduct) {
      cartProduct.quantity--;
      if (cartProduct.quantity <= 0) {
        this.items = this.items.filter(p => p.id_product != prod.dataset.id);
      }
    }
  }
  removeProduct(prod) {
    this.getJSON(API.deleteFromBasket)
      .then(d => {
        if (d.result) {
          console.log(`Товар ${prod.dataset.id} удален из корзины`);
          this._removeProduct(prod);
        }
        this._render();
      })
  } 
}




class Item {
  constructor(obj) {
    this.id_product = obj.id_product;
    this.product_name = obj.product_name;
    this.price = +obj.price;
    this.product_image_big = obj.product_image_big;
    this.product_image_small = obj.product_image_small;
  }
  render() {
    return `
      <div class="product-item" data-id="${this.id_product}">
        <img src="${this.product_image_big}" alt="Some img">
        <div class="desc">
          <h3>${this.product_name}</h3>
          <p>${this.price} $</p> 
          <button class="buy-btn" 
          data-id="${this.id_product}"
          data-name="${this.product_name}" 
          data-price="${this.price}"
          data-image-big="${this.product_image_big}"
          data-image-small="${this.product_image_small}">Купить</button>
        </div>
      </div>
    `;
  }
}

class CatalogItem extends Item { }

class CartItem extends Item {
  constructor(obj) {
    super(obj);
    this.quantity = obj.quantity;
  }
  render() { 
    return `
      <div class="cart-item" data-id="${this.id_product}">
        <div class="product-bio">
          <img src="${this.product_image_small}" alt="Some image">
          <div class="product-desc">
            <p class="product-title">${this.product_name}</p>
            <p class="product-quantity">Quantity: ${this.quantity}</p>
            <p class="product-single-price">$${this.price} each</p>
          </div>
        </div>
        <div class="right-block">
          <p class="product-price">${this.getCoast()}</p>
          <button class="del-btn" data-id="${this.id_product}">&times;</button>
        </div>
      </div>
    `;
  }
  getCoast() {
    return this.quantity * this.price;
  }
  getQuantity() {
    return this.quantity;
  }
  addOne() {
    this.quantity++;
  }
  removeOne() {
    this.quantity = this.quantity > 0 ? this.quantity - 1 : 0;
  }
}


const lists = {
  Catalog: CatalogItem,
  Cart: CartItem
}

let cart = new Cart(API.getBasket, '.cart-block');
let cat = new Catalog(cart, API.catalogData, '.products');
