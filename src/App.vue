<template>
    <div id="app">
        <IntroSlide :index="0"/>
        <SchoolSlide :index="1"/>
        <ComputerSlide :index="2"/>
        <DDIntroSlide :index="3"/>
        <DDUnleashSlide :index="4"/>
        <DDCreativeOutletsSlide :index="5"/>
        <MusicSlide :index="6"/>
        <MusicVisualisationSlide :index="7"/>
        <DiscoverFrontend :index="8"/>
        <WorkSlide :index="9"/>
        <AdyenSlide :index="10"/>
        <HereNowSlide :index="11"/>
        <TheFutureSlide :index="12"/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import { Mutation } from 'vuex-class';
import isMobile from 'is-mobile';
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
import AdyenSlide from './slides/AdyenSlide.vue';
import HereNowSlide from './slides/HereNowSlide.vue';
import TheFutureSlide from './slides/TheFutureSlide.vue';

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
        AdyenSlide,
        HereNowSlide,
        TheFutureSlide,
    },
    mixins: [vueWindowSizeMixin],
})
export default class App extends Vue {
    @Mutation('setWindowHeight') readonly setWindowHeight: CallableFunction;

    get windowSizeSum():number {
        return this.windowWidth + this.windowHeight;
    }

    setViewportHeightCSSVar():void {
        let { windowHeight } = this;
        if (window.visualViewport) windowHeight = window.visualViewport.height;
        const vh = windowHeight * 0.01;
        this.setWindowHeight(windowHeight);
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    mounted():void {
        // Fix for consistent Viewport Height on Mobile.
        this.setViewportHeightCSSVar();
        if (isMobile()) return;
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
