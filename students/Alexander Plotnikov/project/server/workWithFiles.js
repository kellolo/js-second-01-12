let workFile = {
    fs: require('fs'),
    cart: require('./cart'),
    getRespons(fileName, res) {
        this.fs.readFile(fileName, 'utf-8', (err, data) => {
            if (err) {
                console.log('err')
            } else {
                res.send(data)
                console.log('Ответ ушел!')
            }
        })
    },
    anyRespons(res) {
        res.send({
            "result": 1
        })
    },
    write(linkFile, linkStats, data, action, res) {
        let cont = this
        this.fs.writeFile(linkFile, data, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Файл ${linkFile} перезаписан!`)
                cont.statsFile(linkStats, action, res)

            }
        })
    },
    /* readWritRespons(link,linkStats, req, res, type) {
        let cont = this
        this.fs.readFile(link, 'utf-8', (err, data) => {
            let writeValue
            if (type == 'PUT') {
                writeValue = cont.cart.chengeQuantity(data, req.params, req.body)
            }
            if (type == 'POST') {
                writeValue = cont.cart.addToCart(data, req.body)
            }
            if (err) {
                console.log('err')
            } else {
                cont.write(link, writeValue.valueForFileCart, res)
                cont.statsFile(linkStats, writeValue.valueForFileStats)
            }

        })
    }, */
    statsFile(linkStats, action, res) {
        console.log(action)
        let cont = this
        this.fs.readFile(linkStats, 'utf-8', (err, data) => {
            if (err) {
                console.log(`Файл ${linkStats} не найден!`)
            } else {
                let arr = JSON.parse(data)
                arr.push(action)

                this.fs.writeFile(linkStats, JSON.stringify(arr), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        cont.anyRespons(res)
                        console.log(`Файл ${linkStats} перезаписан!`)
                    }
                })
            }
        })
    }

}

module.exports = workFile