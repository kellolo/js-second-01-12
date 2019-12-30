const fs = require('fs');
const express = require('express');

const app = express();

// app.use(express.static('public'));
app.use(express.json());

const isProductAlreadyInCart = function (cart, productId) {
  return cart.some(product => +product.id_product === +productId);
};

const getCurrentItem = function (items, itemId) {
  return items.find(item => item.id_product === +itemId);
};

const makeStats = function (action, product) {
  return {
    action: action,
    id_product: product.id_product,
    product_name: product.product_name,
    date: new Date(),
  };
};

const writeTheStats = function (pathToFile, action, product) {
  fs.readFile(pathToFile, 'utf-8', (err, data) => {
    const parsedData = JSON.parse(data);
    const stats = makeStats(action, product);
    parsedData.push(stats);

    fs.writeFile(pathToFile, JSON.stringify(parsedData), () => {
      console.log('Добавлена статистика о действии с товаром');
    });
  });
};

const makeGETResponse = function (url, pathToFile) {
  app.get(url, (req, res) => {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
      res.send(data);
      }
    );
  });
};

const makePOSTResponse = function (url, pathToFile, pathToStatsFile) {
  app.post(url, (req, res) => {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
      const parsedData = JSON.parse(data);

      if (isProductAlreadyInCart(parsedData, req.body.id_product)) {
        return res.status(500);
      }

      parsedData.push(req.body);

      fs.writeFile(pathToFile, JSON.stringify(parsedData), () => {
        res.send(req.body);
      });
    });
    writeTheStats(pathToStatsFile, 'add', req.body);
  });
};

const makePATCHResponse = function (url, pathToFile, pathToStatsFile) {
  const productURL = `${url}/:id_product`;
  app.patch(productURL, (req, res) => {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
      const parsedData = JSON.parse(data);

      if (!isProductAlreadyInCart(parsedData, req.params.id_product)) {
        return res.status(500);
      }

      const currentCartItem = getCurrentItem(parsedData, req.params.id_product);
      currentCartItem.quantity = req.body.quantity;

      fs.writeFile(pathToFile, JSON.stringify(parsedData), () => {
        res.send(currentCartItem);
      });
    });
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
      const parsedData = JSON.parse(data);
      const currentItem = getCurrentItem(parsedData, req.params.id_product);

      writeTheStats(pathToStatsFile, 'quantity changed', currentItem);
    });
  });
};

const makeDELETEResponse = function (url, pathToFile, pathToStatsFile) {
  const productURL = `${url}/:id_product`;
  app.delete(productURL, (req, res) => {
    fs.readFile(pathToFile, 'utf-8', (err, data) => {
      const parsedData = JSON.parse(data);

      if (!isProductAlreadyInCart(parsedData, req.params.id_product)) {
        return res.status(500);
      }

      const currentCartItemIdx = parsedData.findIndex(entity => entity.id_product === +req.params.id_product);
      parsedData.splice(currentCartItemIdx, 1);

      fs.writeFile(pathToFile, JSON.stringify(parsedData), () => {
        res.send(parsedData);
      });
    });
    fs.readFile('./server/db/catalog.json', 'utf-8', (err, data) => {
      const parsedData = JSON.parse(data);
      const currentItem = getCurrentItem(parsedData, req.params.id_product);

      writeTheStats(pathToStatsFile, 'delete', currentItem);
    });
  });
};

const productURL = '/products';
const pathToProductsFile = './server/db/catalog.json';
const cartURL = '/cart';
const pathToCartFile = './server/db/cart.json';
const pathToStatsFile = './server/log/stats.json';

makeGETResponse(productURL, pathToProductsFile);
makeGETResponse(cartURL, pathToCartFile);
makePOSTResponse(cartURL, pathToCartFile, pathToStatsFile);
makePATCHResponse(cartURL, pathToCartFile, pathToStatsFile);
makeDELETEResponse(cartURL, pathToCartFile, pathToStatsFile);

app.listen(3000);
