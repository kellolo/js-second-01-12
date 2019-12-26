var bodyParser = require('body-parser')
const fs = require('fs')
var express = require('express')
var app = express()

let cartFile = 'server/bd/responses/getBasket.json'
let statsFile = 'server/bd/responses/stats.json'
let catalogFile = 'server/bd/responses/catalogData.json'
let addToCart = 'server/bd/responses/addToBasket.json'
let delFromBasket = 'server/bd/responses/deleteFromBasket.json'


// слушаем порт 3040
app.listen(3040, function () {
    console.log('Example app listening on port 3040!')
});
//  отображаем наш проект
app.use('/', express.static('build'))
// закидываем данные в req.body
app.use(bodyParser.json())


// обработка запроса к catalog
app.get('/catalogData.json', function (req, res) {
    creatRespons(catalogFile, res) // отправляем ответ
})

// обработка запроса к cart
app.get('/cart', function (req, res) {
    creatRespons(cartFile, res) // отправляем ответ
})

// обработка запроса к на получение разрешения добавления или увеличения  количества товара в корзине
app.get('/addToBasket', function (req, res) {
    creatRespons(addToCart, res)
})

// обработка запроса к на получение разрешения на удаление товра из корзины
app.get('/deleteFromBasket', function (req, res) {
    creatRespons(delFromBasket, res) // отправляем ответ
})

// перезаписываем json файл корзины при добавлении товара в корзину 
app.post('/addToBasket', function (req, res) {

    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    creatRespons(addToCart, res) // отправляем ответ
})

// обрботка запроса на увеличение количества товра в корзине
app.put('/addToBasket', function (req, res) {

    addDelFronCart(cartFile, statsFile, 'add', req) // переаписываем файл корзины и формируем файл статистики

    creatRespons(addToCart, res) // отправляем ответ
})

// перезаписываем json файл корзины при удалении товара в корзину 
app.put('/deleteFromBasket', function (req, res) {
   
    addDelFronCart(cartFile, statsFile, 'del', req) // переаписываем файл корзины и формируем файл статистики

    creatRespons(delFromBasket, res) // отправляем ответ
})


app.put('/stats', function (req, res) {
    addToStats(statsFile, req) // редактируем фал статистики
    creatRespons(statsFile, res) // отправляем ответ
})


// обрабатываем запрос на полную очистку карзины
app.delete('/deleteFromBasket', function (req, res) {
    // переаписываем файл корзины 
    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err
        console.log('Файл корзины обнулен!')
    })
  
     creatRespons(delFromBasket, res) // отправляем ответ
})

// Функции**************************************************************************************
// Функции**************************************************************************************
// Функции**************************************************************************************
// Функции**************************************************************************************

function addToStats(fileName, fileJson) {
    // Добавляем информацию об операции в файл статистики
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (data.length == 0) {
            fs.writeFile(fileName, JSON.stringify(fileJson.body), (err) => {
                if (err) throw err
                console.log('The file has been saved!')
            })
        } else {
            let arr = JSON.parse(data)
            if (arr.length == undefined) {
                arr = [JSON.parse(data), fileJson.body]
            } else {
                arr.push(fileJson.body)
            }
            fs.writeFile(fileName, JSON.stringify(arr), (err) => {
                if (err) throw err

            })
        }

    })
}

// дабаляем или убираем  элемент из файла  корзины (cartFile) по id, и добавляем  информацию об оперции в файл (statsFile) 
// cartFile - 'server/bd/responses/getBasket.json'
// statsFile - 'server/bd/responses/stats.json'
function addDelFronCart(cartFile, statsFile, action, fileJson) {
    fs.readFile(cartFile, 'utf-8', (err, data) => {
        if (err) {
            console.log('err')
        } else {
            let arr = JSON.parse(data).contents
            let index = arr.findIndex(item => item.id == fileJson.body.id)
            if (action === 'add') {
                (arr[index].quantity++)
            }
            if (action === 'del') {
                (arr[index].quantity--)
            } 
            if (arr[index].quantity == 0) {
                arr.splice(index, 1)
            }

            let sum = null
            let quant = null
            arr.forEach(element => {
                sum += +element.quantity * element.price
                quant += +element.quantity
            });
            let obj = {
                amount: sum,
                countGoods: quant,
                contents: arr
            }

            console.log(arr)
            fs.writeFile(cartFile, JSON.stringify(obj), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }
        // Добавляем информацию об операции в файл статистики
        addToStats(statsFile, fileJson)
    })
}

function creatRespons(fileName, res) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.log('err')
        } else {
            res.send(data)
        }
    })
}