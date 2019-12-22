Vue.component ('filtercomp', {
    template: `
    <form action="#" class="search-form" @submit.prevent="$root.$refs.catalog.filter (str)">
        <input type="text" class="search-field" v-model="str">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    `,
    data () {
        return {
            str: ''
        }
    }
})