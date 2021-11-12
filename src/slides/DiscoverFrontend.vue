<template>
    <Slide class="slide" ref="slide" :background="colors.$black">
        <DiscoverFrontendGraphic
            class="slide__discover_frontent_graphic"
            :start="timelinePosition.start"
            :end="timelinePosition.end"
            :animationPercentage="entered"
        />
        <SlideTriangle class="overlay_triangle" :height="triangeHeight"/>
        <RainbowBackground
            class="overlay_rainbow"
            :animationPercentage="as.rainbow"
            effectType="grow"
        />
    </Slide>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import SlideTriangle from '@/components/Atoms/SlideTriangle.vue';
import easingFunctions from '@/helpers/easingFunctions';

@Component({
    components: {
        SlideTriangle,
        DiscoverFrontendGraphic: () => import('@/components/Illustrations/DiscoverFrontendGraphic.vue'),
        RainbowBackground: () => import('@/components/Molecules/RainbowBackground.vue'),
    },
})
export default class DiscoverFrontend extends SlideMixin {
    end:Point = new Point({ x: 90, y: 100 });

    constructor() {
        super();
        this.timeline = [
            { key: 'triangle_size', start: 0, end: 2 },
            { key: 'rainbow', start: 0.1, end: 0.6 },
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
    .overlay_rainbow
        position: absolute
        top: 0
        left: 0
        width: 100%
    .overlay_triangle
        position: absolute
        top: 0
        left: 0
        z-index: 2
</style>
