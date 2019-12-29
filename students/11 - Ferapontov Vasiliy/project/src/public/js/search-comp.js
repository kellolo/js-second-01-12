export  default {
  template: `
      <form action="#" class="search-form">
        <input  type="text" class="search-field" v-model="searchLine" @input="$root.$refs.catalog.filter(searchLine)">
        <button class="btn-search" type="submit">
          <i class="fas fa-search"></i>
        </button>
      </form>`,
  props: [],
  data() {
    return {
      searchLine: null,
    }
  }
};