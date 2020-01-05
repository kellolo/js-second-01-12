export default {
    template: `
    <div class="contCartProducts__contItem" >
            <img :src="prod.img" width="198" height="180" alt="imgProduct"
                class="contCartProducts__img">
            <span class="contCartProducts__name">{{prod.name}}</span>
            <span class="contCartProducts__price">$ {{prod.price * prod.quantity}}</span>
            <span class="contCartProducts__quantity">{{prod.quantity}}</span>
            <div class="contCartProducts__buttons">
                <button @click="$parent.addItemInCart(prod)"
                    class="contCartProducts__add">&#9650</button>
                <button @click="$parent.delItemInCart(prod)"
                    class="contCartProducts__del">&#9660</button>
            </div>        
    </div>`,
    props: ['prod']
}