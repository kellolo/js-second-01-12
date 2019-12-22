"use strict";

function formClick(event) {
  let target = event.target;
  switch (target.name) {
    case "burger-type":
      setActiveBurger(target.value);
      break;
    case "mix-button":
      event.preventDefault();
      cart.addBurger(new Burger("burger-type", "topping-type"));
      cart.render();
      break;
  }
}

function setActiveBurger(burgerType) {
  let burgerImgEl = document.querySelector("[name='burger-image']");
  switch (burgerType) {
    case "burger-slave":
      burgerImgEl.classList.remove("burger_kingsize");
      burgerImgEl.classList.add("burger_slave");
      break;
    default:
      document.querySelector("[name='burger-type'][value='burger-kingsize']").checked = true;
      burgerImgEl.classList.remove("burger_slave");
      burgerImgEl.classList.add("burger_kingsize");
      break;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let burgerForm = document.forms["burger-form"];
  burgerForm.addEventListener("click", formClick);
  setActiveBurger();
});



class Burger {
  constructor(burger, toppings) {
    this.burger = this._inputRadio(burger);
    this.toppings = this._inputCheck(toppings);
  }
  _input(domElementName) {
    let el = document.querySelector(`input[name="${domElementName}"]`);
    return {
      text: el.dataset.text,
      value: el.value,
      price: el.dataset.price,
      calories: el.dataset.calories,
    }
  }
  _inputRadio(domElementName) {
    let el = document.querySelector(`input[name="${domElementName}"]:checked`);
    return {
      text: el.dataset.text,
      value: el.value,
      price: +el.dataset.price,
      calories: +el.dataset.calories,
    }
  }
  _inputCheck(domElementName) {
    let toppings = []
    let arr = [...document.querySelectorAll(`input[name="${domElementName}"]:checked`)]
    arr.forEach(el => {
      toppings.push({
        value: el.value,
        text: el.dataset.text,
        price: +el.dataset.price,
        calories: +el.dataset.calories,
      });
    })
    return toppings;
  }

  render() {
    let burgerClass = this.burger.value === "burger-slave" ? "burger_slave" : "burger_kingsize";
    let toppingsHTML = "";
    if (this.toppings) {
      toppingsHTML = this.toppings.map((topping) =>
        `<div class="burger__topping">
          <div class="topping__header">${topping.text}</div>
          <div class="topping__coast">${topping.price}р. </div>
          <div class="topping__calories">${topping.calories} Ккал</div>
         </div>
         `
      ).join("");

    }
    return `
      <div class="burger">
        <div class="burger__image ${burgerClass}"></div>
        <div class="burger__toppings">${toppingsHTML}
          <div class='burger__coast'>Стоимость бургера: ${this.getCoast()} р</div>
          <div class='burger__calories'>Калорийность бургера: ${this.getCalories()} р</div>
        </div>
      </div>
    `;
  }
  getCoast() {
    let totalPrice = this.burger.price;
    if (this.toppings.length > 0) {
      totalPrice += this.toppings.map((a) => a.price).reduce((a, b) => a + b);
    }
    return totalPrice;
  }
  getCalories() {
    let totalCalories = this.burger.calories;
    if (this.toppings.length > 0) {
      totalCalories += this.toppings.map((a) => a.calories).reduce((a, b) => a + b);
    }
    return totalCalories;
  }
}


class BurgersCart {
  constructor() {
    this.burgers = [];
  }
  addBurger(burger) {
    this.burgers.push(burger);
  }
  render() {
    let cont = "";
    let totalCost = 0;
    let totalCalories = 0;
    for (let burger of this.burgers) {
      cont += burger.render();
      totalCost += burger.getCoast();
      totalCalories += burger.getCalories();
    }
    document.querySelector("[name='cart']").innerHTML =
      `<div class="cart__content">${cont}</div><div class="cart__coast">Итого: ${totalCost} р. (${totalCalories} Ккал)</div>`;
  }
}


let cart = new BurgersCart();