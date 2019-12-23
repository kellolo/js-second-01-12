var bodyParser = require('body-parser')
const fs = require('fs')
var express = require('express')
var app = express()


// слушаем порт 3040
app.listen(3040, function () {
    console.log('Example app listening on port 3040!')
});
//  отображаем наш проект
app.use ('/', express.static ('build'))
// закидываем данные в req.body
app.use(bodyParser.json())

// обработка запроса к catalog
app.get('/catalogData.json', function (req, res) {
    fs.readFile('server/bd/responses/catalogData.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    })   
})
// обработка запроса к cart
app.get('/cart', function (req, res) {
    fs.readFile('server/bd/responses/getBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    })  
})

// обработка запроса к на получение разрешения добавления товра в корзину
app.get('/addToBasket', function (req, res) {
    fs.readFile('server/bd/responses/addToBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
            console.log('good')
        }
    });   
});


// перезаписываем json файл корзины при добавлении товара в корзину 
app.post('/addToBasket', function (req, res) {

    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

    fs.readFile('server/bd/responses/addToBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)         
        }
    }) 
})

// обработка запроса к на получение разрешения на удаление товра из корзины
app.get('/deleteFromBasket', function (req, res) {
    fs.readFile('server/bd/responses/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
             res.send(data)
             // переписываем файл
        }
    });   
});

// перезаписываем json файл корзины при удалении товара в корзину 
app.post('/deleteFromBasket', function (req, res) {

    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });

    fs.readFile('server/bd/responses/addToBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)         
        }
    }) 
})