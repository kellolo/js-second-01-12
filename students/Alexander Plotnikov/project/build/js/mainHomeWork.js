
window.onload= () => {
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
        }
    }   
})


