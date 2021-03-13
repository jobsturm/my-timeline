<template>
    <svg
        class="audio_visualization"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <g id="ddc__line">
            <AnimationPath :drawPercentage="as.timeline" :d="pathOne" class="audio_visualization_general_path" id="audio_visualization_general_path" stroke="#FFFFFF" :stroke-width="strokeWidth" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="pathTwo" class="audio_visualization_general_path" id="audio_visualization_general_path" stroke="#FFFFFF" :stroke-width="strokeWidth" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="pathThree" class="audio_visualization_general_path" id="audio_visualization_general_path" stroke="#FFFFFF" :stroke-width="strokeWidth" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="pathFour" class="audio_visualization_general_path" id="audio_visualization_general_path" stroke="#FFFFFF" :stroke-width="strokeWidth" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="pathFive" class="audio_visualization_general_path" id="audio_visualization_general_path" stroke="#FFFFFF" :stroke-width="strokeWidth" fill="none"/>
        </g>
        <foreignObject
            :x="textTransform.x"
            :y="textTransform.y"
            :width="0.96 * windowWidth"
            height="200"
            :style="textStyle"
        >
            <div id="av_text" xmlns="http://www.w3.org/1999/xhtml">
                And visualizing it!
            </div>
        </foreignObject>
    </svg>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import GraphicLocation from '@/classes/GraphicLocation';
import animationStep from '@/helpers/animationStep';
import { State } from 'vuex-class';

@Component({
    components: {
        AnimationPath,
    },
})
export default class AudioVisualization extends GraphicMixin {
    @State('windowHeight') windowHeight: number;
    @Prop({ required: true }) readonly audioDataArray: Uint8Array
    @Prop({ required: true }) readonly exited: number

    graphicLayout = {
        textCoords: {
            desktop: new Point({ x: 0, y: 38 }),
            mobile: new Point({ x: -3, y: 50 }),
        },
    }
    timeline = [
        { key: 'textIntro', start: 0.5, end: 0.8 },
        { key: 'timeline', start: 0, end: 1 },
    ]

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get textCoords():GraphicLocation {
        return this.coords.textCoords;
    }
    get baseCurveSize():number {
        return (this.windowWidth < 768) ? 62 : 58;
    }
    get curveSize():number {
        return (this.windowWidth < 768) ? 5 : 10;
    }
    get pathOne():string {
        let audioPercentage = (this.audioDataArray[36] || 0) / 180;
        if (audioPercentage < 0) audioPercentage = 0;
        const topOffset = this.curveSize * audioPercentage;
        const baseCurve = [
            new Point({ x: 70, y: 62 }),
            new Point({ x: 62, y: this.baseCurveSize - topOffset }),
            new Point({ x: 54, y: 62 }),
        ];
        return this.getTimelinePath(0, baseCurve);
    }
    get pathTwo():string {
        //  Range of audio bar 44 is 0 - 180
        let audioPercentage = (this.audioDataArray[39] || 0) / 180;
        if (audioPercentage < 0) audioPercentage = 0;
        const topOffset = this.curveSize * audioPercentage;
        const baseCurve = [
            new Point({ x: 62, y: 62 }),
            new Point({ x: 54, y: this.baseCurveSize - topOffset }),
            new Point({ x: 46, y: 62 }),
        ];
        return this.getTimelinePath(2, baseCurve);
    }
    get pathThree():string {
        let audioPercentage = (this.audioDataArray[44] || 0) / 180;
        if (audioPercentage < 0) audioPercentage = 0;
        const topOffset = this.curveSize * audioPercentage;
        const baseCurve = [
            new Point({ x: 54, y: 62 }),
            new Point({ x: 46, y: this.baseCurveSize - topOffset }),
            new Point({ x: 38, y: 62 }),
        ];
        return this.getTimelinePath(4, baseCurve);
    }
    get pathFour():string {
        let audioPercentage = (this.audioDataArray[48] || 0) / 180;
        if (audioPercentage < 0) audioPercentage = 0;
        const topOffset = this.curveSize * audioPercentage;
        const baseCurve = [
            new Point({ x: 46, y: 62 }),
            new Point({ x: 38, y: this.baseCurveSize - topOffset }),
            new Point({ x: 30, y: 62 }),
        ];
        return this.getTimelinePath(6, baseCurve);
    }
    get pathFive():string {
        let audioPercentage = (this.audioDataArray[55] || 0) / 180;
        if (audioPercentage < 0) audioPercentage = 0;
        const topOffset = this.curveSize * audioPercentage;
        const baseCurve = [
            new Point({ x: 38, y: 62 }),
            new Point({ x: 30, y: this.baseCurveSize - topOffset }),
            new Point({ x: 22, y: 62 }),
        ];
        return this.getTimelinePath(8, baseCurve);
    }
    get textTransform():Point {
        const x = this.textCoords.x + (50 - this.as.textIntro * 50);
        return new Point({ x, y: this.textCoords.y });
    }
    get textStyle():Record<'opacity', number> {
        return {
            opacity: this.as.textIntro,
        };
    }
    get strokeWidth():number {
        const percentage = animationStep({
            parentPercentage: this.exited,
            start: 0.6,
            end: 0.8,
        });
        return 4 + (16 * percentage);
    }

    getTimelinePath(lineOffsetCount:number, variant:Array<Point>):string {
        const relativeLineWidth = 8 / this.windowWidth * 100;
        const startX:number = this.start.x + (lineOffsetCount * relativeLineWidth);

        // Horizontal Part of the Line, this is the part visualized by music.
        const musicCurve:Array<Point> = [
            new Point({ x: 70, y: 62 }),
            ...variant,
            new Point({ x: 22, y: 62 }),
        ];

        const path = new Path({
            points: [
                new Point({ x: startX, y: this.start.y + 0 }),
                new Point({ x: startX, y: this.start.y + 40 }),
                new Point({ x: 70, y: 62 }),
                new Point({ x: 70, y: 62 }),
                new Point({ x: 70, y: 62 }),
                ...musicCurve,
                new Point({ x: this.end.x, y: this.end.y - 1 }),
                new Point({ x: this.end.x, y: this.end.y + 15 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .audio_visualization
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2
    #av_text
        @extend %headline3_style
        position: relative
        text-align: center
        z-index: 5
        color: main.$white
        padding: 0 40px
        font-size: 40px
        text-shadow: 4px 4px 8px main.$primary
        @media (max-width: 620px)
            font-size: max(min(2em, 5vw), 24px)
</style>
