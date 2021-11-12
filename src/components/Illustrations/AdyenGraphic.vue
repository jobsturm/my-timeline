<template>
    <span class="profession_graphic">
        <svg
            class="adyen_graphic__text_layer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >
            <foreignObject
                :x="coords.text.x"
                :y="coords.text.y"
                :style="{ opacity: as.textOpacity }"
                height="500"
                class="adyen_graphic__text"
            >
                <h2 ref="title" class="adyen_graphic__title" xmlns="http://www.w3.org/1999/xhtml">
                    Then I started working at Adyen
                </h2>
                <main class="adyen_graphic__main">
                    <p>{{mainText}}</p>
                </main>
            </foreignObject>
        </svg>
        <svg
            class="adyen_graphic__upper_layer"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
        >   
            <AnimationPath
                v-for="(greenPath, index) in greenPaths"
                :key="`green-path-${index}`"
                :drawPercentage="as.timeline"
                :d="greenPath"
                :stroke="colors.$adyen"
                stroke-width="2"
                fill="none"
            />
            <AnimationPath
                :drawPercentage="as.timeline"
                :d="timelinePath"
                stroke="#FFFFFF"
                stroke-width="20"
                fill="none"
            />
        </svg>
    </span>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import formatDistance from 'date-fns/formatDistance'
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
export default class AdyenGraphic extends GraphicMixin {
    titleElementWidth: number;
    mainText: string;

    constructor() {
        super();
        this.graphicLayout = {
            text: {
                desktop: new Point({ x: 46, y: 30 }),
                mobile: new Point({ x: 4, y: 40 }),
            },
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 1 },
            { key: 'greenPath1', start: 0, end: 1 },
            { key: 'textOpacity', start: 0.2, end: 0.4 },
        ];
        this.titleElementWidth = 600;
        const timeSinceAdyen = formatDistance(new Date(2021, 6, 1), Date.now());
        this.mainText = `Where I started ${timeSinceAdyen} ago and am having a terrific time, whilst also learning a lot.`;
    }

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get timelinePath():string {
        const path = this.getMainPath();
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get greenPaths():Array<string> {
        const paths:Array<string> = [];
        for (let index = 0; index < 6; index++) {
            const { windowWidth, windowHeight } = this;
            const pathRight = this.getMainPath(index + 2.2);
            const pathLeft = this.getMainPath(-(index + 2.2));
            paths.push(new SVGSmoothPath({ path: pathRight, windowWidth, windowHeight }).SVGStringPath);            
            paths.push(new SVGSmoothPath({ path: pathLeft, windowWidth, windowHeight }).SVGStringPath);            
        }
        return paths;
    }
    
    getMainPath(deviation: number = 0) {
        const endX:number = this.end.x;
        const deviationPercentage = deviation / 2;
        return new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 35 + deviationPercentage, y: 49 }),
                new Point({ x: 35 + deviationPercentage, y: 50 }),
                new Point({ x: 35 + deviationPercentage, y: 51 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .profession_graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
    .adyen_graphic__rainbow
        position: absolute
        z-index: 2
    .adyen_graphic__upper_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 3
    .adyen_graphic__lower_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 1
        opacity: 0.2
    .adyen_graphic__title
        @extend %headline2_style
        display: inline-block
        margin-top: 16px
        color: main.$adyen
        max-width: 100vw
        @media (max-width: 620px)
            font-size: min(70px, 11vw)
            margin-top: min(10px, 11vw)
    .adyen_graphic__main
        @extend %body1_style
        color: main.$white
        font-size: max(min(1.5em, 8vw), 12px)
        line-height: 1.5em
        margin-top: max(min(10px, 11vw), 16px)
        width: 100%
        @media (max-width: 620px)
            font-size: max(min(1.3em, 5vw), 12px)
            text-shadow: 2px 2px 0px #3A5F6B
    .adyen_graphic__text
        width: 600px
        @media (max-width: 620px)
            padding: 0 12px
            width: 92vw
            font-size: max(min(1.3em, 5vw), 12px)
    .adyen_graphic__text_layer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: absolute
        z-index: 5
</style>
