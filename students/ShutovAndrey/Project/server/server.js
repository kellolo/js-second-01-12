const fs = require ('fs');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({
    extended: true
}));
app.use ('/', express.static ('public'));

app.get ('/catalog', (req, res) => {
    fs.readFile ('server/db/StudyDB.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
           // console.log(app);
            res.send (data)
        }
    })
});

app.get ('/cart', (req, res) => {
    fs.readFile ('server/db/getBasket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {

            res.send (data);

        }
    })
});

app.post('/addToBasket', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            cart.push(item);
            console.log(cart);
            fs.writeFile('server/db/getBasket.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                    console.log('err')
                } else {

                    res.send('{"result": 1}');
                }
            });
        }

    });
});

//удаление
// app.post('/delFromBasket', (req, res) => {
//     fs.readFile('server/db/getBasket.json', 'utf8', (err, data) => {
//         if (err) {
//             res.sendStatus (404, JSON.stringify ({result: 0}))
//         } else {
//             const cart = JSON.parse(data);
//             const item = req.body;
//             cart.push(item);
//             fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
//                 if (err) {
//                     res.send('{"result": 0}');
//                 } else {
//                     res.send('{"result": 1}');
//                 }
//             });
//         }
//
//     });
// });

app.listen(3030, () => console.log(`app listening on port 3030!`));