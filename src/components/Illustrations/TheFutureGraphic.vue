<template>
    <svg class="the_future_graphic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <AnimationPath
            v-for="(timelinePath, index) in timelinePathAsStrings"
            :key="`the_future_graphic__timelinePath_${index}`"
            :drawPercentage="as.timeline"
            :d="timelinePath"
            stroke="rgba(255,255,255, 0.2)"
            stroke-width="20"
            fill="none"
            stroke-linecap="round"
        />
        <g id="the_future_graphic__circles" v-if="windowWidth > 768">
            <circle
                v-for="(endPoint, index) in endPoints"
                :key="`the_future_graphic__end_circle_${index}`"
                :id="`the_future_graphic__end_circle_${index}`"
                fill="white"
                :cx="windowWidth / 100 * endPoint.x"
                :cy="windowHeight / 100 * endPoint.y"
                :r="20 * as.circleIntro"
            />
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

@Component({
    components: {
        AnimationPath,
    },
})
export default class TheFutureGraphic extends GraphicMixin {
    titleElementWidth: number;

    constructor() {
        super();
        this.graphicLayout = {
            text: {
                desktop: new Point({ x: 24, y: 32 }),
                mobile: new Point({ x: 4, y: 40 }),
            },
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 0.6 },
            { key: 'circleIntro', start: 0.6, end: 0.7 },
        ];
        this.titleElementWidth = 600;
    }

    get timelineCount():number {
        return this.windowWidth < 1000 ? 4 : 8;
    }
    get timelinePaths():Array<SVGSmoothPath> {
        const timelineCount = this.timelineCount + 1;
        const spacing = 100 / timelineCount;
        const outroPaths:Array<SVGSmoothPath> = [];
        const endPointYs = [15, 25, 22, 10, 28, 25, 15, 30];

        for (let index = 1; index < timelineCount; index += 1) {
            // const element = array[index];
            const x:number = spacing * index;
            const path = new Path({
                points: [
                    new Point({ x, y: 0 }),
                    new Point({ x, y: 0 }),
                    new Point({ x, y: endPointYs[index - 1] - 1 }),
                    new Point({ x, y: endPointYs[index - 1] }),
                ],
            });
            const { windowWidth, windowHeight } = this;
            outroPaths.push(new SVGSmoothPath({ path, windowWidth, windowHeight }));
        }
        return outroPaths;
    }
    get timelinePathAsStrings():Array<string> {
        return this.timelinePaths.map(timelinePath => timelinePath.SVGStringPath);
    }
    get endPoints():Array<Point> {
        return this.timelinePaths.map((timelinePath:SVGSmoothPath) => {
            const { points } = timelinePath.path;
            return points[points.length - 1];
        });
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .the_future_graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
    .the_future_graphic__sub_title
        @extend %headline4_style
        color: main.$white
        text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.2)
        @media (max-width: 1069px)
            font-size: 28px
        @media (max-width: 620px)
            font-size: min(28px, 5.5vw)
            text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2)
    .the_future_graphic__title
        @extend %headline1_style
        display: inline-block
        margin-top: 16px
        color: main.$white
        text-shadow: 4px 4px 0px rgba(255, 255, 255, 0.2)
        @media (max-width: 1068px)
            font-size: 70px
        @media (max-width: 620px)
            font-size: min(70px, 11vw)
            margin-top: min(10px, 11vw)
            text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.2)
    .the_future_graphic__main
        @extend %body1_style
        color: main.$white
        font-size: max(min(1.5em, 8vw), 12px)
        // font-size: 1.5em
        line-height: 1.5em
        margin-top: max(min(10px, 11vw), 16px)
        width: 100%
</style>
