const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/', express.static('public'));

app.get('/catalog', (req, res) => {
  fs.readFile ('server/db/catalogData.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus (404, JSON.stringify({result: 0}))
    } else {
      res.send(data)
    }
  })
});

app.get('/cart', (req, res) => {
  fs.readFile ('server/db/getBasket.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus (404, JSON.stringify({result: 0}))
    } else {
      res.send(data);
    }
  })
});

app.post("/postData", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log('Обработка POST-запроса...');
  fs.writeFile("server/db/getBasket.json", JSON.stringify(request.body), function(error){
    if(error) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    let data = fs.readFileSync("server/db/getBasket.json", "utf8");
    console.log(JSON.parse(data));  // выводим считанные данные
  });
  response.send(`${request.body}`);
});

app.put("/putData", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log('Обработка PUT-запроса...');
  fs.writeFile("server/db/getBasket.json", JSON.stringify(request.body), function(error){

    if(error) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    let data = fs.readFileSync("server/db/getBasket.json", "utf8");
    console.log(JSON.parse(data));  // выводим считанные данные
  });
  response.send(`${request.body}`);
});

app.delete("/deleteData", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log('Обработка DELETE-запроса...');
  fs.writeFile("server/db/getBasket.json", JSON.stringify(request.body), function(error){

    if(error) throw error; // если возникла ошибка
    console.log("Асинхронная запись файла завершена. Содержимое файла:");
    let data = fs.readFileSync("server/db/getBasket.json", "utf8");
    console.log(JSON.parse(data));  // выводим считанные данные
  });
  response.send(`${request.body}`);
});


app.listen(3030, () => console.log('app listening on port 3030...'));