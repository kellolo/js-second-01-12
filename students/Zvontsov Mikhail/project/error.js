Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        setError(text) {
            this.error = text
        }
    },
    template: `<div class="error-block" v-if="text">
                <p class=""error-msg>
                <button class="close-btn" click="setError('')">&times;</button>
                {{ text }}</p>
                </div>`
})