"use strict";

let remoteRep = !false;
let domain = null;
if (remoteRep) {
  domain = "https://raw.githubusercontent.com/heatmosk/online-store-api/master";
} else {
  domain = "http://127.0.0.1/gb-api";
}

let REQUEST_URLS = {
  addToBasket: `${domain}/responses/addToBasket.json`,
  getBasket: `${domain}/responses/getBasket.json`,
  getGoodById: `${domain}/responses/getGoodById.json`,
  deleteFromBasket: `${domain}/responses/deleteFromBasket.json`,
};




let dataBasket = `
{
  "amount": 46600,
  "countGoods": 2,
  "contents": [
    {
      "id_product": 123,
      "product_name": "Ноутбук",
      "price": 45600,
      "quantity": 1
    },
    {
      "id_product": 456,
      "product_name": "Мышка",
      "price": 1000,
      "quantity": 1
    }
  ]
}`;


class Product {
  constructor(id_product, name, price, quantity = 1) {
    this.id_product = id_product;
    this.price = +price;
    this.name = name;
    this.quantity = quantity;
  }
  getName() {
    return this.name;
  }
  getPrice() {
    return this.price;
  }
  getQuantity() {
    return this.quantity;
  }
  add(quantity = 1) {
    this.quantity += quantity;
  }
  remove(quantity = 1) {
    this.quantity -= quantity;
  }
  render() {
    return `
      <div class="product__item" data-productid="${this.id_product}">
        <div>Name: ${this.getName()}</div>
        <div>Price: ${this.getPrice()}</div>
        <div>Quantity: ${this.getQuantity()}</div>
      </div>
    `;
  }
}

class ProductCart {
  constructor(container) {
    this.container = container;
    this.contents = [];
    this.countGoods = 0;
    this.amount = 0;
  }
  find(product) {
    return this.contents.find(prod => prod.id_product == product.id_product);
  }
  add(product) {
    let cartProduct = this.find(product);
    if (cartProduct) {
      cartProduct.add();
    } else {
      this.contents.push(product);
    }
    this._calculateCountCoods();
    this._calculateAmount();
  }
  getAmount() {
    return this.amount;
  }
  getCountGoods() {
    return this.countGoods;
  }
  getContents() {
    return this.contents;
  }
  remove(product) {
    let removingProduct = this.find(product);
    if (removingProduct) {
      removingProduct.remove();
      if (!removingProduct.getQuantity()) {
        this._removeProduct(removingProduct);
      }
      this._calculateCountCoods();
      this._calculateAmount();
    }
  }
  _indexOfProduct(product) {
    for (let i = 0; i < this.contents.length; i++) {
      if (product.id_product == this.contents[i].id_product) return i;
    }
    return -1;
  }
  _removeProduct(product) {
    let removingProductIndex = this._indexOfProduct(product);
    if (removingProductIndex != -1) {
      this.contents = this.contents
        .filter((prod, index) => index != removingProductIndex);
    }
  }
  _calculateCountCoods() {
    this.countGoods = 0;
    if (this.contents.length) {
      this.countGoods = this.contents
        .map(product => product.quantity)
        .reduce((a, b) => a + b);
    }
  }
  _calculateAmount() {
    this.amount = 0;
    if (this.contents.length) {
      this.amount = this.contents
        .map(product => product.price * product.quantity)
        .reduce((a, b) => a + b);
    }
  }
  render() {
    let tag = document.querySelector(this.container);
    let html = this.contents.map(prod => prod.render()).join("");
    html = `
      <h3>Your products:</h3>
      ${html}
      <hr>
      <div>Count goods: ${this.getCountGoods()}</div>
      <div>Amount: ${this.getAmount()}</div>
    `;
    tag.innerHTML = html;
  }
}


let JSONd = JSON.parse(dataBasket);
let cart = new ProductCart(".products");


function renderCart() {
  cart.render();
}

function asyncGetProduct(nextFunc) {
  let productData = JSONd.contents[0];
  let product = new Product(productData.id_product, productData.product_name, productData.price);
  setTimeout(() => {
    cart.add(product);
    nextFunc();
  }, 1300);
}

function myPromise(val) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let prod = JSONd.contents.find(p => p.id_product == val);
      if (prod) {
        res({ data: prod, status: "200" });
      } else {
        rej({ data: null, status: "403" });
      }
    }, 2000);
  });
}

function getPromise(id_product) {
  let p = null;
  myPromise(id_product)
    .then(val => new Product(val.data.id_product, val.data.product_name, val.data.price))
    .then(product => cart.add(product))
    .catch(err => {
      console.log(err);
    })
    .finally(cart.render.bind(cart));
}


function makeGETRequest(url) {
  return new Promise((res, rej) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          res(xhr.responseText);
        } else {
          rej({ error: xhr.responseText });
        }
      }
    }
    xhr.open('GET', url, true);
    xhr.send();
  });
}


function fetchRequest(url) {
  debugger;
  return fetch(url);
}


asyncGetProduct(renderCart);
getPromise(456);
makeGETRequest(REQUEST_URLS.getGoodById)
  .then(dJSON => JSON.parse(dJSON))
  .then(productData => new Product(123, productData.product_name, productData.product_price))
  .then(product => cart.add(product))
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    cart.render();
  });

fetchRequest(REQUEST_URLS.getGoodById)
  .then(dJSON => dJSON.json())
  .then(productData => new Product(123, productData.product_name, productData.product_price))
  .then(product => cart.add(product))
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    cart.render();
  });