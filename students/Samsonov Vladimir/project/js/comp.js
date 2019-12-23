Vue.component ('catalog-item', {
    template: `
    <div class="product-item" >
        <img :src="image" alt="Some img">
        <div class="desc">
            <h3> {{ item.product_name }} </h3>
            <p> {{ item.price}} $</p>
            <button class="buy-btn" @click="addItem(item)">Купить</button>
        </div>
    </div>`,
    props: ['item', 'image']  
})

Vue.component ('cart-item', {
    template: `
    <div class="cart-item">
        <div class="product-bio">
            <img :src="image" alt="Some image">
            <div class="product-desc">
                <p class="product-title"> {{ item.product_name }} </p>
                <p class="product-quantity">Quantity: {{ item.quantity }}</p>
                <p class="product-single-price">$ {{item.price}} each</p>
            </div>
        </div>
        <div class="right-block">
            <p class="product-price">$ {{ item.quantity * item.price}}</p>
            <button class="del-btn" @click="addItem (item)">&times;</button>
        </div>
    </div>`,
    props: ['item', 'image'] 
})