Vue.component('err', {
    template: `
    <div class="err-red">
        <p>{{ errMsg }}</p>
    </div>
    `,
    data() {
        return {
            errMsg: 'Server error'
        }
    }
})