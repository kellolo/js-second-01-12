const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
let urlGeek = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

class Catalog {
  constructor(container) {
    this.container = container
    this._init()
  }

  _init() {
    this._fetchRequest(`${urlGeek}/catalogData.json`)
      .then(dJSON => dJSON.json())
      .then(data => {
        this.data = data
      })
      .finally(() => {
        this._render()
      })
  }

  _fetchRequest(url) {
    return fetch(url)
  }

  _render() {
    let block = document.querySelector(this.container)
    let htmlStr = ''
    this.data.forEach(data => {
      let prod = new CatalogItem(data)
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
            </div>`
  }
}

class Cart {
  constructor() {
    this.userCart = [];
  }
  // Добавление продуктов в корзину
  addProduct(product) {
    let productId = +product.dataset['id']; //data-id="1"
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
      allProducts += `
      <div class="cart-item" data-id="${el.id}">
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
      </div>
      `
    }
    document.querySelector(`.cart-block`).innerHTML = allProducts;
    this._calcTotalPrice();
  }
  _calcTotalPrice() {
    if (this.userCart.length > 0) {
      let result = 0;
      for (let elem of this.userCart) {
        result += elem.price * elem.quantity
      }
      this._renderTotalPrice(result);
    }
  }
  _renderTotalPrice(result) {
    document.querySelector(`.cart-block`).insertAdjacentHTML('beforeend', `<span>Total price: ${result}</span>`);
  }
}

let catalog = new Catalog('.products');
let cart = new Cart();


//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
  document.querySelector('.cart-block').classList.toggle('invisible');
});
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('del-btn')) {
    cart.removeProduct(evt.target);
  }
})
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener('click', (evt) => {
  if (evt.target.classList.contains('buy-btn')) {
    cart.addProduct(evt.target);
  }
})

    //callback

    // _init() {
    //     this.data = this._fetchData ( () => {
    //         this._render()
    //     })        
    // }    

    // _makeGETRequest (url, callback) {
    //     let xhr = new XMLHttpRequest() 
    //     xhr.onreadystatechange = function () {
    //         if (xhr.readyState === 4) {
    //             callback(xhr.responseText)
    //         }
    //     }  
    //     xhr.open('GET', url, true)
    //     xhr.send()
    // }

    // _fetchData (fdd) {
    //     this._makeGETRequest (`${urlGeek}/catalogData.json`, (data) => {
    //         this.data = JSON.parse (data)           
    //         fdd()
    //     }) 
    // }


//promise

    // _init () {
    //     this._makeGETRequest (`${urlGeek}/catalogData.json`)
    //         .then (dJSON => JSON.parse (dJSON))
    //         .then (dataNotJSON => {this.data = dataNotJSON})
    //         .catch (err => {
    //             console.log (err)
    //         })
    //         .finally ( () => {                
    //             this._render()
    //         })
    // }

    // _makeGETRequest (url) {
    //     return new Promise ((res, rej) => {
    //         let xhr = new XMLHttpRequest ()
    //         xhr.onreadystatechange = function () {
    //             if (xhr.readyState === 4) {
    //                 if (xhr.status === 200) {
    //                     res (xhr.responseText)
    //                 } else {
    //                     rej ('error')
    //                 }
    //             }
    //         }
    //         xhr.open('GET', url, true)
    //         xhr.send()
    //     })
    // }
    // https://sun9-59.userapi.com/c635106/v635106394/34213/nNZtm1Jj9xw.jpg
