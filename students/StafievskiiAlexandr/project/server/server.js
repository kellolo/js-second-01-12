const fs = require('fs');
const express = require('express');
const app = express();
const CATALOG = 'server/db/catalogData.json';
const BASKET = 'server/db/getBasket.json';
const STATS = 'server/db/stats.json';

function readJson(file) {
  var data = fs.readFileSync(file);
  var json = JSON.parse(data);
  return json;
}

function saveJson(file, data = {}) {
  fs.writeFileSync(file, JSON.stringify(data));
}

function updateBasket(basket) {
  var newBasket = Object.assign(basket);
  newBasket.countGoods = 0;
  newBasket.amount = 0;
  for (var item of newBasket.contents) {
    newBasket.amount += item.price * item.quantity;
    newBasket.countGoods += item.quantity;
  }
  return newBasket;
}

app.use(express.json());
app.use('/', express.static('public'));
app.use('/db/', express.static('server/db'));

app.get('/catalogData', (req, res) => {
  fs.readFile('server/db/catalogData.json', 'utf-8', (err, data) => {
    if (err) { 
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  })
});

app.get('/getBasket', (req, res) => {
  fs.readFile('server/db/getBasket.json', 'utf-8', (err, data) => {
    if (err) { 
      res.sendStatus(404, JSON.stringify({ result: 0 }));
    } else {
      res.send(data);
    }
  });
});

app.post('/addToBasket', (req, res) => {

  var stats = readJson(STATS);
  stats.push({
    action: "adding",
    time: new Date().toString(),
  });
  saveJson(STATS, stats); 

  var basket = readJson(BASKET);
  var catalog = readJson(CATALOG);
 
  var findCat = catalog.find(item => item.id_product === req.body.id_product); 
  console.log("adding", findCat);

  if (findCat) {
    var findCart = basket.contents.find(item => item.id_product === findCat.id_product);
    if (findCart) {
      findCart.quantity++;
    } else {
      basket.contents.push(Object.assign({}, findCat, { quantity: 1 }));
    }

    basket = updateBasket(basket);
    saveJson(BASKET, basket);

    res.send(200, JSON.stringify({ result: 1 }));
  } else {
    res.send(403, JSON.stringify({ result: 0 }));
  }
});


app.post('/deleteFromBasket', (req, res) => {

  var stats = readJson(STATS);
  stats.push({
    action: "deleting",
    time: new Date().toString(),
  });
  saveJson(STATS, stats); 

  var basket = readJson(BASKET); 
  
  var find = basket.contents.find(item => item.id_product === req.body.id_product); 
  console.log("deleting", find);

  if (find) {
    if (find.quantity > 1) {
      find.quantity--;
    } else {
      basket.contents.splice(basket.contents.indexOf(find), 1);
    }
    
    basket = updateBasket(basket);
    saveJson(BASKET, basket); 

    res.send(200, JSON.stringify({ result: 1 }));
  } else {
    res.send(403, JSON.stringify({ result: 0 }));
  }
});
 
app.listen(3000, () => console.log(`server started on port 3000`));