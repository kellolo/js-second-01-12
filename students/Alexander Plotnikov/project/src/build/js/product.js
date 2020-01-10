export default {
    props: ['item'],
    template: ` 
    <div class="contItem">
            <img v-bind:src="item.img" width="198" height="180" alt="imgProduct" class="contItem__img">
            <span class="contItem__name">{{ item.name }}</span>
            <span class="contItem__price">$ {{ item.price }}</span>
            <button class="contItem__button" v-on:click="$root.$refs.linkCart.addItemInCart(item)"
                v-bind:data-id="item.id">
                add to cart</button>
    </div>
    `   
}