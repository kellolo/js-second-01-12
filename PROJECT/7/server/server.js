const fs = require ('fs')
const express = require('express')
const app = express()

//app.get('/', (req, res) => res.send('Hello World!'))
app.use (express.json ())
app.use ('/', express.static ('public'))

app.get ('/catalog', (req, res) => {
    fs.readFile ('server/db/catalogData.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus (404, JSON.stringify ({result: 0}))
        } else {
            res.send (data)
        }
    })
})

app.listen(3030, () => console.log(`app listening on port 3030! some`))