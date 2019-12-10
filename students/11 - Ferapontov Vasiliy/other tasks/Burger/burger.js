'use strict';

class Burger {
  constructor(size) {
    this.size = this._inputRadio(size) ;
    this.calory = this._caloryCalc();
    this.price = this._priceCalc();

  }

  _inputRadio (domElName) {
    return document.querySelector(`input[name="${domElName}"]:checked`).value;
  }

  labelRadio (domElName) {
    return document.querySelector(`input[name="${domElName}"]:checked`).parentNode;
  }
  labelCheckBox (domElName) {
    return document.querySelectorAll(`input[name="${domElName}"]:checked`);
  }

  _caloryCalc () {
    let result = 0;
    document.querySelectorAll('input:checked').forEach(function (el) {
      result += +el.dataset.calories;
    });
    return result;
  }

  _priceCalc () {
    let result = 0;
    document.querySelectorAll('input:checked').forEach(function (el) {
      result += +el.dataset.price;
    });
    return result;
  }
}
const btn = document.querySelector('button');
let burgers = [];

btn.addEventListener('click', addBurger);

function addBurger() {
  event.preventDefault();

  let newBurger = new Burger('size');
  let burgerFlavs = [];

  burgers.push(newBurger);
  console.log(burgers);
  newBurger.labelCheckBox('flavoring').forEach(function (el) {
    burgerFlavs.push(el.parentNode.innerText);
  });

  document.querySelector('.wrapper').insertAdjacentHTML('beforeend', `<section class="burger">
<div class="burger-size">${newBurger.labelRadio('size').innerText}</div>
<div class="burger-stuff">${newBurger.labelRadio('stuffing').innerText}</div>
<div class="burger-flav">${burgerFlavs.join()}</div>
<div class="burger-calory">${newBurger.calory}</div>
<div class="burger-price">${newBurger.price}</div>
</section>`);

  totalCalory();
  totalPrice();
}

function totalCalory() {
  let result = 0;
  document.querySelectorAll('.burger-calory').forEach(function (el) {
    result += +el.innerText;
  });
  document.querySelector('.total-calory').innerText = result;
}
function totalPrice() {
  let result = 0;
  document.querySelectorAll('.burger-price').forEach(function (el) {
    result += +el.innerText;
  });
  document.querySelector('.total-price').innerText = result;
}
