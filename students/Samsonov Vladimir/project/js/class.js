// Создаём класс товара
class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.image = 'https://placehold.it/200x150';
        this.id = id;
        this.cartimg = 'https://placehold.it/100x80';
    }
    render() {
        return `<div class="product-item">
                    <img src="${this.image}" alt="Some img">
                    <div class="desc">
                        <h3>${this.title}</h3>
                        <p>${this.price} $</p>
                        <button class="buy-btn" 
                        data-id="${this.id}"
                        data-name="${this.title}"
                        data-image="${this.cartimg}"
                        data-price="${this.price}">Купить</button>
                    </div>
                </div>`;
    }
}


// Создаём класс для списка товаров
class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Mouse Pad', price: 50, id: 1 },
            { title: 'Mouse', price: 150, id: 2 },
            { title: 'Keyboard', price: 200, id: 3 },
            { title: 'Monitor', price: 350, id: 4 },
            { title: 'PC Case', price: 100, id: 5 },
            { title: 'CPU i9', price: 1000, id: 6 },
            { title: 'RAM', price: 500, id: 7 },
            { title: 'Graphics card', price: 800, id: 8 },
        ];
    }
    // 2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
    _totalPrice() {
        let totalPrice = 0;
        this.goods.forEach(item => totalPrice += item.price);
        return totalPrice;
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.id);
            listHtml += goodItem.render();
        });
        document.querySelector('.products').innerHTML = listHtml;
    }
}

//Создаём класс коризны товаров
class Cart {
    constructor() {
    }

    _title() {
    }

    render() {
        // return `<div class="cart-item" data-id="${this.id}">
        //             <div class="product-bio">
        //                 <img src="${this.cartimg}" alt="Some image">
        //                 <div class="product-desc">
        //                     <p class="product-title">${this.title}</p>
        //                     <p class="product-quantity">Quantity: </p>
        //                     <p class="product-single-price">$${this.price} each</p>
        //                 </div>
        //             </div>
        //             <div class="right-block">
        //                 <p class="product-price">${this.price}</p>
        //                 <button class="del-btn" data-id="${this.id}">&times;</button>
        //             </div>
        //         </div>`;
    }

}

const list = new GoodsList();
list.fetchGoods();
list.render();
console.log(list._totalPrice());


//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
});

// //кнопки покупки товара (добавляется один раз)
// let addToCartBtn = document.querySelectorAll('.buy-btn');

// addToCartBtn.forEach(function (btn) {
//     btn.addEventListener ('click', addToCart)
// });


// function addToCart() {
//     let cartItem = new Cart ('title', 'price', 'id');
//     new Cart().goods.push (cartItem);
//     console.log(new Cart);
// }
