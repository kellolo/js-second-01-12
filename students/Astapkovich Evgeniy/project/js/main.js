
let app = new Vue ({
  el: '#app',
  data: {
    isVisibleCart: false,
    catalogURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
    cartURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
    addURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
    delURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
    catalogImage: 'https://placehold.it/200x150',
    cartImage: 'https://placehold.it/100x80',
    catalogItems: [],
    cartItems: []
  },

  methods: {
    getJSON: function (url) {
      return fetch (url)
              .then (d => d.json())
    },

    addProduct (product){
      this.getJSON (this.addURL)
            .then( ans => {
              if (ans.result === 1) {
                let find = this.cartItems.find (item => item.id_product === product.id_product)

                if (find) {
                  find.quantity++
                } else {
                  this.cartItems.push (Object.assign( {}, product, {quantity: 1}))
                }
              }
            })
    },

    delProduct (product) {
      this.getJSON (this.delURL)
            .then( ans => {
              if (ans.result) {
                let find = this.cartItems.find (item => item.id_product === product.id_product)

                if (find.quantity > 1) {
                  find.quantity--
                } else {
                  this.cartItems.splice (this.cartItems.indexOf(find), 1)
                }
              }
            })
    }
  },

  mounted () {
    this.getJSON(this.catalogURL)
          .then ( arr => {
            this.catalogItems = arr
          }),

    this.getJSON(this.cartURL)
          .then ( obj => {
            this.cartItems = obj.contents
          })
  }
})