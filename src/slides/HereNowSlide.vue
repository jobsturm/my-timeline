<template>
    <Slide class="slide" ref="slide" :background="backgroundColor">
        <HereNowGraphic
            class="illustration"
            :animationPercentage="entered"
            :start="timelinePosition.start"
            :end="end"
        />
    </Slide>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import HereNowGraphic from '@/components/Illustrations/HereNowGraphic.vue';
import animationStep from '@/helpers/animationStep';
import Color from 'color';

@Component({
    components: {
        HereNowGraphic,
    },
})

export default class HereNowSlide extends SlideMixin {
    end:Point;

    constructor() {
        super();
        this.end = new Point({ x: 50, y: 30 });
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
    get backgroundColor(): string {
        const percentage = animationStep({
            parentPercentage: this.exited,
            start: 0,
            end: 1,
        });
        const startColor = Color(this.colors.$marine_dark);
        const endColor = Color(this.colors.$marine_light);
        const color = startColor.mix(endColor, percentage);
        return color;
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
        width: 100vw
        @include main.viewportHeight(100, 0)
        background: main.$black
        position: relative

    .slide__illustration
        position: absolute
        width: 100vw
        @include main.viewportHeight(100, 0)
        top: 0
        left: 0
</style>
