let app = new Vue ({
    el: '#app',
    methods: {
        getJson (url) {
            return fetch (url)
                    .then (d => d.json ())
        },
        
    }
})
