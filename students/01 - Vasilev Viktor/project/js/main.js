//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';


class Catalog {
  constructor(container) {
    this.container = container;
    this.items = [];
    this.fetchItems();
  }

  // // via callback
  //
  // callbackGETRequest(url, callback) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', url);
  //
  //   xhr.onreadystatechange = function () {
  //     if (xhr.readyState === XMLHttpRequest.DONE) {
  //       if (xhr.status !== 200) {
  //         console.error('server response is not 200 OK');
  //       } else {
  //         const parsedData = JSON.parse(xhr.responseText);
  //         callback(parsedData);
  //       }
  //     }
  //   };
  //
  //   xhr.send();
  // };
  //
  // fetchItems() {
  //   const catalogUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
  //   this.callbackGETRequest(catalogUrl, data => {
  //     catalog.items = data;
  //     this._render();
  //   });
  // }

  // // via promise
  //
  // promiseGETRequest(url) {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', url);
  //
  //     xhr.onreadystatechange = function () {
  //       if (xhr.readyState === XMLHttpRequest.DONE) {
  //         if (xhr.status !== 200) {
  //           reject('server response is not 200 OK');
  //         } else {
  //           resolve(xhr.responseText);
  //         }
  //       }
  //     };
  //
  //     xhr.send();
  //   });
  // };
  //
  // fetchItems() {
  //   const catalogUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
  //   this.promiseGETRequest(catalogUrl)
  //     .then(data => JSON.parse(data))
  //     .then(parsedData => {
  //       this.items = parsedData;
  //       this._render();
  //     })
  //     .catch(error => console.error(error));
  // }

  // via fetch

  fetchItems() {
    const catalogUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
    fetch(catalogUrl)
      .then(data => data.json())
      .then(parsedData => {
        this.items = parsedData;
        this._render();
      })
      .catch(error => console.error(error));
  }

  _render() {
    let block = document.querySelector(this.container);
    let htmlStr = '';
    this.items.forEach(item => {
      let prod = new CatalogItem(item);
      htmlStr += prod.render();
    });
    block.innerHTML = htmlStr
  }
}

class CatalogItem {
  constructor(obj) {
    this.product_name = obj.product_name;
    this.price = obj.price;
    this.id_product = obj.id_product;
    this.img = image;
  }

  render() {
    return `
            <div class="product-item" data-id="${this.id_product}">
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
            </div>
        `
  }
}

let catalog = new Catalog('.products');

//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('del-btn')) {
    removeProduct(evt.target);
  }
});
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('buy-btn')) {
    addProduct(evt.target);
  }
});

//CART

// Добавление продуктов в корзину
function addProduct(product) {
  let productId = +product.dataset['id']; //data-id="1"
  let find = userCart.find(element => element.id === productId); //товар или false
  if (!find) {
    userCart.push({
      name: product.dataset ['name'],
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

//удаление товаров
function removeProduct(product) {
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

//перерендер корзины
function renderCart() {
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