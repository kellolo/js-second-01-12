<template>
  <form action="#" class="search-form" @submit.prevent="filterProducts">
    <input class="search-field"
           type="text"
           v-model="query"
    >
    <button class="btn-search" type="submit">
      <i class="fas fa-search"></i>
    </button>
  </form>
</template>

<script>
  export default {
    name: "SearchLineComponent",
    data() {
      return {
        query: '',
      };
    },
    methods: {
      filterProducts() {
        this.$root.$children[0].$refs.catalog.filterProducts(this.query);
      },
    },
  }
</script>

<style lang="css" scoped>
  .search-form {
    position: relative;
    margin-right: 50px;
    display: inline-block;
  }

  .search-field:focus {
    outline: none;
  }

  .search-field {
    box-sizing: border-box;
    width: 200px;
    color: #fafafa;
    padding: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid #fafafa;
  }

  .btn-search {
    background-color: transparent;
    border: none;
    color: #fafafa;
    font-size: 1.2em;
    position: absolute;
    bottom: 5px;
    right: 0;
  }
</style>