const fs = require('fs');
const express = require('express');
const app = express();

//app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.json());
app.use('/', express.static('public'));
app.use('/db/', express.static('server/db'));

app.get('/catalogData', (req, res) => {
  fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
    if (err) {
      // res.set('Content-Type', 'application/json')
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  })
});

app.get('/getBasket', (req, res) => {
  fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
    if (err) {
      // res.set('Content-Type', 'application/json')
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

app.post('/addToBasket', (req, res) => {
  var basketData = fs.readFileSync('server/db/getBasket.json');
  var basket = JSON.parse(basketData);
  var catalogData = fs.readFileSync('server/db/catalogData.json');
  var catalog = JSON.parse(catalogData);
  var addingProductId = req.body.id_product;
  var findCat = catalog.find(item => item.id_product === addingProductId); 

  if (findCat) {
    var findCart = basket.contents.find(item => item.id_product === findCat.id_product);
    console.log("adding", findCat);
    if (findCart) {
      findCart.quantity++;
    } else {
      basket.contents.push(Object.assign({}, findCat, { quantity: 1 }));
    }
    basket.countGoods = 0;
    basket.amount = 0;
    for (var item of basket.contents) {
      basket.amount += item.price * item.quantity;
      basket.countGoods += item.quantity;
    } 
    fs.writeFileSync('server/db/getBasket.json', JSON.stringify(basket));
    res.send(200, JSON.stringify({ result: 1 }));
  } else {
    res.send(403, JSON.stringify({ result: 0 }));
  }
});


app.post('/deleteFromBasket', (req, res) => {
  var basketData = fs.readFileSync('server/db/getBasket.json');
  var basket = JSON.parse(basketData); 
  var deletingProductId = req.body.id_product;
  var find = basket.contents.find(item => item.id_product === deletingProductId); 

  if (find) {
    console.log("deleting", find);
    if (find.quantity > 1) {
      find.quantity--;
    } else {
      basket.contents.splice(basket.contents.indexOf(find), 1);
    }
    basket.countGoods = 0;
    basket.amount = 0;
    for (var item of basket.contents) {
      basket.amount += item.price * item.quantity;
      basket.countGoods += item.quantity;
    } 
    fs.writeFileSync('server/db/getBasket.json', JSON.stringify(basket));
    res.send(200, JSON.stringify({ result: 1 }));
  } else {
    res.send(403, JSON.stringify({ result: 0 }));
  }
});



// let rawdata = fs.readFileSync('student.json');
// let student = JSON.parse(rawdata);

app.listen(3000, () => console.log(`server started on port 3000`));