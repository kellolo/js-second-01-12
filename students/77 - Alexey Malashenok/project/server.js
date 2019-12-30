const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const links = [
    {
        link: '/catalog',
        file: 'db/catalogData.json'
    },
    {
        link: '/cart',
        file: 'db/getBasket.json'
    }
];


app.use(express.json());

app.use('/', express.static('public'));

links.forEach(elem => {
    app.get(elem.link, (req, res) => {
        fs.readFile(elem.file, 'utf-8', (err, data) => {
            if (err) {
                res.sendStatus(404, JSON.stringify({ result: 0 }));
            } else {
                res.send(data);
            }
        })
    });
});

app.post('/addItem', (req, res) => {
    fs.readFile('db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {

            let cart = JSON.parse(data);
            const item = req.body;

            let find = cart.find(elem => elem.id_product === item.id_product);

            if (find) {
                find.quantity++;
            } else {
                cart.push(Object.assign({}, item, { quantity: 1 }));
            }

            fs.writeFile('db/getBasket.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{ "result": 0} ');
                } else {
                    res.send('{ "result": 1 }');
                }
            });

            const str = `${(new Date()).toString()}:\t item id:${item.id_product} name:${item.product_name} price:${item.price} was added\r\n`;

            fs.appendFile('./server.log', str, 'utf8', (err) => {
                console.log('Error ${err} while writing to log file.');
            });
        }
    })
});

app.post('/delItem', (req, res) => {
    fs.readFile('db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{ "result": 0 }')
        } else {

            let cart = JSON.parse(data);
            const item = req.body;

            let find = cart.find(elem => elem.id_product === item.id_product);

            if (find != undefined && find.quantity > 1) {
                find.quantity--;
            } else {
                cart.splice(cart.indexOf(find), 1);
            }

            fs.writeFile('db/getBasket.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{ "result": 0} ');
                } else {
                    res.send('{ "result": 1 }');
                }
            });

            const str = `${(new Date()).toString()}:\t item id:${item.id_product} name:${item.product_name} price:${item.price} was deleted\r\n`;

            fs.appendFile('./server.log', str, 'utf8', (err) => {
                console.log('Error ${err} while writing to log file.');
            });
        }
    })
});

app.listen(port, () => console.log(`app listening on port ${port}`));