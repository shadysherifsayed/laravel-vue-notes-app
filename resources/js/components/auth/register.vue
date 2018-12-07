<template>

    <div class="auth">
        <div class="content">

            <form @submit.prevent="login">

                <p class="error" v-if="nameErr" v-text="nameErr"> </p>
                <div class="input-group">
                    <span class="input-group-addon">
                        <img src="../../../assets/images/user.png" width="32" />
                    </span>
                    <input type="text" class="form-control" name="name" placeholder="Name" />
                </div>


                <p class="error" v-if="usernameErr" v-text="usernameErr"> </p>
                <div class="input-group">
                    <span class="input-group-addon">
                        <img src="../../../assets/images/user.png" width="32" />
                    </span>
                    <input type="text" class="form-control" name="username" placeholder="Username" />
                </div>

                <p class="error" v-if="emailErr" v-text="emailErr"> </p>
                <div class="input-group">
                    <span class="input-group-addon">
                        <img src="../../../assets/images/email.png" width="32" />
                    </span>
                    <input type="text" class="form-control" name="email" placeholder="Email" />
                </div>

                <p class="error" v-if="passwordErr" v-text="passwordErr"> </p>

                <div class="grid">
                    <div class="input-group">
                        <span class="input-group-addon">
                            <img src="../../../assets/images/key.png" width="32" />
                        </span>
                        <input type="password" placeholder="Password" name="password" class="form-control" />
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <img src="../../../assets/images/lock.png" width="32" />
                        </span>
                        <input type="password" placeholder="Password Confirmation" name="password_confirmation" class="form-control" />
                    </div>
                </div>

                <button type="submit" class="btn">Sign Up</button>

            </form>

            <div class="or">
                <hr class="bar">
                <span>OR</span>
                <hr class="bar">
            </div>

            <router-link class="btn toggler" :to="{name: 'login'}"> Have an Account? </router-link>
        </div>
        <div class="image"></div>

    </div>
</template>


<script>

    export default {

        data() {
            return {
                errors: {}
            }
        },

        computed: {
            nameErr() {
                return this.getError('name')
            },
            usernameErr() {
                return this.getError('username')
            },
            emailErr(){
                return this.getError('email')
            },
            passwordErr() {
                return this.getError('password')
            },
        },

        methods: {

            getError(key) {
                if(!this.errors || !this.errors[key]) return '';
                return this.errors[key][0]
            },


            login(e) {
                let formData = new FormData(e.target);
                this.$store.dispatch('singUp', formData)
                .then(() => {
                    this.$router.go('/');
                }).catch(errors => {
                    this.errors = errors.errors;
                });
            }
        },
    }
</script>

<style scoped>

</style>
