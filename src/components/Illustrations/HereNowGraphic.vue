<template>
    <svg class="here_now_graphic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <AnimationPath
            :drawPercentage="as.introTimeline"
            :d="introTimelinePath"
            stroke="#FFFFFF"
            stroke-width="20"
            fill="none"
        />
        <AnimationPath
            v-for="(outroPath, index) in outroPaths"
            :key="`outropath_${index}`"
            :drawPercentage="as.outroTimeline"
            :d="outroPath"
            stroke="rgba(255,255,255, 0.2)"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
        />
        <foreignObject
            :x="coords.text.x"
            :y="coords.text.y + circleSize.radius"
            :width="windowWidth"
            height="500"
        >
            <main class="here_now_graphic__text">
                <h2 ref="title" class="here_now_graphic__title" xmlns="http://www.w3.org/1999/xhtml">
                    That's the story
                </h2>
                <p class="here_now_graphic__main">
                    I've been working as a Frontend Dev for three years now, learned a lot,
                    and grew alot as a developer, but also as a person professionally wise!
                    <br/><strong>But what about the future?</strong>
                </p>
            </main>
        </foreignObject>
        <g
            id="portrait"
            fill="none"
            fill-rule="evenodd"
            :transform="coords.endOfLineCircle.transform"
        >
            <g id="portrait__centerer" :transform="`translate(-${circleSize.radius}, -${circleSize.radius})`">
                <mask id="portrait_mask">
                    <circle
                        id="portrait_mask__circle"
                        fill="white"
                        :cx="circleSize.radius + 5"
                        :cy="circleSize.radius + 5"
                        :r="circleSize.radius"
                    />
                </mask>
                <image
                    href="@/assets/portrait.jpg"
                    mask="url(#portrait_mask)"
                    :width="circleSize.diameter"
                />
                <circle
                    id="portrait_border"
                    stroke="#FFFFFF"
                    stroke-width="12"
                    :cx="circleSize.radius + 5"
                    :cy="circleSize.radius + 5"
                    :r="circleSize.radius"
                />
            </g>
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

interface CircleSizeInterface {
    radius: number;
    diameter: number;
}

@Component({
    components: {
        AnimationPath,
    },
})
export default class HereNowGraphic extends GraphicMixin {
    titleElementWidth:number;

    constructor() {
        super();
        this.graphicLayout = {
            endOfLineCircle: new Point({ x: 50, y: this.end.y - 4 }),
            text: new Point({ x: 0, y: this.end.y - 4 }),
        };
        this.timeline = [
            { key: 'introTimeline', start: 0, end: 0.3 },
            { key: 'outroTimeline', start: 0.3, end: 1 },
        ];
        this.titleElementWidth = 600;
    }

    get outroPathsCount():number {
        return this.windowWidth < 1000 ? 4 : 8;
    }
    get introTimelinePath():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 50, y: 20 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get circleSize():CircleSizeInterface {
        const radius = this.windowWidth < 1000 ? 100 : 144;
        const diameter = radius * 2;

        return {
            radius,
            diameter,
        };
    }
    get outroPaths():Array<string> {
        const outroPathsCount = this.outroPathsCount + 1;
        const distance = 100;
        const spacing = distance / outroPathsCount;
        // const margin = spacing / 2;
        const outoPaths:Array<string> = [];

        for (let index = 1; index < outroPathsCount; index += 1) {
            // const element = array[index];
            const endX:number = spacing * index;
            const path = new Path({
                points: [
                    new Point({ x: this.start.x, y: this.end.y + 0 }),
                    new Point({ x: this.start.x, y: this.end.y + 1 }),
                    new Point({ x: 50, y: this.end.y + 4 }),
                    new Point({ x: endX, y: 100 - 1 }),
                    new Point({ x: endX, y: 100 }),
                ],
            });
            const { windowWidth, windowHeight } = this;
            outoPaths.push(new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath);
        }

        return outoPaths;
    }
    get outroTimelinePath():string {
        const endX:number = this.end.x;
        const path = new Path({
            points: [
                new Point({ x: this.start.x, y: this.end.y }),
                new Point({ x: this.start.x, y: this.end.y }),
                new Point({ x: 50, y: 20 }),
                new Point({ x: endX, y: 100 - 1 }),
                new Point({ x: endX, y: 100 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .here_now_graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
    .here_now_graphic__title
        @extend %headline2_style
        display: inline-block
        margin-top: 16px
        color: main.$white
        text-align: center
        @media (max-width: 1068px)
            font-size: 70px
        @media (max-width: 620px)
            font-size: min(70px, 11vw)
            margin-top: min(10px, 11vw)
    .here_now_graphic__main
        @extend %body1_style
        color: main.$white
        font-size: max(min(1.5em, 8vw), 12px)
        line-height: 1.5em
        margin-top: max(min(10px, 11vw), 16px)
        width: 100%
        text-align: inherit
        @media (max-width: 620px)
            max-width: 95vw
    .here_now_graphic__text
        width: 100vw
        max-width: 600px
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 10
        left: 50%
        transform: translateX(-50%)
        text-align: center
</style>
