const bodyParser = require('body-parser')
const fs = require('fs')
const express = require('express')
const app = express()
let cart = require('./cart')
let workFile = require('./workWithFiles')

const LINKBACK = {
    cart: 'server/bd/responses/getBasket.json',
    stats: 'server/bd/responses/stats.json',
    catalog: 'server/bd/responses/catalogData.json',
    addCart: 'server/bd/responses/addToBasket.json',
    dellCart: 'server/bd/responses/deleteFromBasket.json'
}

const LINKFRONT = {
    cart: '/cart',
    stats: '/stats',
    catalog: '/catalogData.json',
    addCart: '/addToBasket',
    dellCart: '/deleteFromBasket'
}

// слушаем порт 3040
app.listen(3040, function () {
    console.log('Example app listening on port 3040!')
});
//  отображаем наш проект
app.use('/', express.static('build'))
// закидываем данные в req.body
app.use(bodyParser.json())


// обработка запроса к catalog
app.get(LINKFRONT.catalog, function (req, res) {
    workFile.getRespons(LINKBACK.catalog, res) // отправляем ответ
})

// обработка запроса к cart
app.get(LINKFRONT.cart, function (req, res) {
    workFile.getRespons(LINKBACK.cart, res) // отправляем ответ
})

// перезаписываем json файл корзины при добавлении товара в корзину 
app.post(LINKFRONT.addCart, function (req, res) {

    fs.readFile(LINKBACK.cart, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Фаил ${LINKBACK.cart} ненайден!`)
        } else {
            let value = cart.addToCart(data, req.body)
            workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res)
        }
    })
})
// обрботка запроса на увеличение количества товра в корзине
app.put(LINKFRONT.addCart + '/:id', function (req, res) {

    fs.readFile(LINKBACK.cart, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Фаил ${LINKBACK.cart} ненайден!`)
        } else {
            let value = cart.chengeQuantity(data, req.params, req.body)
            workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res)
        }
    })

})

// перезаписываем json файл корзины при удалении товара в корзину 
app.put(LINKFRONT.dellCart + '/:id', function (req, res) {

    fs.readFile(LINKBACK.cart, 'utf-8', (err, data) => {
        if (err) {
            console.log(`Фаил ${LINKBACK.cart} ненайден!`)
        } else {
            let value = cart.chengeQuantity(data, req.params, req.body)
            workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res)
        }
    })
})

app.put(LINKFRONT.stats, function (req, res) {
    addToStats(statsFile, req) // редактируем фал статистики
    workFile.anyRespons(LINKFRONT.stats, res) // отправляем ответ
})

// обрабатываем запрос на полную очистку карзины удаление элемента из корзины
app.delete(LINKFRONT.dellCart, function (req, res) {
    fs.readFile(LINKBACK.cart, 'utf-8', (err, data) => {
        if (err) {
            console.log('err')
        } else {
            if (req.body.allQuntity == 0) {
                let value = cart.delAllCart()
                workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res)
            } else {
                let value = cart.dellInCart(data, req.body.id)
                workFile.write(LINKBACK.cart, LINKBACK.stats, value.valueForFileCart, value.valueForFileStats, res)
            }
        }
    })
})

