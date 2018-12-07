<template>

    <div class="auth">
        <div class="content">

            <form @submit.prevent="login">

                <p v-if="error" class="error" v-text="error"></p>

                <div class="input-group">
                    <span class="input-group-addon">
                        <img src="../../../assets/images/user.png" width="32" />
                    </span>
                    <input type="text" class="form-control" v-model="username" placeholder="Username Or Email" />
                </div>
                <div class="input-group">
                     <span class="input-group-addon">
                        <img src="../../../assets/images/key.png" width="32" />
                    </span>
                    <input type="password" placeholder="Password" v-model="password" class="form-control" />
                </div>
                <button type="submit" class="btn">Sign In</button>
            </form>

            <div class="or">
                <hr class="bar">
                <span>OR</span>
                <hr class="bar">
            </div>

            <router-link class="btn toggler" :to="{name: 'register'}"> Create an Aaccount </router-link>
        </div>
        <div class="image"></div>

    </div>
</template>


<script>

    export default {

        data() {
            return {
                username: '',
                password: '',
                error: ''
            }
        },

        methods: {
            login() {
                this.$store.dispatch('retrieveToken', {
                    username: this.username,
                    password: this.password
                }).then(() => {
                    this.$router.go('/');
                }).catch(error => {
                    this.error = error;
                });
            }
        },
    }
</script>
