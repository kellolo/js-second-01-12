// Это мой код полностью и тольео для корзины, дублировние ключа элемента и id 
// в объекте для облегчения поиска элемента и получения id из выбранного элемента
// 
// Типа JSON полученный с сервера
let goods = JSON.stringify({
  1194: {
    id: 1194,
    name: "Наименование товара №1",
    image: "layer_2_1194",
    rate: 5,
    price: 472
  },
  1202: {
    id: 1202,
    name: "Наименование товара №2",
    image: "layer_3_1202",
    rate: 6,
    price: 332
  },
  1210: {
    id: 1210,
    name: "Наименование товара №3",
    image: "layer_4_1210",
    rate: 7,
    price: 352
  },
  1241: {
    id: 1241,
    name: "Наименование товара №4",
    image: "layer_5_1241",
    rate: 8,
    price: 252
  },
  1249: {
    id: 1249,
    name: "Наименование товара №5",
    image: "layer_6_1249",
    rate: 9,
    price: 32
  },
  1257: {
    id: 1257,
    name: "Наименование товара №6",
    image: "layer_7_1257",
    rate: 10,
    price: 62
  },
  1265: {
    id: 1265,
    name: "Наименование товара №7",
    image: "layer_8_1265",
    rate: 10,
    price: 52
  },
  1273: {
    id: 1273,
    name: "Наименование товара №8",
    rate: 1,
    image: "layer_9_1273",
    price: 152
  }
});


// Работа c корзиной
let cart = {

  goods: {},
  goodsInCart: {},
  totalPrice: "$0.00",

  init(goods) {
    this.goods = JSON.parse(goods);
  },

  addToCart(productId) {
    if (this.goodsInCart.hasOwnProperty(productId)) {
      this.goodsInCart[productId].quantity++;
      cartInPage.replaceToCart(this.goodsInCart[productId]);
      cartInPage.renewTotalPrice(this.getTotalPrice());      
    } else {
      this.goodsInCart[productId] = this.goods[productId];
      this.goodsInCart[productId].quantity = 1;
      cartInPage.addToCart(this.goodsInCart[productId]);
      cartInPage.renewTotalPrice(this.getTotalPrice());
    }
  },

  deleteFromCart(productId) {
    delete this.goodsInCart[productId];
  },

  getTotalPrice() {
    let prices = 0;
    for (let key in this.goodsInCart) {
      prices += this.goodsInCart[key].price * this.goodsInCart[key].quantity;
    }
    this.totalPrice = '$' + prices + '.00';
    return this.totalPrice;
  }

};

// Закидываем полученный JSON в объект корзины
cart.init(goods);

let cartInPage = {

  //Блок корзины
  cartBlock: false,

  init(cartId) {
    this.cartBlock = document.getElementById(cartId);
  },

  addToCart(productObj) {
    this.cartBlock.appendChild(this.createCard(productObj));
  },

  replaceToCart(productObj) {
    this.cartBlock.replaceChild(this.createCard(productObj), document.getElementById(productObj.id));
  },

  createCard(productObj) {

    let productCard = document.createElement("div");
    productCard.classList.add("cart__goodin");
    productCard.id = productObj.id;

    let productOverwrite = document.createElement("div");
    productOverwrite.classList.add("overwrite", "cart__overwrite");

    let overwriteHeader = document.createElement("div");
    overwriteHeader.classList.add("overwrite__header");
    overwriteHeader.append(productObj.name);
    
    let overwriteRate = document.createElement("div");
    overwriteRate.classList.add("overwrite__rate");
    overwriteRate.appendChild(this.showRateByStars(productObj.rate));

    let overwriteQuant = document.createElement("div");
    overwriteQuant.classList.add("overwrite__quant");
    let price = '$' + productObj.price + '.00';
    overwriteQuant.append(productObj.quantity + " x " + price);

    productOverwrite.appendChild(overwriteHeader);
    productOverwrite.appendChild(overwriteRate);
    productOverwrite.appendChild(overwriteQuant);

    let productImage = document.createElement("img");
    productImage.src = "img/goods/" + productObj.image + ".jpg";
    productImage.alt = productObj.name;

    let productDelete = document.createElement("div");
    productDelete.classList.add("cart__delete");

    let button = document.createElement("button");
    button.classList.add("cart__delete_btn");
    button.onclick = function() {
      deleteFromCart(productObj.id);
    };

    let sign = document.createElement("i");
    sign.classList.add("fa", "fa-times-circle");
    sign.setAttribute("aria-hidden", "true");

    button.appendChild(sign);
    productDelete.appendChild(button);

    productCard.appendChild(productImage);
    productCard.appendChild(productOverwrite);
    productCard.appendChild(productDelete);

    return productCard;
  },

  renewTotalPrice(total) {
    document.getElementById("cart_total").textContent = total;
  },

  showRateByStars(rate) {
    let rateWrapper = document.createElement("span");
    for (let i = 1; i < 6; i++) {
      let star = document.createElement("i");
      let step = i * 2;
      if (rate >= step) {
        star.classList.add("fa", "fa-star");
      } else if (rate == (step - 1)) {
        star.classList.add("fa", "fa-star-half-o");
      } else if(rate < step) {
        star.classList.add("fa", "fa-star-o");
      }
      rateWrapper.appendChild(star);
    }
    return rateWrapper;
  },
  
  deleteFromCart(productId) {
    document.getElementById(productId).remove();
  }
  
};


// Корзина на странице
cartInPage.init("goods_in_cart");

// Слушаем кнопки добавления в корзину 
let productCard = document.querySelectorAll(".button__add");
for (let i = 0; i < productCard.length; i++) {
  productCard[i].addEventListener("click", function (event) {
    let button = event.target;
    let productId = button.dataset.product;
    cart.addToCart(productId);
    console.log(cart);
  });
}

function deleteFromCart(productId) {
  if(cart.goodsInCart[productId].quantity > 1) {
    cart.goodsInCart[productId].quantity--;
    cartInPage.replaceToCart(cart.goodsInCart[productId]);
    cartInPage.renewTotalPrice(cart.getTotalPrice()); 
  } else {
    cart.deleteFromCart(productId);
    cartInPage.deleteFromCart(productId);
    cartInPage.renewTotalPrice(cart.getTotalPrice());
  }  
}