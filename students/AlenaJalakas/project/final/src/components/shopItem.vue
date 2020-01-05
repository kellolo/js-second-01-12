<template>
    <div class="basket__item">
        <div class="basket__item_img"></div>
        <p class="basket__item_name"> {{ shopItem.title }}</p>
        <p class="basket__item_quantity">{{ shopItem.quantity }}</p>
        <p class="basket__item_price"> {{ shopItem.price }}</p>
        <div class="basket__item_right">
            <p class="basket__item_total">${{shopItem.quantity * shopItem.price }}</p>
            <button class="basket__item_delete" @click="$parent.delProduct (item)">&times;</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shopItem"
    }
</script>

<style lang="sass" scoped>
    .basket__item
        width: 60px
        height: 80px
        border-radius: .25rem
        margin-left: 10px
        margin-top: 10px
        &_name
            font-size: 10px
            margin-top: 10px
        &_price
            font-size: 10px
            margin-top: 10px
        &_total
            font-size: 10px
            margin-left: 100px
            margin-top: -30px
        &_delete
            margin-left: 130px
            margin-top: -90px


        &_img
            background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(222,168,248,1) 0%, rgba(168,222,248,1) 21.8%, rgba(189,250,205,1) 35.6%, rgba(243,250,189,1) 52.9%, rgba(250,227,189,1) 66.8%, rgba(248,172,172,1) 90%, rgba(254,211,252,1) 99.7% )
            width: 30px
            height: 40px
        &_quantity
            font-size: 10px
            border: 1px solid gray
            border-radius: 5px
            width: 20px
            height: 20px
            text-align: center
            margin-left: 100px
            margin-top: -70px

</style>