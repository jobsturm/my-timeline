<template>
    <section
        class="slide"
        ref="slide"
    >
        <DiscoverComputer
            class="slide__school_doodle"
            :animationPercentage="animationPercentage"
            :start="lineStartPosition"
            :end="lineStartPosition"
        />
    </section>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Component, Watch } from 'vue-property-decorator';
import {
    State,
    Mutation,
} from 'vuex-class';
import DiscoverComputer from '@/components/Illustrations/DiscoverComputer.vue';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import Point from '@/classes/Point';
import slideMixin from '@/mixins/slideMixin';
import easingFunctions from '@/helpers/easingFunctions';
import minMax from '@/helpers/minMax';
import animationStep from '@/helpers/animationStep';

@Component({
    components: {
        DiscoverComputer,
    },
})
export default class ComputerSlide extends mixins(slideMixin) {
    index = 2;
    animationState = 'start';
    end:Point = new Point({ x: 20, y: 100 });

    get animationPercentage():number {
        return easingFunctions.linear(this.entered);
    }
    get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    get lineStartPosition():Point {
        if (!this.previousSlide) {
            return {
                x: 0,
                y: 0,
            };
        }
        return this.previousSlide.line.end;
    }
    @Watch('windowSizeSum')
    updateLine() {
        const { start, end } = this.getTimelinePosition();
        this.updateSlide({
            index: this.index,
            line: new Line({ start, end }),
        });
    }
    getTimelinePosition() {
        if (!this.lineStartPosition) {
            return {
                start: new Point({ x: 0, y: 0 }),
                end: new Point({ x: 0, y: 0 }),
            };
        }
        const start = this.lineStartPosition;
        const end = new Point({
            x: 0,
            y: 222,
        });
        return {
            start,
            end,
        };
    }

    mounted() {
        const { start, end } = this.getTimelinePosition();

        this.registerSlide(
            new Slide({
                index: this.index,
                line: new Line({ start, end }),
            }),
        );
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .slide
        width: 100vw
        height: 100vh
        position: relative
        background: main.$grey_bg
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        flex-direction: column
</style>
