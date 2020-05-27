<template>
    <section
        class="slide"
        :class="animationClass"
        ref="slide"
    >
        <div class="slide__content">
        </div>
        <svg class="slide__background_graphic">
            <g class="year_indicator" >
                <text :x="lineStartX - 60" :y="20" style="fill: #056CF2;">1996</text>
                <text :x="lineStartX + 28" :y="20" style="fill: #056CF2;">Born</text>
                <path :d="svgPath" fill="#056CF2"/>
            </g>
            <path :d="svgPath" fill="#056CF2"/>
        </svg>
    </section>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component';
import { Vue, Component, Watch } from 'vue-property-decorator';
import {
    State,
    Mutation,
} from 'vuex-class';
import Slide from '../classes/Slide';
import Line from '../classes/Line';
import Point from '../classes/Point';
import slideMixin from '../mixins/slideMixin';
import easingFunctions from '../helpers/easingFunctions';

console.log(easingFunctions);

@Component
export default class Head extends mixins(slideMixin) {
    @State('slides') slides!:Array<Slide>;

    @Mutation('registerSlide') registerSlide!:Function;

    @Mutation('updateSlide') updateSlide!:Function;

    index = 1;

    animationState = 'start';

    get animationClass():string {
        return `header--${this.animationState}`;
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

    get svgPath():string {
        return `
            M ${this.lineStartX} 0
            H ${this.lineStartX + 16}
            V ${this.height * easingFunctions.easeInQuad(this.entered)}
            H ${this.lineStartX}
            Z
        `;
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
</style>
