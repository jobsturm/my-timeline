<template>
    <Slide
        class="slide"
        ref="slide"
    >
        <DiscoverComputer
            class="slide__graphic"
            :animationPercentage="animationPercentage"
            :start="timelinePosition.start"
            :end="timelinePosition.end"
        />
    </Slide>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DiscoverComputer from '@/components/Illustrations/DiscoverComputer.vue';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import Point from '@/classes/Point';
import SlideMixin from '@/mixins/SlideMixin';
import easingFunctions from '@/helpers/easingFunctions';

@Component({
    components: {
        DiscoverComputer,
    },
})
export default class ComputerSlide extends SlideMixin {
    animationState = 'start';
    end:Point = new Point({ x: 45, y: 100 });

    get animationPercentage():number {
        return easingFunctions.linear(this.entered);
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
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        flex-direction: column

    .slide__graphic
        width: 100vw
        @include main.viewportHeight(100, 0)
</style>
