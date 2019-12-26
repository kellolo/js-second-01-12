var bodyParser = require('body-parser')
const fs = require('fs')
var express = require('express')
var app = express()


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

// обрботка запроса на увеличение количества товра в корзине
app.put('/addToBasket', function (req, res) {

   

    fs.readFile('server/bd/responses/getBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            console.log(JSON.parse(data))
            let arr = JSON.parse(data).contents
            console.log(typeof (arr))
            let find = arr.find(item => item.id == req.body.id)
            let index = arr.findIndex(item => item.id == req.body.id)
            arr[index].quantity++
            console.log(arr)
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
            console.log(obj)
            fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(obj), (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        }

        fs.readFile('server/bd/responses/stats.json', 'utf-8', (err, data) => {

            if (data.length == 0) {
                fs.writeFile('server/bd/responses/stats.json', JSON.stringify(req.body), (err) => {
                    if (err) throw err
                    console.log('The file has been saved!')
                })
            } else {
                let arr = JSON.parse(data)
                if (arr.length == undefined) {
                    arr = [JSON.parse(data), req.body]
                } else {
                    arr.push(req.body)
                }
    
                console.log(arr.length)
    
                fs.writeFile('server/bd/responses/stats.json', JSON.stringify(arr), (err) => {
                    if (err) throw err
                    console.log('The file has been saved!')
                })
            }
           
        })

    })

   

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
    })
})

// перезаписываем json файл корзины при удалении товара в корзину 
app.post('/deleteFromBasket', function (req, res) {

    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err
        console.log('The file has been saved!')
    })

    fs.readFile('server/bd/responses/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    })
})

// формируем файл статистики
app.post('/stats', function (req, res) {

    fs.readFile('server/bd/responses/stats.json', 'utf-8', (err, data) => {

        if (data.length == 0) {
            fs.writeFile('server/bd/responses/stats.json', JSON.stringify(req.body), (err) => {
                if (err) throw err
                console.log('The file has been saved!')
            })
        } else {
            let arr = JSON.parse(data)
            if (arr.length == undefined) {
                arr = [JSON.parse(data), req.body]
            } else {
                arr.push(req.body)
            }

            console.log(arr.length)

            fs.writeFile('server/bd/responses/stats.json', JSON.stringify(arr), (err) => {
                if (err) throw err
                console.log('The file has been saved!')
            })
        }
        res.send(data)
    })
})

app.delete('/deleteFromBasket', function (req, res) {
    fs.writeFile('server/bd/responses/getBasket.json', JSON.stringify(req.body), (err) => {
        if (err) throw err
        console.log('Файл корзины обнулен!')
    })
    fs.readFile('server/bd/responses/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    })
})