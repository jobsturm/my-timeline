<template>
    <Slide class="slide" ref="slide" background="#000000">
        <div class="slide__illustration">
            <DDCreativeOutlets
                :start="timelinePosition.start"
                :end="timelinePosition.end"
                :animationPercentage="animationPercentage"
            />
        </div>
    </Slide>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import DDCreativeOutlets from '@/components/Illustrations/DigitalDiscoveries/DDCreativeOutlets.vue';
import Point from '@/classes/Point';
import easingFunctions from '@/helpers/easingFunctions';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';

@Component({
    components: {
        DDCreativeOutlets,
    },
})
export default class DDCreativeOutletsSlide extends SlideMixin {
    index = 5;
    end:Point = new Point({ x: 20, y: 100 });

    get animationPercentage():number {
        return easingFunctions.linear(this.entered);
    }
    get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    get lineStartPosition():Point {
        if (!this.previousSlide) return new Point({ x: 0, y: 0 });
        return new Point({
            x: this.previousSlide.line.end.x,
            y: 0,
        });
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

    .slide__triangle
        width: 100%
        height: 200px
        background: main.$grey_mineshaft
        fill: main.$grey_bg
    .slide__illustration
        position: absolute
        width: 100vw
        @include main.viewportHeight(100, 0)
        top: 0
        left: 0
</style>
