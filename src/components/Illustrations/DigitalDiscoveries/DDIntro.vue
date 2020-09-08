<template>
    <svg class="dd_intro" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="rainbow">
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(5)" class="dd_intro_general_path" id="dd_intro_general_path-6" stroke="#009CDF" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(4)" class="dd_intro_general_path" id="dd_intro_general_path-5" stroke="#973999" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(3)" class="dd_intro_general_path" id="dd_intro_general_path-4" stroke="#E23838" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(2)" class="dd_intro_general_path" id="dd_intro_general_path-3" stroke="#F78200" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(1)" class="dd_intro_general_path" id="dd_intro_general_path-2" stroke="#FFB900" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(0)" class="dd_intro_general_path" id="dd_intro_general_path-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
        </g>
        <g id="text_group" :transform="coords.introTextCoords.transform">
            <text
                :style="getTextIntroStyle('textLine1')"
                class="intro_text intro_text--and"
            >
                And a whole
            </text>
            <text
                :style="getTextIntroStyle('textLine2')"
                class="intro_text intro_text--I"
            >
                new world
            </text>
            <text
                :style="getTextIntroStyle('textLine3')"
                class="intro_text intro_text--discovered"
            >
                opened up
            </text>
        </g>
        <g :transform="coords.portalInCoords.transform">
            <SVGPortal
                transform="translate(-160, -120)"
                :openPercentage="as.portalIntro"
                :blue="true"
            >
                <g transform="translate(28, 0)">
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(0)" class="dd_intro_portal_path" id="dd_intro_portal_path-6" stroke="#009CDF" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(1)" class="dd_intro_portal_path" id="dd_intro_portal_path-5" stroke="#973999" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(2)" class="dd_intro_portal_path" id="dd_intro_portal_path-4" stroke="#E23838" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(3)" class="dd_intro_portal_path" id="dd_intro_portal_path-3" stroke="#F78200" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(4)" class="dd_intro_portal_path" id="dd_intro_portal_path-2" stroke="#FFB900" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(5)" class="dd_intro_portal_path" id="dd_intro_portal_path-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
                </g>
            </SVGPortal>
        </g>
    </svg>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGPortal from '@/components/Atoms/SVGPortal.vue';

@Component({
    components: {
        AnimationPath,
        SVGPortal,
    },
})
export default class DDIntro extends GraphicMixin {
    graphicLayout = {
        introTextCoords: new Point({ x: 27, y: 52 }),
        portalInCoords: new Point({ x: 20, y: 77 }),
    }
    timeline = [
        { key: 'timeline', start: 0, end: 0.8 },
        { key: 'textLine1', start: 0.6, end: 0.8 },
        { key: 'textLine2', start: 0.65, end: 0.8 },
        { key: 'textLine3', start: 0.7, end: 0.8 },
        { key: 'portalLine', start: 0.8, end: 1 },
        { key: 'portalIntro', start: 0.72, end: 0.83 },
    ]

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }

    getTimeLinePath(index:number):string {
        const startPointX = this.start.x + (index * this.relativeLineWidth);
        const endPointX = 20 - (index * this.relativeLineWidth);

        const path = new Path({
            points: [
                new Point({ x: startPointX, y: -1 }),
                new Point({ x: startPointX, y: 0 }),
                new Point({ x: endPointX, y: 56 }),
                new Point({ x: endPointX, y: 57 }),
                new Point({ x: endPointX, y: 66.5 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    getportalLinePath(index:number):string {
        const X = 0 + (index * this.relativeLineWidth);
        const path = new Path({
            points: [
                new Point({ x: X, y: 0 }),
                new Point({ x: X, y: 27 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    getTextIntroStyle(asID:string):string {
        return `opacity: ${this.as[asID]}`;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .dd_intro
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2

    #text_group
        @extend %headline3_style
        fill: main.$white
        font-size: max(min(44px, 5vw), 32px)

    .intro_text--I
        transform: translateY(max(min(52px, 5vw), 42px))
    .intro_text--discovered
        transform: translateY(max(min(104px, 10vw), 84px))
</style>
