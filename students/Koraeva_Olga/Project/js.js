'use strict';
class Burger{
  constructor(size, filling, topping){
      this.size = this._input(size)
  }
  _input(elem){
    return document.querySelector(`input[name="${elem}"]:checked`).value
  }
}
let button = document.getElementById('button')
button.addEventListener('click', calc)

function calc() {
  
}
