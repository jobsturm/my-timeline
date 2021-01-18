<template>
    <Slide class="slide" ref="slide" :background="colors.$black">
        <DiscoverFrontendGraphic
            class="slide__discover_frontent_graphic"
            :start="timelinePosition.start"
            :end="timelinePosition.end"
            :animationPercentage="entered"
        />
        <SlideTriangle class="overlay_triangle" :height="triangeHeight"/>
        <div class="rainbow_holder">
            <div class="rainbow rainbow--part_1" :style="getRainbowStyle(0)"/>
            <div class="rainbow rainbow--part_2" :style="getRainbowStyle(1)"/>
            <div class="rainbow rainbow--part_3" :style="getRainbowStyle(2)"/>
            <div class="rainbow rainbow--part_4" :style="getRainbowStyle(3)"/>
            <div class="rainbow rainbow--part_5" :style="getRainbowStyle(4)"/>
            <div class="rainbow rainbow--part_6" :style="getRainbowStyle(5)"/>
        </div>
    </Slide>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import colors from '@/helpers/colors';
import SlideTriangle from '@/components/Atoms/SlideTriangle.vue';
import DiscoverFrontendGraphic from '@/components/Illustrations/DiscoverFrontendGraphic.vue';
import easingFunctions from '@/helpers/easingFunctions';

@Component({
    components: {
        SlideTriangle,
        DiscoverFrontendGraphic,
    },
})

export default class DiscoverFrontend extends SlideMixin {
    index = 8;
    end:Point = new Point({ x: 90, y: 100 });
    colors:Record<string, string> = colors;

    constructor() {
        super();
        this.timeline = [
            { key: 'triangle_size', start: 0, end: 2 },
            { key: 'rainbow_block_0', start: 0.10, end: 0.6 },
            { key: 'rainbow_block_1', start: 0.12, end: 0.6 },
            { key: 'rainbow_block_2', start: 0.14, end: 0.6 },
            { key: 'rainbow_block_3', start: 0.16, end: 0.6 },
            { key: 'rainbow_block_4', start: 0.18, end: 0.6 },
            { key: 'rainbow_block_5', start: 0.20, end: 0.6 },
        ];
    }
    get triangeHeight():number {
        return (this.windowHeight * 0.15) * easingFunctions.easeOutQuad(this.as.triangle_size);
    }
    get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    get lineStartPosition():Point {
        if (!this.previousSlide) return new Point({ x: 0, y: 0 });
        return this.previousSlide.line.end;
    }
    get timelinePosition(): Line {
        return new Line({
            start: this.lineStartPosition,
            end: this.end,
        });
    }

    @Watch('windowSizeSum')
    getRainbowStyle(index:number):Record<string, string> {
        const animationPercentage = this.as[`rainbow_block_${index}`];
        const borderRadius = 32 - (32 * this.as[`rainbow_block_${index}`]);
        const margin = 16 - (16 * this.as[`rainbow_block_${index}`]);
        return {
            height: `${this.windowHeight * animationPercentage}px`,
            marginLeft: `${margin}px`,
            marginRight: `${margin}px`,
            borderBottomLeftRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
        };
    }
    mounted():void {
        this.registerSlide(
            new Slide({
                index: this.index,
                line: new Line({ ...this.timelinePosition }),
            }),
        );
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .slide
        position: relative
        width: 100vw
        @include main.viewportHeight(100, 0)
        background: main.$black

    .slide__illustration
        position: absolute
        width: 100vw
        @include main.viewportHeight(100, 0)
        top: 0
        left: 0
    .slide__discover_frontent_graphic
        position: absolute
        z-index: 3
    .overlay_triangle
        position: absolute
    .rainbow_holder
        width: 100%
        @include main.viewportHeight(100, 0)
        display: flex
    .rainbow
        width: calc(100% / 6)
        will-change: height, margin, border-radius
    .rainbow--part_1
        background: #5EBD3E
    .rainbow--part_2
        background: #FFB900
    .rainbow--part_3
        background: #F78200
    .rainbow--part_4
        background: #E23838
    .rainbow--part_5
        background: #973999
    .rainbow--part_6
        background: #009CDF
</style>
