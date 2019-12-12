// let promise = function (val) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (val) {
//                 resolve({ data: val, status: '200' })
//             } else {
//                 reject({ data: null, status: '404' })
//             }
//         }, 1000)

//     })
// }

// function getPromise(val) {
//     let a = null
//     promise(val)
//         .then(obj => {
//             console.log('Promise resolved')
//             a = obj
//         })
//         .catch(err => {
//             console.log('Promise rejected')
//             a = err
//         })
//         .finally(() => {
//             console.log(`Promise fulfilled with status ${a.status} and got data ${a.data}`)
//         })


// }

// //---------------------------------


// function makeGETRequest(url, callback) {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest()
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState === 4) {
//                 if (XMLHttpRequest.status === 200) {
//                     resolve(xhr.responseText)
//                 } else {
//                     reject('Error')
//                 }
//             }
//         }
//         xhr.open('GET', url, true)
//         xhr.send()
//     })

// }
let dataFromWeb = null
let url = 'https://raw.githubusercontent.com/kellolo/online-store-api/master/responses/catalogData.json'
// makeGETRequest(url)
//     .then(dJSON => JSON.parse(dJSON))
//     .then(dataNotJSON => { dataFromWeb = dataNotJSON })
//     .catch(err => {
//         console.log(err)
//     })
//     .finally(() => {
//         console.log(dataFromWeb)
//     })

function fetchRequest(url) {
    return fetch(url)
}

fetchRequest(url)
    .then(dJSON => dJSON.json())
    .then(data => {
        dataFromWeb = data
    })
    .finally(() => {
        console.log(dataFromWeb)
    })