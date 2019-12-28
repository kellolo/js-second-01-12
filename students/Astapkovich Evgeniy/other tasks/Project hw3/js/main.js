//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';

// const url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

// const items = ['Notebook', 'Display', 'Keyboard', 'Mouse', 'Phones', 'Router', 'USB-camera', 'Gamepad', 'something'];
// const prices = [1000, 200, 20, 10, 25, 30, 18, 24, 100500];
// const ids = [1, 2, 3, 4, 5, 6, 7, 8, 000];

class Catalog {
  constructor(container) {
    this.container = container
    // this.items = []
    // this._init()
    this.url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'

    // this._getProductsCallback(this.url) // вызов варианта с колбэком
    // this._getProductsPromise(this.url) // вызов варианта с Promise
    this._getProductsFetch(this.url) // вызов варианта с Fetch
  }

  _init() {
    //this.items = fetchData()
    //this._render()
  }

  /**
  *  Версия CALLBACK
  */
  _getProductsCallback(url) {
    let xhr = new XMLHttpRequest()
    function reqFunc() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log(xhr.responseText, xhr.readyState, xhr.status)
          let dJSON = xhr.responseText
          const items = JSON.parse(dJSON)
          this._render(items)
        } else {
          console.log('error, статус не 200')
        }
      }
    }
    xhr.onreadystatechange = reqFunc.bind(this)
    xhr.open('GET', url, true)
    xhr.send()

  }

    /**
    * Версия Promise + XHR
    */
   //dJSON => JSON.parse(dJSON)
  _getProductsPromise(url) {
    let arr = []
    this._makeGETRequest(url)
      .then(dJSON => JSON.parse(dJSON))
      .then(parsedData => { arr = parsedData })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        console.log('finally')
        this._render(arr)
      })
  }

  _makeGETRequest(url) {
    return new Promise((res, rej) => {
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log(xhr.responseText, xhr.readyState, xhr.status)
            res(xhr.responseText)
          } else {
            rej('error')
          }
        }
      }
      xhr.open('GET', url, true)
      xhr.send()
    })
  }

  /**
   * Версия с Fetch
   */
  _getProductsFetch(url) {
    let items = null
    let render = this._render.bind(this)
    this._fetchRequest(url)
      .then(resp => resp.json())
      .then(arr => {items = arr})
      .finally(function(){
        render(items)
      })
  }

  _fetchRequest(url) {
    return fetch(url)
  }

  _render(items) {
    let block = document.querySelector(this.container)
    let htmlStr = ''
    console.log(items)
    items.forEach(item => {
      let prod = new CatalogItem(item)
      htmlStr += prod.render()
    })

    block.innerHTML = htmlStr
  }
}

class CatalogItem {
  constructor(obj) {
    this.product_name = obj.product_name
    this.price = obj.price
    this.id_product = obj.id_product
    this.img = image
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

const catalog = new Catalog('.products')

//глобальные сущности корзины и каталога (ИМИТАЦИЯ! НЕЛЬЗЯ ТАК ДЕЛАТЬ!)
//var userCart = [];
//var list = fetchData ();

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

/*
* создание массива объектов - имитация загрузки данных с сервера
*/ 
// function fetchData() {
//   let arr = [];
//   for (let i = 0; i < items.length; i++) {
//     arr.push(createProduct(i));
//   }
//   return arr
// };

/*
* создание товара
*/ 
// function createProduct(i) {
//   return {
//     id_product: ids[i],
//     product_name: items[i],
//     price: prices[i],
//     img: image,
//   }
// };

//рендер списка товаров (каталога)
// function renderProducts() {
//     //let arr = [];
//     let str = ''
//     for (item of list) {
//         str += item.createTemplate()
//     }
//     document.querySelector('.products').innerHTML = str;
// }

// renderProducts();

//CART

class Cart {
  constructor() {
    this.products = [];
  }

  addProduct() { }
  removeProduct() { }
  renderCart() { }
}

class CartItem {
  constructor() {
    this.id = null;
    this.quantity = null;
  }
}


// Добавление продуктов в корзину
function addProduct(product) {
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
