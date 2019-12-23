"use strict";

// Переделал с классами (всётаки тема задания - классы)

class Burger {
  constructor(sz = 'medium', fill = 'cheese', topp = []) {
    this.sizes = [['big', 100, 40], ['medium', 30, 75], ['small', 20, 50]];
    this.fillings = [['cheese', 10, 20], ['salad', 20, 5], ['potato', 15, 10]];
    this.toppings = [['spice', 0, 15], ['mayo', 5, 20]];
    this.size = '';
    this.setSize(sz);
    this.filling = '';
    this.setFilling(fill);
    this.topping = [];
    topp.forEach(el => {
      this.addTopping(el)
    });
  };

  setSize(newSize) {
    switch (newSize) {
      case 'big':
      case 'small':
        this.size = newSize;
        return;
      default:
        this.size = 'medium';
    }
  };

  setFilling(newFill) {
    switch (newFill) {
      case 'salad':
      case 'potato':
        this.filling = newFill;
        return;
      default:
        this.filling = 'cheese';
    }
  };

  addTopping(theTopping) {
    switch (theTopping) {
      case 'spice':
      case 'mayo':
        if (!this.topping.includes(theTopping)) {
          this.topping.push(theTopping);
        }
        return;
    }
  };

  removeTopping(theTopping) {
    if (this.topping.includes(theTopping)) {
      this.topping.splice(this.topping.indexOf(theTopping), 1);
    }
  };

  getPrice() {
    let price = 0;
    this.sizes.forEach(el => {
      if (el[0] === this.size) {
        price += el[2]
      }
    });
    this.fillings.forEach(el => {
      if (el[0] === this.filling) {
        price += el[2]
      }
    });
    this.fillings.forEach(el => {
      if (this.topping.includes(el[0])) {
        price += el[2]
      }
    });
    return price;
  };

  getCalories() {
    let calories = 0;
    this.sizes.forEach(el => {
      if (el[0] === this.size) {
        calories += el[1]
      }
    });
    this.fillings.forEach(el => {
      if (el[0] === this.filling) {
        calories += el[1]
      }
    });
    this.fillings.forEach(el => {
      if (this.topping.includes(el[0])) {
        calories += el[1]
      }
    });
    return calories;
  };
}

let theBurger = new Burger();

function burerToHTML(burg) {

}

function selectSize() {
  switch (this.id) {
    case 'burgerSmall':
      document.getElementById('burgerImg').src = '../burgers/burger_small.png';
      theBurger.setSize('small');
      break;
    case 'burgerMedium':
      document.getElementById('burgerImg').src = '../burgers/burger_medium.png';
      theBurger.setSize('medium');
      break;
    case 'burgerBig':
      document.getElementById('burgerImg').src = '../burgers/burger_big.png';
      theBurger.setSize('big');
  }
  burgerCalc();
}

function selectFilling() {
  switch (this.id) {
    case 'cheeseFilling':
      theBurger.setFilling('cheese');
      break;
    case 'saladFilling':
      theBurger.setFilling('salad');
      break;
    case 'potatoFilling':
      theBurger.setFilling('potato');
  }
  burgerCalc();
}

function changeTopping() {
  switch (this.id) {
    case 'toppingSpice':
      if (this.checked) {
        theBurger.addTopping('spice');
      } else {
        theBurger.removeTopping('spice');
      }
      break;
    case 'toppingMayo':
      if (this.checked) {
        theBurger.addTopping('mayo');
      } else {
        theBurger.removeTopping('mayo');
      }
  }
  burgerCalc();
}

function burgerCalc() {
  document.getElementById('caloriesShow').innerText = `Calories: ${theBurger.getCalories()}`;
  document.getElementById('priceShow').innerText = `Price: ${theBurger.getPrice()} rub`;
  console.log(theBurger);
}

function submitBurger() {
  alert(`Сей дивный бургер доставит в ваш организм ${theBurger.getPrice()} калорий всего за ${theBurger.getCalories()} рублей.`)
}

//////////////////////////

document.getElementsByName('burgerSize').forEach(el => {
  el.addEventListener('click', selectSize);
});
document.getElementsByName('filling').forEach(el => {
  el.addEventListener('click', selectFilling);
});
document.getElementsByName('topping').forEach(el => {
  el.addEventListener('click', changeTopping);
});
document.getElementById('submitOrder').addEventListener('click', submitBurger);
burgerCalc();
