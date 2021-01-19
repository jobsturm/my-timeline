<template>
    <svg class="discover_frontend_graphic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <AnimationPath
            :drawPercentage="as.timeline"
            :d="timelinePath"
            stroke="#FFFFFF"
            :stroke-width="strokeWidth"
            fill="none"
        />
        <foreignObject
            :x="coords.text.x"
            :y="coords.text.y"
            :width="0.96 * windowWidth"
            height="400"
        >
            <div class="discover_frontend_graphic__sub_title" xmlns="http://www.w3.org/1999/xhtml">
                And most importantly
            </div>
            <div class="discover_frontend_graphic__title" xmlns="http://www.w3.org/1999/xhtml">
                Frontend
                <br/> Development
            </div>
        </foreignObject>
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
export default class DiscoverFrontendGraphic extends GraphicMixin {
    constructor() {
        super();
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
    }

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get strokeWidth():number {
        const baseStrokeWidth = 4;
        return baseStrokeWidth + (16 * this.as.strokeWidening);
    }
    get timelinePath():string {
        const endX:number = this.end.x;
        let path = new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 50, y: 20 }),
                new Point({ x: endX, y: this.end.y - 1 }),
                new Point({ x: endX, y: this.end.y }),
            ],
        });
        if (this.windowWidth < 969) {
            path = new Path({
                points: [
                    new Point({ x: this.start.x, y: -1 }),
                    new Point({ x: this.start.x, y: 0 }),
                    new Point({ x: 50, y: 20 }),
                    new Point({ x: 50, y: 20 }),
                    new Point({ x: endX, y: this.end.y - 1 }),
                    new Point({ x: endX, y: this.end.y }),
                ],
            });
        }
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
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
        margin-top: 16px
        color: main.$white
        text-shadow: 4px 4px 0px rgba(255, 255, 255, 0.2)
        @media (max-width: 1068px)
            font-size: 70px
        @media (max-width: 620px)
            font-size: min(70px, 11vw)
            margin-top: min(10px, 11vw)
            text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.2)

</style>
