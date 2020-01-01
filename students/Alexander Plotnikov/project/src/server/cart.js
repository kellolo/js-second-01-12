let cart = {
    addToCart(arr, obj) {
        let mas = JSON.parse(arr).contents
        mas.push(obj)
        return {
            valueForFileCart: this._sumAndQuantity(mas),
            valueForFileStats: {
                data: new Date(),
                name: obj.name,
                action: 'добавлен в корзину'
            }
        }
    },
    delAllCart() {
        return {
            valueForFileCart: JSON.stringify({
                amount: 0,
                countGoods: 0,
                contents: []
            }),
            valueForFileStats: {
                data: new Date(),
                action: 'Полная очитска корзины'
            }
        }
    },
    dellInCart(arr, id) {
        let mas = JSON.parse(arr).contents
        let item = mas.find(item => item.id == id)
        mas.splice(mas.findIndex(item => item.id == id), 1)   
        return {
            valueForFileCart: this._sumAndQuantity(mas),
            valueForFileStats: {
                data: new Date(),
                name: item.name,
                action: 'удален из корзины'
            }
        }
    },
    chengeQuantity(arr, id, q) {
        let mas = JSON.parse(arr).contents
        let find = mas.find(item => item.id == id.id)
        find.quantity = +find.quantity + +q.quantity
        let action
        (+q.quantity<0) ? action = 'количество уменьшино на 1' :  action = 'количество увеличено на 1'
        return {
            valueForFileCart: this._sumAndQuantity(mas),
            valueForFileStats: {
                data: new Date(),
                name: find.name,
                action: action
            }
        }
    },
    _sumAndQuantity(arr) {
        let sum = 0
        let quant = 0
        arr.forEach(element => {
            sum += +element.quantity * element.price
            quant += +element.quantity
        })
        return JSON.stringify({
            amount: sum,
            countGoods: quant,
            contents: arr
        })
    }
}


module.exports = cart