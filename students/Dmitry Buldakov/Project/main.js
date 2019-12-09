const products = [
  {id: 1, title: 'Notebook', price: 20000},
  {id: 2, title: 'Mouse', price: 1500},
  {id: 3, title: 'Keyboard', price: 5000},
  {id: 4, title: 'Gamepad', price: 4500},
];

let [ , T, P] = products;

const renderProduct = (T, P) => {
  return `<div class="product-item">
            <h3>${T}</h3>
            <p>${P}</p>
          </div>`;
};

const renderProducts = goodsList => {
  const productsList = goodsList.map(good => renderProduct(good.title, good.price));
  document.querySelector('.products').innerHTML = productsList.join(" ");
};

renderProducts(products);
/**
*Запятая выводилась из-за того, что товары являются элементами массива "products";
*Убрать или заменить запятую на другой знак можно оператором join();
**/
