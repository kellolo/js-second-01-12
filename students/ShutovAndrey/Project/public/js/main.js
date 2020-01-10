let app = new Vue({
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                .then(d => d.json())
        },

        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json());
        },

        delJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json());
        }

    },
})
