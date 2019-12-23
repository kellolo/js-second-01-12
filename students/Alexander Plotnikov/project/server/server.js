const fs = require('fs');
var express = require('express');
var app = express();

/* app.get('/', function (req, res) {
    res.send('Hello World!');
}); */

app.listen(3040, function () {
    console.log('Example app listening on port 3040!');
});

//app.use (express.json ())
app.use ('/', express.static ('build'))

app.get('/catalogData.json', function (req, res) {
    fs.readFile('server/bd/responses/catalogData.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    });   
});
app.get('/cart', function (req, res) {
    fs.readFile('server/bd/responses/getBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
        }
    });   
});
app.get('/addToBasket', function (req, res) {
    fs.readFile('server/bd/responses/addToBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
            res.send(data)
            // переписываем файл
        }
    });   
});
app.get('/deleteFromBasket', function (req, res) {
    fs.readFile('server/bd/responses/deleteFromBasket.json', 'utf-8', (err, data) => {
        if (err) { console.log('err') }
        else {
             res.send(data)
             // переписываем файл
        }
    });   
});


