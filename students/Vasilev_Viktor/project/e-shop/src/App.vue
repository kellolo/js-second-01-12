<template>
  <div id="app">
    <HeaderComponent ref="headercomp"/>

    <CatalogComponent ref="catalog"/>
  </div>
</template>

<script>
  import HeaderComponent from './components/HeaderComponent.vue'
  import CatalogComponent from './components/CatalogComponent.vue'

  export default {
    name: 'app',
    components: {
      HeaderComponent,
      CatalogComponent,
    },
  }
</script>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'SF Pro Display', sans-serif;
  }

  header {
    display: flex;
    background-color: #2f2a2d;
    justify-content: space-between;
    color: #fafafa;
    padding: 30px 80px;
  }

  button:focus {
    outline: none;
  }

  p {
    margin: 0 0 5px 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
