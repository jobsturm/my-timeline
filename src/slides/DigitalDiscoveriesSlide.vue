<template>
    <section class="slide" ref="slide">
        <div class="slide__illustration">
            <DDIntro
                :start="timelinePosition.start"
                :end="timelinePosition.end"
                :animationPercentage="animationPercentage"
            />
        </div>
        <svg class="slide__triangle">
            <polygon :points="trianglePoints"></polygon>
        </svg>
    </section>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import slideMixin from '@/mixins/slideMixin';
import DDIntro from '@/components/Illustrations/DigitalDiscoveries/DDIntro.vue';
import Point from '@/classes/Point';
import easingFunctions from '@/helpers/easingFunctions';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';

@Component({
    components: {
        DDIntro,
    },
})
export default class DigitalDiscoveriesSlide extends slideMixin {
    index = 3;
    end:Point = new Point({ x: 80, y: 100 });

    get trianglePoints():string {
        return `0,0 0,200 ${this.windowWidth},0`;
    }
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

    mounted() {
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
        height: 100vh
        background: main.$grey_mineshaft
        position: relative

    .slide__triangle
        width: 100%
        height: 200px
        background: main.$grey_mineshaft
        fill: main.$grey_bg

    .slide__illustration
        position: absolute
        width: 100vw
        height: 100vh
        top: 0
        left: 0
</style>
