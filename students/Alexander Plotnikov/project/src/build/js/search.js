export default {
    template: `
                 <div class="menuBottom__search">
                    <a href="#" class="menuBottom__suppots">Support</a>
                    <form action="#" class="menuBottom__form">
                        <button type="button" @click="findWord" class="menuBottom__button">
                            <svg width="13" height="13" class="menuBottom__searchSvg">
                                <path
                                    d="M12.614,12.611 C12.113,13.110 11.302,13.110 10.801,12.611 L8.158,9.967 C6.087,11.222 3.360,10.971 1.571,9.182 C-0.531,7.079 -0.531,3.670 1.571,1.568 C3.674,-0.536 7.083,-0.536 9.185,1.568 C10.974,3.357 11.225,6.084 9.971,8.154 L12.614,10.799 C13.115,11.297 13.115,12.109 12.614,12.611 ZM7.735,3.018 C6.433,1.716 4.323,1.716 3.022,3.018 C1.720,4.319 1.720,6.430 3.022,7.731 C4.323,9.034 6.433,9.034 7.735,7.731 C9.037,6.430 9.037,4.319 7.735,3.018 Z" />
                            </svg>
                        </button>
                        <input  v-model="searchWord" @input="findWord" class="menuBottom__input" type="search" name="search" id="search"
                            placeholder="Input product's name ..."> 
                    </form>
                </div>
           `,
    data() {
        return {
            searchWord: '',
            CatURL: '/catalogData.json',
            catalog: []
        }
    },
    methods: {
        getData(url) {
            return fetch(url)
                .then(data => data.json())
        },
        findWord() {
            let regExp = new RegExp(`${this.searchWord}`, 'i')
            let arrObj = this.$root.$refs.catalog.catalogItems
            let arr = []
            for (const key in arrObj) {
                if (arrObj.hasOwnProperty(key)) {
                    const el = arrObj[key]

                    let flag = false
                    for (const key in el) {
                        if (el.hasOwnProperty(key)) {
                            const props = el[key]
                            if (regExp.test(props)) {
                                flag = true
                            }
                        }
                    }
                    if (flag) {
                        arr.push(el)
                        flag = false
                    }
                }
            }
            if (arr.length > 0) {
                this.$root.$refs.catalog.catalogItems = arr
            }
        }
    },

    mounted() {
        this.getData(this.CatURL)
            .then(data => {
                this.catalog = data
            })
    }
}