class CatalogItem {
    constructor(title, price, img, button) {
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `<div class="catalog__item">
            <img class="catalog__item_img" src="${this.img}" alt="#">
            <p class="catalog__item_name">${this.title}</p>
            <p class="catalog__item_price">Price: ${this.price}</p>
            <button id="1" class="catalog__item_button">Add to cart</button></div>`;
    }
    addItemToBasket() {

    }
}

class CatalogList {
    constructor() {
        this.goods = [];

        this.fetchGoods()
            .then(() => this.render());
    }

    fetchGoods() {
        return fetch(`https://raw.githubusercontent.com/AlenaJalakas/shop/master/catalog.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data];
            })
            .catch(error => console.log(error));
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




//  Basket

class BasketItem {
    constructor(title, img, quantity) {
        this.title = title;
        this.img = img;
        this.quantity = quantity;
    }
    render() {
        return `<div class="basket__item">
            <p class="basket__item_name">${this.title}</p>
            <img class="basket__item_img" src="${this.img}" alt="#">
            <p class="basket__item_quantity">${this.quantity}</p>`;
    }
}



class BasketList {
    constructor(price, totalAmount) {

        this.shopItems = [];
        this.price = price;
        this.totalAmount = this.calculateTotal()
        this.fetchBasket()
            .then(() => this.render());

    }

    fetchBasket() {
        return fetch(`https://raw.githubusercontent.com/AlenaJalakas/shop/master/basketPreview.json`)
            .then(result => result.json())
            .then(data => {
                this.shopItems = data.contents;
            })
            .catch(error => console.log(error));
    }

    render() {
        let listHtml = ' ';
        for (let i = 0; i < this.shopItems.length; i++) {

            const shopProduct = new BasketItem(this.shopItems[i].title, this.shopItems[i].img, this.shopItems[i].quantity);
            listHtml += shopProduct.render();
        }
        document.querySelector('.basket__preview_block').innerHTML = listHtml;


    }
    removeItem() {
        //
    }
    calculateTotal() {
        //
    }
    checkOut() {
        //
    }
}




const basket = new BasketList();
const list = new CatalogList();
