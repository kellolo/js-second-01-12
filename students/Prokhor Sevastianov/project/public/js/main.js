let app = new Vue({
    el: '#app',
    methods: {
        getJson(url) {
            return fetch(url)
                .then(d => d.json())
        },
        makePOSTRequest(url, data) {
            let xhr;

            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

            xhr.send(data);
        }
    },
})
