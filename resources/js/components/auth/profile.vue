<template>
    <div class="user" v-if="user">
        <h4> {{ user.name }} </h4>
        <p> {{ user.email }} </p>
    </div>
</template>

<script>
    export default {

        computed: {
            user() {
                return this.$store.getters.getLoggedInUser
            }
        },
    }
</script>

<style scoped>
    .user {
        box-shadow: 0px 4px 15px 1px #ddd, -1px -1px 10px #e5e5e5;
        padding: 1rem;
        text-align: center;
    }

    .user * {
        margin: .5rem 0;
    }
</style>
