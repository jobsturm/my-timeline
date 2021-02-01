<template>
    <div id="app">
        <IntroSlide/>
        <SchoolSlide/>
        <ComputerSlide/>
        <DDIntroSlide/>
        <DDUnleashSlide/>
        <DDCreativeOutletsSlide/>
        <MusicSlide/>
        <MusicVisualisationSlide/>
        <DiscoverFrontend/>
        <WorkSlide/>
        <HereNowSlide/>
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
import MusicVisualisationSlide from './slides/MusicVisualisationSlide.vue';
import DiscoverFrontend from './slides/DiscoverFrontend.vue';
import WorkSlide from './slides/WorkSlide.vue';
import HereNowSlide from './slides/HereNowSlide.vue';

// This is browser specific and thus default Window interface doesn't support it.
interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        MusicVisualisationSlide,
        DiscoverFrontend,
        WorkSlide,
        HereNowSlide,
    },
    mixins: [vueWindowSizeMixin],
})
export default class App extends Vue {
    get windowSizeSum():number {
        return this.windowWidth + this.windowHeight;
    }

    @Watch('windowSizeSum')
    setViewportHeightCSSVar():void {
        let { windowHeight } = this;
        const windowEl = window as Window;
        if (windowEl.visualViewport) windowHeight = windowEl.visualViewport.height;
        const vh = windowHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    mounted():void {
        // Fix for consistent Viewport Height on Mobile.
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
</style>
