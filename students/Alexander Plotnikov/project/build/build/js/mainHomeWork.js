window.onload = () => {
    js1()
}


let bodyShop = new Vue({
    el: '#E-Shop',
    data: {

        openMenu: false

    },
    methods: {
        getData(url) {
            return fetch(url)
                .then(data => data.json())
        },
        allFetch(url, type, data) { // метод для отправки данных на сервер
            return fetch(url, {
                    method: type,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: data
                })
                .then(data => data.json())
                .then(data => {
                    if (data.result == 1) {
                        console.log('Зарос прошел!')
                    } else {
                        console.log('Error - 404')
                    }
    
                })
        }

    }
   
})