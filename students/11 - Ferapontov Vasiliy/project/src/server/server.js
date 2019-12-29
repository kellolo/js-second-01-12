const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', express.static('dist/public'));

app.get('/catalog', (req, res) => {
  fs.readFile ('dist/server/db/catalogData.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus (404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
});

app.get('/cart', (req, res) => {
  fs.readFile ('dist/server/db/getBasket.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus (404, JSON.stringify({result: 0}))
    } else {
      res.send(data);
    }
  })
});

app.post("/postData", (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log('Обработка POST-запроса...');
  fs.writeFile("dist/server/db/getBasket.json", JSON.stringify(req.body), (error) => {
    if(error) throw error;
  });
  res.send(`${JSON.stringify(req.body)}`);
});

app.put("/putData", (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log('Обработка PUT-запроса...');
  fs.writeFile("dist/server/db/getBasket.json", JSON.stringify(req.body), (error) => {
    if(error) throw error;
  });
  res.send(`${JSON.stringify(req.body)}`);
});

app.delete("/deleteData", (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log('Обработка DELETE-запроса...');
  fs.writeFile("dist/server/db/getBasket.json", JSON.stringify(req.body), (error) => {
    if(error) throw error;
  });
  res.send(`${JSON.stringify(req.body)}`);
});


app.listen(3030, () => console.log('app listening on port 3030...'));