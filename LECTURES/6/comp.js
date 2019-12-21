let temp = {
    name: 'Вася',
    body: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Optio asperiores iusto blanditiis 
            labore illum cum nemo architecto saepe natus autem minus eos, 
            beatae cumque itaque a. Amet nesciunt a laborum.`,
    email: 'lol@lol.rf',
    toggle: true
}

Vue.component ('post', {
    template: `
    <div class="post">
        <button @click="hidden = !hidden" v-if="comment.toggle">{{ hidden ? '-' : '+' }}</button>

        <div class="user">
            <strong> {{ comment.name }} </strong>
        </div>
        <div v-show="!hidden">
            <div class="post-body">
                <p>
                    {{ comment.body }}
                </p>
            </div>
            <div class="post-footer">
                <a href="#">{{ comment.email }}</a>
            </div>
        </div>
        <button @click="some">click</button>
    </div>
    `,
    //props: ['comment']
    props: {
        comment: {
            type: Object,
            default: () => temp
        }
    },
    data () {
        return {
            hidden: false
        }
    },
    methods: {
        some () {
            //console.log (this)
            this.$root.$refs.firstPost.comment.email = this.comment.email
        }
    }
})