"use strict";

// Из-а того что вся информация (размер, наполнение, топпинги, цены, калории)
// хранится в HTML не вижу смысла описывать для бургера класс.
// Если же эта информация будет подгружаться на страницу из объекта,
// (тем паче если объект будет приходить с сервера), тогда класс безусловно нужен.

let burgerPrice = 0;
let burgerCals = 0;

function selectSize() {
  switch (this.id) {
    case 'burgerSmall':
      document.getElementById('burgerImg').src = 'burger_small.png';
      break;
    case 'burgerMedium':
      document.getElementById('burgerImg').src = 'burger_medium.png';
      break;
    case 'burgerBig':
      document.getElementById('burgerImg').src = 'burger_big.png';
  }
  burgerCalc();
}

function burgerCalc() {
  // Собираем информацию о содержимом бургера
  burgerPrice = 0;
  burgerCals = 0;
  document.getElementsByName('burgerSize').forEach(
    el => {
      if (el.checked) {
        burgerCals += +el.dataset.calories;
        burgerPrice += +el.dataset.price;
      }
    });
  document.getElementsByName('filling').forEach(
    el => {
      if (el.checked) {
        burgerCals += +el.dataset.calories;
        burgerPrice += +el.dataset.price;
      }
    });
  document.getElementsByName('topping').forEach(
    el => {
      if (el.checked) {
        burgerCals += +el.dataset.calories;
        burgerPrice += +el.dataset.price;
      }
    });
  document.getElementById('caloriesShow').innerText = `Calories: ${burgerCals}`;
  document.getElementById('priceShow').innerText = `Price: ${burgerPrice} rub`;
}

function submitBurger() {
  alert(`Сей вкусный бургер доставит в ваш организм ${burgerCals} калорий всего за ${burgerPrice} рублей.`)
}

//////////////////////////

document.getElementsByName('burgerSize').forEach(el => {
  el.addEventListener('click', selectSize);
});
document.getElementsByName('filling').forEach(el => {
  el.addEventListener('click', burgerCalc);
});
document.getElementsByName('topping').forEach(el => {
  el.addEventListener('click', burgerCalc);
});
document.getElementById('submitOrder').addEventListener('click', submitBurger);
burgerCalc();
