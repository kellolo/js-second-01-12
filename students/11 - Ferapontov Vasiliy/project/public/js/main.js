let vm = new Vue({
  el: '#app',
  data: {},
  methods: {
    getJSON(url) {
      return fetch(url)
          .then(d => d.json())
    }
  }
});
