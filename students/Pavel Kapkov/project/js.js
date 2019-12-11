class ItemsList {
  constructor() {
    this.items = [];
  }

  fetchItems() {
    this.items = [
      {title: 'Notebook', price: 30000},
      {title: 'Mouse', price: 1500},
      {title: 'Keyboard', price: 5000},
      {title: 'Gamepad', price: 4500},
    ];
  }

  render() {
    return this.items.map((item) => new Item(item.title, item.price).render()).join('');
  }

  calcPriceSum(){
    let rezult = 0;
    for(let product of this.items){
      rezult += product.price;
    }
    return rezult;
  }
}

class Item {
  constructor(title, price, image = 'https://placehold.it/200x150') {
    this.price = price;
    this.title = title;
    this.image = image;
  }

  render() {
    return `<div class="product-item">
            <img src='${this.image}' alt = "image">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <button class="by-btn">Добавить в корзину</button>
          </div>`;
  }
}

class Cart {
  constructor(){
    this.addProducts = []; //добавленные продукты
  }
  addToCart(){   //Метод добавления продуктов

  }
  delFromCart(){  //Метод удаления продуктов

  }
  render (){    //Отображение корзины

  }

}

class CartProduct {
  constructor(title, price, image = 'https://placehold.it/150x100'){  // добавляем свойства к товарам находящимся в корзине
    this.title = title;
    this.price = price;
    this.image = image;
  }
  render(){       // отображаем карточки товара в корзине, меняя кнопку добавления товара на кнопку удаления товара из корзины
    return `<div class="cart_product">
            <img src='${this.image}' alt = "image">
            <h3>${this.title}</h3>
            <p>${this.price}</p>
            <button class="del-btn">Удалить</button>
          </div>`;
  }
}

const items = new ItemsList();
items.fetchItems();

document.querySelector('.products').innerHTML = items.render();