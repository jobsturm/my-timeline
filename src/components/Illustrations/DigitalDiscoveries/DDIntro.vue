<template>
    <svg class="dd_intro" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(5)" class="dd_intro_general_path" id="dd_intro_general_path-6" stroke="#009CDF" stroke-width="16" fill="none"/>
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(4)" class="dd_intro_general_path" id="dd_intro_general_path-5" stroke="#973999" stroke-width="16" fill="none"/>
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(3)" class="dd_intro_general_path" id="dd_intro_general_path-4" stroke="#E23838" stroke-width="16" fill="none"/>
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(2)" class="dd_intro_general_path" id="dd_intro_general_path-3" stroke="#F78200" stroke-width="16" fill="none"/>
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(1)" class="dd_intro_general_path" id="dd_intro_general_path-2" stroke="#FFB900" stroke-width="16" fill="none"/>
    <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(0)" class="dd_intro_general_path" id="dd_intro_general_path-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
    </svg>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';

@Component({
    components: {
        AnimationPath,
    },
})
export default class DDIntro extends GraphicMixin {
    timeline = [
        { key: 'timeline', start: 0, end: 0.6 },
    ]

    getTimeLinePath(index:number):string {
        const relativeLineHeight = 16 / this.windowHeight * 100;
        const relativeLineWidth = 16 / this.windowWidth * 100;
        const startPointX = this.start.x + (index * relativeLineWidth);
        const endPointX = 20 - (index * relativeLineWidth);

        const path = new Path({
            points: [
                new Point({ x: startPointX, y: -1 }),
                new Point({ x: startPointX, y: 0 }),
                new Point({ x: endPointX, y: 50 }),
                new Point({ x: endPointX, y: 51 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    .dd_intro
        width: 100vw
        height: 100vh
        position: relative
        z-index: 2
</style>
