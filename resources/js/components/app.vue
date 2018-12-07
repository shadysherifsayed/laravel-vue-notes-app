<template>

    <div>
        <navbar v-if="isLoddedIn" />
        <div :class="{'container my-3': isLoddedIn}">
            <vue-snotify v-if="isLoddedIn"></vue-snotify>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import navbar from './partials/navbar.vue'
    export default {
        components: {
            navbar
        },

        computed: {
            isLoddedIn() {
                return this.$store.getters.auth
            },

        },

        data() {
            return {
                loggedUser: null
            }
        },
        created() {

            if(this.$store.getters.auth && !this.loggedUser) {
                this.$store.dispatch('getLoggedInUser')
                    .then(user => {
                        this.loggedUser = user;
                    })
                    .catch(() => {
                        this.loggedUser = null;
                        this.$router.go({name: '/login'})
                    })
            }
        }
    }
</script>
