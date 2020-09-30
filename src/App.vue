<template>
    <div id="app">
        <IntroSlide/>
        <SchoolSlide/>
        <ComputerSlide/>
        <DDIntroSlide/>
        <DDUnleashSlide/>
        <DDCreativeOutletsSlide/>
        <MusicSlide/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import IntroSlide from './slides/IntroSlide.vue';
import SchoolSlide from './slides/SchoolSlide.vue';
import ComputerSlide from './slides/ComputerSlide.vue';
import DDIntroSlide from './slides/DDIntroSlide.vue';
import DDUnleashSlide from './slides/DDUnleashSlide.vue';
import DDCreativeOutletsSlide from './slides/DDCreativeOutletsSlide.vue';
import MusicSlide from './slides/MusicSlide.vue';

// This is browser specific and thus default Window interface doesn't support it.
interface Window {
    visualViewport?: any;
}

@Component({
    components: {
        IntroSlide,
        SchoolSlide,
        ComputerSlide,
        DDIntroSlide,
        DDUnleashSlide,
        DDCreativeOutletsSlide,
        MusicSlide,
    },
    mixins: [vueWindowSizeMixin],
})
export default class App extends Vue {
    get windowSizeSum():number {
        return this.windowWidth + this.windowHeight;
    }

    @Watch('windowSizeSum')
    setViewportHeightCSSVar() {
        let { windowHeight } = this;
        const windowEl = window as Window;
        if (windowEl.visualViewport) windowHeight = windowEl.visualViewport.height;
        const vh = windowHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    mounted() {
        // Fix for consistent Viewport Height on Mobile,
        // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
        this.setViewportHeightCSSVar();
        window.addEventListener('resize', () => {
            this.setViewportHeightCSSVar();
            // iOS Safari Fix
            window.requestAnimationFrame(() => {
                this.setViewportHeightCSSVar();
            });
        });
    }
}
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
