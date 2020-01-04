import cart from './cart'
import catalog from './catalog'
import search from './search'
import feedBackForm from './feedback'

let bodyShop = {
    el: '#E-Shop',
    components: {
        cart,
        catalog,
        search,
        'feed-back-form': feedBackForm
    },
    data: {
        openMenu: false,
        openCart: false,
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

        }

    }

}

export default bodyShop