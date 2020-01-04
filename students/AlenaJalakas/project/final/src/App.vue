<template>
  <div id="app">
      <header class="header">
        <div class="logo">BrandShop</div>
        <div class="basket__preview">
          <filtercomp></filtercomp>
          <cart ref="cart"></cart>

        </div>
      </header>

      <main>
        <catalog ref="catalog"></catalog>
      </main>

  </div>
</template>

<script>
import catalog from "@/components/catalog";
import cart from "@/components/cart";
import filtercomp from "@/components/filtercomp";

export default {
  name: 'app',
    data: function () {
      return {}
    },
    methods: {
        getJson (url) {
            return fetch(url)
                .then(d => d.json())
        },

        postJson (url, data) {
            return fetch (url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            }).then (d => d.json ())
        },
        putJson (url, data) {
            return fetch (url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            }).then (d => d.json ())
        },
        deleteJson (url) {
            return fetch (url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then (d => d.json ())
        }

    },
    components: {
         'catalog': catalog,
         'cart': cart,
         'filtercomp': filtercomp

     }
}
</script>

<style lang="sass">
    body
        background-color: #f8f9fa
        margin: 0
        padding: 0
        font-family: sans-serif
        line-height: 1.7
    .header
        height: 70px
        display: flex
        flex-direction: row
    .logo
        font-size: 18px
        color: darkmagenta
        margin-left: 30px
        margin-top: 20px

</style>
