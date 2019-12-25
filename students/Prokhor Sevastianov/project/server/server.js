const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/', express.static('public'))
//app.use(bodyParser.json())

app.get('/catalog', (req, res) => {
    fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
            res.send(data)
        }
    })
})

app.get('/cart', (req, res) => {
    fs.readFile('server/db/cartData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
            res.send(data)
        }
    })
})

app.get('/add', (req, res) => {

    fs.readFile('server/db/addData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }))
        } else {
            res.send(data);
        }
    })
})

app.post('/addToCart', (req, res) => {
    fs.readFile('server/db/cartData.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({ result: 0 }));
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            cart.push(item);

            fs.writeFile('server/db/cartData.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    })
})

app.listen(3030, () => console.log(`app listening on port 3030! some`))