<template>
    <div id="app">
        <IntroSlide/>
        <SchoolSlide/>
        <ComputerSlide/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import IntroSlide from './slides/IntroSlide.vue';
import SchoolSlide from './slides/SchoolSlide.vue';
import ComputerSlide from './slides/ComputerSlide.vue';

@Component({
    components: {
        IntroSlide,
        SchoolSlide,
        ComputerSlide,
    },
})
export default class App extends Vue {}
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
