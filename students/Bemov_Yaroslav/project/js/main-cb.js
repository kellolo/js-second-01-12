class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods(cb) {
        makeGetRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            cb();
        })
    }

    render() {
        let listHTML = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHTML += goodItem.render();
        })
        document.querySelector('.products').innerHTML = listHTML;
    }
}

function makeGetRequest(url, callback) {
    let xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}
