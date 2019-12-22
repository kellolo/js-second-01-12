class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        makeGetRequest(`${API_URL}/catalogData.json`)
            .then(d => JSON.parse(d))
            .then(data => {
                this.goods = data;
            })
            .finally(() => {
                this.render();
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

function makeGetRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.responseText);
                }
            }
        }
        xhr.open('GET', url, true);
        xhr.send();
    })
};
