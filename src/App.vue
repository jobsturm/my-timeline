<template>
    <div id="app">
        <Head/>
        <SchoolSlide/>
        <ComputerSlide/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Head from './slides/Head.vue';
import SchoolSlide from './slides/SchoolSlide.vue';
import ComputerSlide from './slides/ComputerSlide.vue';

export default Vue.extend({
    name: 'App',
    components: {
        Head,
        SchoolSlide,
        ComputerSlide,
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
