//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';


class Catalog {
	constructor (container) {
		this.container = container;
		this.items = [];
		this._init (); 
    }
    /*-------------------способ получения данных через Fetch----------------------*/
	_init(){
		let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
  		this._fetchRequest (url)
  			.then(dJSON => dJSON.json()) 
  			.then(data => {this.items = data; this._render ();})
  			.catch(err => { 
  				console.log ('err');
  			})
  			.finally(() => { 
  				console.log (this.items);
	    });
	}

    _fetchRequest (url) {
  			return fetch (url);
  		}
  	/*---------------------------------------------------------------------*/

    /*-------------------способ получения данных через XMLHTTPRequest+Promise----------------------
	_init(){
		let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
  		this._makeGETRequest (url)
  			  .then(dJSON => JSON.parse(dJSON))
  			  .then(dataNotJSON => {this.items = dataNotJSON; this._render ();})
  			  .catch(err => { 
  				 console.log ('err');
  			  })
  			  .finally(() => { 
  				 //console.log (this.items);
  		});
	}
	_makeGETRequest (url) {
  		return new Promise ((res,rej) => {
  			let xhr = new XMLHttpRequest(); 

			xhr.onreadystatechange = function () { 

  				if (xhr.readyState === 4) { 

    				if (xhr.status === 200) { 
  						res(xhr.responseText); 
  					} else{
  						rej('error');
  					}
  				}	
  			}
  		xhr.open('GET', url, true); 
  		xhr.send();
  	    });
  	}
  	----------------------------------------------------------------------*/

/*-------------------способ получения данных через XMLHTTPRequest---------------

	_init(){
		let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
  		this._makeGetRequest (url, this);
	}
	
  	_makeGetRequest (url, obj) {
  		let xhr = new XMLHttpRequest(); 
		xhr.onreadystatechange = function () { 
  			if (xhr.readyState === 4) {  

    			if (xhr.status === 200) { 
    				obj.items = JSON.parse(xhr.responseText);
    				obj._render ();
  					} else{	
  					console.log('error');
  				}
  			}
  	    }
  		xhr.open('GET', url, true); 
  		xhr.send(); 
  	}

---------------------------------------------------------------------*/

	_render () {
		let block = document.querySelector (this.container);
		let htmlStr = '';
		this.items.forEach (item => {
			let prod = new CatalogItem(item);
			htmlStr += prod.render();
		});
		block.innerHTML = htmlStr;
	}
}


class CatalogItem {
	constructor (obj){
		this.product_name = obj.product_name;
		this.price = obj.price;
		this.id_product = obj.id_product;
		this.img = image;
	}
	render () {
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
let catalog = new Catalog ('.products');


//кнопка скрытия и показа корзины
document.querySelector('.btn-cart').addEventListener('click', () => {
    document.querySelector('.cart-block').classList.toggle('invisible');
    console.log(document.querySelector('.cart-block').classList);
});

/*
//кнопки удаления товара (добавляется один раз)
document.querySelector('.cart-block').addEventListener ('click', (evt) => {
   if (evt.target.classList.contains ('del-btn')) {
      userCart.contents.removeProduct (evt.target);
   }
});
//кнопки покупки товара (добавляется один раз)
document.querySelector('.products').addEventListener ('click', (evt) => {
    if (evt.target.classList.contains ('buy-btn')) {
        addProduct (evt.target);
    }
});
*/

//CART

class ShoppingCart {
	constructor (containerCart) {
		this.containerCart = containerCart;
		this.amount = null;
		this.countGoods = null;
		this.contents = [];
		this._initCart (); 
    }

	_initCart(){
		let url = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json';
  		this._fetchRequest (url)
  			.then(dJSON => dJSON.json()) 
  			.then(data => { this.contents=data.contents;
  							this.amount=data.amount;
  							this.countGoods=data.countGoods;
  				            this._renderCart();
  				        })
  			.catch(err => { 
  				console.log ('err');
  			})
  			.finally(() => { 
  				console.log (this.contents);
	    });
	}

    _fetchRequest (url) {
  			return fetch (url);
  		}
	_renderCart () {
		let cartBlok = document.querySelector(this.containerCart);
	    let allProducts = '';
	    this.contents.forEach (itemCart => {
			let prodInCart = new ShoppingCartItem (itemCart);
			allProducts += prodInCart.renderCart();
		});
	    cartBlok.innerHTML = allProducts;
	}
	 
	 //removeProduct () {}
	 //addProduct (product) {}

}


class ShoppingCartItem {
	constructor (obj){
		this.product_name = obj.product_name;
		this.price = obj.price;
		this.id_product = obj.id_product;
		this.img = cartImage;
		this.quantity = obj.quantity;
	}
	renderCart () {
		return `<div class="cart-item" data-id="${this.id_product}">
                            <div class="product-bio">
                                <img src="${this.img}" alt="Some image">
                                <div class="product-desc">
                                    <p class="product-title">${this.product_name}</p>
                                    <p class="product-quantity">Quantity: ${this.quantity}</p>
                                    <p class="product-single-price">$${this.price} each</p>
                                </div>
                            </div>
                            <div class="right-block">
                                <p class="product-price">${this.quantity * this.price}</p>
                                <button class="del-btn" data-id="${this.id_product}">&times;</button>
                            </div>
                        </div>`
	}
	
 
}
let userCart = new ShoppingCart (`.cart-block`);




