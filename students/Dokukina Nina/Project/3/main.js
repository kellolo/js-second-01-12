class ProductItem {
  constructor(product, img = 'https://placehold.it/200x150') {
    this.product_name = product.product_name;
    this.price = product.price;
    this.id_product = product.id_product;
    this.img = img;
  }

  render() {
    return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.product_name}</h3>
                    <p>${this.price} р.</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`;
  }
}

class ProductList {
  constructor(container = '.products') {
    this.container = container;
    this.goods = [];
    this.allProducts = [];
    this._fetchProducts();
    this._render();
    // this._sumPrice();
  }

  _fetchProducts() {
    // this.goods = [
    //   {id_product: 1, product_name: 'Notebook', price: 40000},
    //   {id_product: 2, product_name: 'Mouse', price: 1000},
    //   {iid_product: 3, product_name: 'Keyboard', price: 2500},
    //   {iid_product: 4, product_name: 'Gamepad', price: 1500},
    // ];
    
    let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
    let dataFromWeb = []
        function fetchRequest (url) {
          return fetch (url)
        }
    
      fetchRequest (url)
          .then (dJSON => dJSON.json ())
          .then (data => {
              dataFromWeb = data;
          })
          .finally (() => {
            return dataFromWeb;
          });
  }

  _render() {
    const block = document.querySelector(this.container);

    for (let product of this.goods) {
      const productObject = new ProductItem(product);
      this.allProducts.push(productObject);
      block.insertAdjacentHTML('beforeend', productObject.render());
    }
  }
  _sumPrice() { 
    let sum = 0;
    for (const good of this.goods) {
      sum += good.price;
    } 
    console.log(sum);
  }
}

class Cart {
  constructor() {
    // свойства: CartList - массив из списка товаров, находящихся в корзине
  }
  render() {
    // метод: пересчитывающий корзину, вызывается каждый раз после добавления товара в корзину
    // или увеличения/уменьшения количества товара в корзине
  }
  cartClear() {
    // очистить корзину, т.е. полностью удалить все товары
  }
}

class CartItem {
  constructor() {
    //свойства: id, title, price, quantity
  }
  addToCart() {
    // добавить в корзину, если такой товар уже есть, то увеличить кол-во
  }
  removeFromCart() {
    // уменьшить кол-во. Если остался последний элемент этого товара, то удалить из корзины
  } 
}
const list = new ProductList();


