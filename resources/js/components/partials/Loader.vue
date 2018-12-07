<template>
    <div class="loader">
        <img src="../../../assets/images/loader.gif" alt="">
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
    .loader {
    position: fixed;
        overflow: hidden;
        display: grid;
        align-content: center;
        justify-content: center;
        top: 0;
        height: 100vh !important;
        width: 100vw !important;
        z-index: 99999;
        background-color: #fff !important;
        img {
            width: 600px;
            height: 600px;
            align-self: center;
        }
    }
</style>
