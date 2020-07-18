<template>
    <div id="app">
        <Head/>
        <Childhood/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Head from './views/Head.vue';
import Childhood from './views/Childhood.vue';

export default Vue.extend({
    name: 'App',
    components: {
        Head,
        Childhood,
    },
});
</script>

<style lang="scss">
    html, body {
        margin: 0px;
        -webkit-overflow-scrolling: none;
        font-size: 16px;
        overflow-x: hidden;
        scroll-behavior: smooth;
    }

    .debug_point {
        width: 10px;
        height: 10px;
        position: absolute;
        background: red;
        position: absolute;
        z-index: 9999;
        opacity: 0.5;
        &.debug_point--end {
            background: yellow;
        }
    }
</style>
