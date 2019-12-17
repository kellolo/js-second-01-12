//заглушки (имитация базы данных)
const image = "https://placehold.it/200x150";
const cartImage = "https://placehold.it/100x80";


let userCart = [];
let list = fetchData();

// Загрузка данных callback
// function fetchData() {
// 	const xhr = new XMLHttpRequest();
// 	const url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";
// 	xhr.onreadystatechange = function () {
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			list = JSON.parse(xhr.response);
// 			renderProducts();
// 			getTotalPrice();
// 		}
// 	}
// 	xhr.open("GET", url, true);
// 	xhr.send();
// }

// Загрузка данных через promise
// function fetchData() {
// 	let promise = new Promise(function (res, rej) {
// 		const xhr = new XMLHttpRequest();
// 		const url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";

// 		xhr.open("GET", url, true);
// 		xhr.send();
// 		xhr.addEventListener("load", function () {
// 			if (xhr.readyState === 4 && xhr.status === 200) {
// 				res(xhr.response);
// 			} else {
// 				rej("Error loading data...")
// 				"Error loading data..."
// 			}
// 		})
// 	});

// 	promise
// 		.then(function (data) {
// 			list = JSON.parse(data);
// 			renderProducts();
// 			getTotalPrice();
// 		})
// }

// Загрузка данных через fetch
function fetchData() {
	const url = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json";
	fetch(url)
		.then(function (data) {
			return data.json();
		})
		.then(function (data) {
			list = data;
			renderProducts();
			getTotalPrice();
		})
}

//рендер списка товаров (каталога)
function renderProducts() {
	let catalogEl = document.querySelector(".products");
	let str = "";
	catalogEl.innerHTML = "";
	for (item of list) {
		str += `<div class="product-item" data-id="${item.id_product}">
                        <img src="${image}" alt="Some img">
                        <div class="desc">
                            <h3>${item.product_name}</h3>
                            <p>${item.price} $</p>
                            <button class="buy-btn" 
                            data - id = "${item.id_product}"
                            data - name = "${item.product_name}"
                            data - image = "${image}"
                            data - price = "${item.price}">Купить</button>
                        </div>
                    </div>`;
	}
	catalogEl.innerHTML = str;
}

//Определение общей стоимости продуктов
function getTotalPrice() {
	let total = 0;
	for (item of list) {
		total += item.price;
	}
	renderTotalPrice(total);
}

// Вывод стоимости всех товаров в каталоге
function renderTotalPrice(total) {
	document
		.querySelector(".products")
		.insertAdjacentHTML(
			"beforebegin",
			`<p class="toal-price">Общая стоимость товаров к каталоге: ${total} $</p>`
		);
}

// CART

// Класс корзины
class Cart {
	constructor() {}

	// Очистка корзины
	clearCart() {}

	// Общая стоимость товаров в корзине
	totalPrice() {}
}

// Класс товара в корзине
class GoodsInCart {
	constructor() {}

	// Увеличение колиечства товара в корзине
	quantityUp() {}

	// Уменьшение количества товара в корзине
	quantityDown() {}

	// Удаление товара из корзины
	removeGoodFromCart() {}
}