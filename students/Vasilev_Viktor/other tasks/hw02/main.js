// 3. * Некая сеть фастфуда предлагает несколько видов гамбургеров:
// a. Маленький (50 рублей, 20 калорий).
// b. Большой (100 рублей, 40 калорий).

// Гамбургер может быть с одним из нескольких видов начинок (обязательно):
// a. С сыром (+10 рублей, +20 калорий).
// b. С салатом (+20 рублей, +5 калорий).
// c. С картофелем (+15 рублей, +10 калорий).

// Дополнительно гамбургер можно:
// a. Посыпать приправой (+15 рублей, +0 калорий);
// b. Полить майонезом (+20 рублей, +5 калорий).

// Напишите программу, рассчитывающую стоимость и калорийность гамбургера. Можно
// использовать примерную архитектуру класса со следующей страницы, но можно использовать
// и свою.

'use strict';

class Hamburger {
  constructor (burgerSize, stuffing, topping) {
    this.burgerSize = Hamburger._getDataFromRadio(burgerSize);
    this.stuffing = Hamburger._getDataFromRadio(stuffing);
    this.topping = this._getDataFromCheckboxes(topping);
    this._burgerParts = this._setAllBurgerParts();
  }

  static _getDataFromRadio(domElementName) {
    return document.querySelector(`input[name="${domElementName}"]:checked`).value;
  }

  _getDataFromCheckboxes(domElementName) {
    let data = [];
    let $elements = [...document.querySelectorAll(`input[name="${domElementName}"]:checked`)];
    $elements.forEach($element => data.push($element.value));
    return data;
  }

  get totalPrice() {
    return this._getDesiredData('price');
  }

  get totalCalories() {
    return this._getDesiredData('calories');
  }

  _getDesiredData(desiredData) {
    let data = null;
    this._getBurgerPartNames().forEach(partName => data += this._getDataFromBurgerPart(partName, desiredData));
    return data;
  }

  _getBurgerPartNames() {
    return [
      this.burgerSize,
      this.stuffing,
      ...this.topping,
    ];
  }

  _getDataFromBurgerPart(partName, desiredData) {
    let burgerPartIdx = this._burgerParts.findIndex(burgerPart => burgerPart.name === partName);
    return this._burgerParts[burgerPartIdx][desiredData];
  }

  _setAllBurgerParts() {
    let burgerParts = [];
    Hamburger._getAllowedBurgerParts().forEach(partData => burgerParts.push(Hamburger._createBurgerPart(...partData)));
    return burgerParts;
  }

  static _getAllowedBurgerParts() {
    return [
      ['small', 50, 20],
      ['big', 100, 40],
      ['cheese', 10, 20],
      ['salad', 20, 5],
      ['potato', 15, 10],
      ['spice', 15, 0],
      ['sauce', 20, 5],
    ];
  }

  static _createBurgerPart(name, price, calories) {
    return {
      name: name,
      price: price,
      calories: calories,
    };
  }
}

document.querySelector('.calc-btn').addEventListener('click', () => calcBtnClickHandler());

const calcBtnClickHandler = function () {
  let burger = new Hamburger('burgerSize', 'stuffing', 'topping');

  document.querySelector('.price').innerText = burger.totalPrice;
  document.querySelector('.calories').innerText = burger.totalCalories;
};
