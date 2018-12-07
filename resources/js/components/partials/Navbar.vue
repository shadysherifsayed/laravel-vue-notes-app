<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
            <router-link class="navbar-brand" :to="{path: '/'}"> Notes App </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar">
                <ul class="navbar-nav ml-auto">

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ path: '/' }"> All Notes </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'notes.add' }">Add Note</router-link>
                    </li>

                    <li v-if="user">
                        <router-link class="nav-link" :to="{ name: 'profile', params: {username: user.username} }" >{{ this.user.name }}</router-link >
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" @click.prevent="logout"> Logout </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>


<script>
export default {

    computed: {
        user() {
            return this.$store.getters.getLoggedInUser
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('destroyToken')
                .then(() => {
                    this.$router.go({name: 'login'});
                })
        }
    },
}
</script>


<style lang="scss">
    .navbar {
        box-shadow: -2px 5px 10px #dedede;
        .nav-link {
            color: #010101;
            transition: 0.5s all;
            cursor: pointer;
            &:hover {
                color: #222 !important;
            }
        }
    }
</style>

