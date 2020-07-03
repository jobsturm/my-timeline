<template>
    <section
        class="slide"
        :class="animationClass"
        ref="slide"
    >
        <div class="slide__content">
        </div>
        <SchoolDoodle
            class="slide__school_doodle"
            :animationPercentage="schoolDoodleAnimationPercentage"
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
export default class Childhood extends mixins(slideMixin) {
    index = 1;
    animationState = 'start';

    get animationClass():string {
        return `header--${this.animationState}`;
    }
    get animationPercentage():number {
        return easingFunctions.easeInQuad(this.entered);
    }
    get schoolDoodleAnimationPercentage():number {
        return animationStep({
            parentPercentage: this.animationPercentage,
            start: 0.2,
            end: 1,
        });
    }
    get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    get lineStartPosition():Point|null {
        if (!this.previousSlide) return null;
        return this.previousSlide.line.end;
    }
    get lineStartX():number {
        let lineStartX = 0;
        if (this.lineStartPosition) lineStartX = Math.round(this.lineStartPosition.x);
        return lineStartX;
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
        setTimeout(() => {
            this.animationState = 'timeline-slid-in';
        }, 750);
        setTimeout(() => {
            this.animationState = 'timeline-showing';
        }, 750 + 900);
        setTimeout(() => {
            this.updateLine();
        }, 750 + 900 + 900);

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

    .slide__content
        width: 100vw
        height: 100vh
        position: relative
        top: 0px
        left: 0px
        z-index: 1

    .slide__background_graphic
        background: main.$grey_bg
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0

    .year_indicator
        @extend %headline6_style

    .slide__school_doodle
        position: absolute
</style>
