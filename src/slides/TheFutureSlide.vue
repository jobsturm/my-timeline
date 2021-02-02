<template>
    <Slide class="slide" ref="slide" :background="colors.$marine_dark">
        <TheFutureGraphic
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
import TheFutureGraphic from '@/components/Illustrations/TheFutureGraphic.vue';

@Component({
    components: {
        TheFutureGraphic,
    },
})

export default class TheFutureSlide extends SlideMixin {
    end:Point;

    constructor() {
        super();
        this.end = new Point({ x: 50, y: 100 });
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
