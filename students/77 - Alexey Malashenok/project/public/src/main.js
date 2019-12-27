'use strict';

let app = new Vue({
    el: '.app',

    methods: {
        
        getRequest(url) {
            return fetch(url);
        },

        postRequest(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
            });

        }
    }
});
