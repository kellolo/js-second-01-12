<template>
    <div class="catalog">
        <catalog-item v-for="item of filtered" :catalog-item="item" :key="item.id"></catalog-item>
    </div>
</template>

<script>
    import catalogItem from "@/components/catalogItem";


    export default {
        name: "catalog",
        components: { catalogItem },
        data() {
            return {
                url: './db/catalogData.json',
                items: [],
                filtered: [],
            }
        },
        methods: {
            filter (searchString) {
                let reg = new RegExp (searchString, 'i');
                this.filtered = [];
                this.items.forEach(element => {
                    if (reg.test (element.title)) {
                        this.filtered.push(element)
                    }
                })
            }
        },
        mounted() {
            this.$parent.getJson (this.url)
                .then(data => {
                    this.items = data;
                    this.filtered = data
                })
        }
    }

</script>

<style lang="sass" scoped>
    .catalog
        list-style-type: none
        display: flex
        flex-wrap: wrap
        flex-direction: row
        margin-left: 70px
        margin-top: 180px
        padding: 50px
</style>