<template>
    <div class="catalog__item">
        <div class="catalog__item_img"> </div>
        <div class="catalog__item_name">
            {{ catalogItem.title }}
        </div>
        <div class="catalog__item_price">
            {{ catalogItem.price }} €
        </div>
        <button class="catalog__item_btn" @click="$root.$children[0].$refs.cart.addProduct(catalogItem)">Add to cart</button>
    </div>
</template>

<script>
    export default {
        name: "catalogItem"
    }
</script>

<style lang="sass" scoped>
        .catalog__item
            width: 250px
            height: 340px
            margin: 20px
            padding: 15px 38px
            border-radius: .25rem
            border: 1px solid gray
            &_name
                font-weight: bold
                text-transform: uppercase
            &_price
                color: rosybrown
            &_btn
                border: 1px solid lightgray
                width: 200px
                height: 30px
                margin-top: 5px
                padding-left: 3px
                border-radius: 1000px
                background: #ffffff
                &:hover
                    background-image: radial-gradient( circle 1136px at 5.2% 14%,  rgba(255,255,255,1) 0%, rgba(234,168,17,1) 100.2% )
            &_img
                background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(222,168,248,1) 0%, rgba(168,222,248,1) 21.8%, rgba(189,250,205,1) 35.6%, rgba(243,250,189,1) 52.9%, rgba(250,227,189,1) 66.8%, rgba(248,172,172,1) 90%, rgba(254,211,252,1) 99.7% )
                width: 150px
                height: 170px
                border-radius: 8px
</style>