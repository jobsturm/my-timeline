<template>
    <section
        class="slide"
        ref="slide"
    >
        <SchoolDoodle
            class="slide__school_doodle"
            :animationPercentage="animationPercentage"
            :start="lineStart"
            :end="lineEnd"
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
import SchoolDoodle from '@/components/Illustrations/SchoolDoodle.vue';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import Point from '@/classes/Point';
import slideMixin from '@/mixins/slideMixin';
import easingFunctions from '@/helpers/easingFunctions';
import minMax from '@/helpers/minMax';
import animationStep from '@/helpers/animationStep';

@Component({
    components: {
        SchoolDoodle,
    },
})
export default class SchoolSlide extends slideMixin {
    index = 1;
    animationState = 'start';
    lineEnd:Point = new Point({
        x: 90,
        y: 100,
    });

    get animationPercentage():number {
        return easingFunctions.easeInQuad(this.entered);
    }
    get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    get lineStart():Point {
        if (!this.previousSlide) return new Point({ x: 0, y: 0 });
        return this.previousSlide.line.end;
    }

    @Watch('windowSizeSum')
    updateLine() {
        const { start, end } = this.getLine();
        this.updateSlide({
            index: this.index,
            line: new Line({ start, end }),
        });
    }
    getLine():Line {
        if (!this.lineStart) {
            return new Line({
                start: new Point({ x: 0, y: 0 }),
                end: new Point({ x: 0, y: 0 }),
            });
        }
        const start = this.lineStart;
        const end = this.lineEnd;
        return new Line({ start, end });
    }

    mounted() {
        const { start, end } = this.getLine();
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
