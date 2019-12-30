
let app = new Vue ({
  el: '#app',
  data: {
    isVisibleCart: false,
    catalogURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json',
    cartURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json',
    addURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json',
    delURL: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/deleteFromBasket.json',
    catalogItems: [],
    cartItems: []
  },

  methods: {
    getJSON: function (url) {
      return fetch (url)
              .then (d => d.json())
    },
  },

  computed: {
    cartIsEmpty() {
      return !Boolean(this.cartItems.length)
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