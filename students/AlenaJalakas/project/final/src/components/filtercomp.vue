<template>
    <form action="#" class="search__form" @submit.prevent="$root.$refs.catalog.filter (str)">
        <input type="text" class="search__form_input" v-model="str">
        <button class="search__form_button">Search</button>
    </form>
</template>

<script>
    export default {
        name: "filtercomp",
        data() {
            return {
                str: ''
            }
        }
    }
</script>

<style lang="sass" scoped>
    .search__form
        --searchButtonWidth: 86px
        max-width: 320px
        overflow: hidden
        position: relative
        margin-left: 400px
        margin-top: 20px
        &_input
            margin: 0
            padding: 0.5rem calc(var(--searchButtonWidth) + 0.5rem) 0.5rem 0.5rem
            border: 1px solid
            border-radius: 8px
            width: 100%
            background: radial-gradient( circle farthest-corner at 10% 20%,  rgba(120,170,0,1) 0%, rgba(200,227,121,1) 90% )
            -webkit-appearance: none
            font-size: 13px
            &:not(:placeholder-shown) ~ .search__form_button
                transform: translateX(calc(-1 * var(--searchButtonWidth)))
        &_button
            border: 0
            padding: 0.5rem
            border-radius: 8px
            position: absolute
            margin-top: -1px
            top: 0
            left: 100%
            width: var(--searchButtonWidth)
            transition: 0.2s
            background: gray
            color: black
            font-size: 13px
            height: 100%
            &:focus
                outline: 0
                background: #222
</style>