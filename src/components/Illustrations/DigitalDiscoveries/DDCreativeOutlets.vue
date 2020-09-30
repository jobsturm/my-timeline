<template>
    <svg class="dd__creative_outlets" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="ddc__text" :transform="coords.textCoords.transform">
            <text
                class="ddc__text--one"
                text-anchor="end"
            >
                One which more importantly,
            </text>
            <text
                class="ddc__text--two"
                text-anchor="end"
            >
                had endless creative possibilities
            </text>
            <text
                class="ddc__text--three"
                text-anchor="end"
            >
                I could explore
            </text>
        </g>
        <g id="ddc__line">
            <AnimationPath :drawPercentage="as.timeline" :d="getTimelinePath(0)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimelinePath(2)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimelinePath(4)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimelinePath(6)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimelinePath(8)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
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
        textCoords: new Point({ x: 65, y: 43 }),
    }
    timeline = [
        { key: 'timeline', start: 0, end: 1 },
    ]

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }

    getTimelinePath(lineOffsetCount:number):string {
        const relativeLineWidth = 8 / this.windowWidth * 100;

        const endX:number = this.end.x + (lineOffsetCount * relativeLineWidth);
        const path = new Path({
            points: [
                this.start,
                new Point({ x: this.start.x, y: this.start.y + 0 }),
                new Point({ x: this.start.x, y: this.start.y + 1 }),
                new Point({ x: 60, y: 62 }),
                new Point({ x: 60, y: 62 }),
                new Point({ x: 58, y: 62 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .dd__creative_outlets
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2
    #ddc__text
        @extend %headline3_style
        fill: #36C7FF
        font-size: max(min(32px, 3vw), 18px)
    .ddc__text--two
        transform: translateY(max(min(42px, 4vw), 18px))
    .ddc__text--three
        transform: translateY(max(min(84px, 8vw), 36px))
</style>
