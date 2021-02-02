<template>
    <svg class="discover_frontend_graphic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <AnimationPath
            v-for="(timelinePath, index) in timelinePaths"
            :key="`discover_frontend_graphic__timelinePath_${index}`"
            :drawPercentage="as.timeline"
            :d="timelinePath"
            stroke="rgba(255,255,255, 0.2)"
            stroke-width="20"
            fill="none"
        />
    </svg>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
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
    timelineCount: number;

    constructor() {
        super();
        this.timelineCount = 8;
        this.graphicLayout = {
            text: {
                desktop: new Point({ x: 24, y: 32 }),
                mobile: new Point({ x: 4, y: 40 }),
            },
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 1 },
            { key: 'strokeWidening', start: 0.6, end: 0.8 },
        ];
        this.titleElementWidth = 600;
    }

    get timelinePaths():Array<string> {
        const timelineCount = this.timelineCount + 1;
        const distance = 100;
        const spacing = distance / timelineCount;
        // const margin = spacing / 2;
        const outoPaths:Array<string> = [];

        for (let index = 1; index < timelineCount; index += 1) {
            // const element = array[index];
            const x:number = spacing * index;
            const path = new Path({
                points: [
                    new Point({ x, y: 0 }),
                    new Point({ x, y: 0 }),
                    new Point({ x, y: 50 }),
                    new Point({ x, y: 100 - 1 }),
                    new Point({ x, y: 100 }),
                ],
            });
            const { windowWidth, windowHeight } = this;
            outoPaths.push(new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath);
        }

        return outoPaths;
    }

    getTitleElementWidth():number {
        const titleElement = this.$refs.title as HTMLElement;
        return titleElement.offsetWidth;
    }
    @Watch('windowWidth')
    setTitleElementWidth():void {
        this.titleElementWidth = this.getTitleElementWidth();
    }
    mounted():void {
        this.setTitleElementWidth();
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .discover_frontend_graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
    .discover_frontend_graphic__sub_title
        @extend %headline4_style
        color: main.$white
        text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.2)
        @media (max-width: 1069px)
            font-size: 28px
        @media (max-width: 620px)
            font-size: min(28px, 5.5vw)
            text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.2)
    .discover_frontend_graphic__title
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
    .discover_frontend_graphic__main
        @extend %body1_style
        color: main.$white
        font-size: max(min(1.5em, 8vw), 12px)
        // font-size: 1.5em
        line-height: 1.5em
        margin-top: max(min(10px, 11vw), 16px)
        width: 100%
</style>
