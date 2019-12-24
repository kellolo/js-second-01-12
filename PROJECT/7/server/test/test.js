// const data = require ('./comp')

// import mod from './comp'

// data.hello ()
// data.bye ()

// mod.hello ()
// mod.bye ()

const http = require ('http')
const server = http.createServer ((req, res) => {
    if (req.url === '/') {
        res.write ('main page')
        res.end ()
    } else if (req.url === '/lol') {
        res.write ('lol page')
        res.end ()
    }
})

server.listen (3030)
server.on ('connection', () => {
    console.log ('connected')
})
console.log ('listen at port 3030...')