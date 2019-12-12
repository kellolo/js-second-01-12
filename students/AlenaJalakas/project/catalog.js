class CatalogItem {
    constructor(title, price, img, button) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render(){
        return `<div class="catalog__item">
            <img class="catalog__item_img" src="${this.img}" alt="#">
            <p class="catalog__item_name">${this.title}</p>
            <p class="catalog__item_price">Price: ${this.price}</p>
            <button id="1" class="catalog__item_button">Add to cart</button></div>`;
    }
}


 class CatalogList {
     constructor(){
         this.goods = [];
     }
     fetchGoods() {
         this.goods = [
             {title: 'Shirt', price: 90, img: 'img/shirt.jpeg'},
             {title: 'Dress', price: 150, img: 'img/dress.jpeg'},
             {title: 'Boots', price: 280, img: 'img/boots.jpeg'},
             {title: 'Coat', price: 250, img: 'img/coat.jpeg'},
         ];
     }
     render() {
         let listHtml = ' ';
         this.goods.forEach(item => {
             const product = new CatalogItem(item.title, item.price, item.img, item.button);
             listHtml += product.render();
         });
         document.querySelector('.catalog').innerHTML = listHtml;
     }
 }

 const list = new CatalogList();
list.fetchGoods();
list.render();


  class BasketList {
      constructor() {
          this.items = []
      }


      calculate() {
          //
      }

      viewCart(){
          //
      }

}

class BasketItem {
    constructor() {
        this.item = new CatalogItem()
    }

}