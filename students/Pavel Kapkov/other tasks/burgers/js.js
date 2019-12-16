class Burger {
    constructor(size, fill, spice, may) {
        this.size = size;
        this.fill = fill;
        this.spice = spice;
        this.may = may;
    }
    
    countPrice() {
        let result = 0;
        
        if (this.size == 'small') {
            result += 50;
        } else if (this.size == 'big') {
            result += 100;
        }
        
        if (this.fill == 'cheese') {
            result += 10;
        } else if (this.fill == 'salad'){
            result += 20;
        } else if (this.fill == 'potatoes'){
            result += 15;
        }
        
        if (this.spice) {
            result += 15;
        }
        
        if (this.may) {
            result += 20;
        }
        
        return result;
    }
    
    countCalories() {
        let result = 0;
        
        if (this.size == 'small') {
            result += 20;
        } else if (this.size == 'big') {
            result += 40;
        }
        
         if (this.fill == 'cheese') {
            result += 20;
        } else if (this.fill == 'salad'){
            result += 5;
        } else if (this.fill == 'potatoes'){
            result += 10;
        }
        
        if (this.may) {
            result += 5;
        }
        
        return result;
    }
}

document.querySelector('#submit').addEventListener('click',(evt) =>{
    let size = document.querySelector('#size').value;
    let fill = document.querySelector('#fill').value;
    let spice = document.querySelector('#spice').checked;
    let may = document.querySelector('#may').checked;
    
    let hamburger = new Burger(size, fill, spice, may);
    document.querySelector('#price').innerHTML = String(`${hamburger.countPrice()} рублей`);
    document.querySelector('#calories').innerHTML = String(`${hamburger.countCalories()} калорий`);
});