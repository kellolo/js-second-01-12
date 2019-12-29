import cart from './cart'
import catalog from './catalog'


let vm = {
  el: '#app',
  components: {
    cart, catalog
  },
  data: {},
  methods: {
    getJSON(url) {
      return fetch(url)
          .then(d => d.json())
    }
  }
};

export default vm;