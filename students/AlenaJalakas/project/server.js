const fs = require ('fs');
const express = require ('express');
const app = express();

app.use(express.json ());
app.use('/', express.static ('public'));



app.get ('/catalog', (req, res) => {
    fs.readFile ('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {
            res.send (data)
        }
    })
});

app.get ('/basket', (req, res) => {
    fs.readFile ('server/db/basket.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0}))
        } else {
            res.send (data.contents)
        }
    })

})
app.listen(3030, () => console.log(`app listening`));



