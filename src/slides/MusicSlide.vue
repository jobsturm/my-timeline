<template>
    <Slide class="slide" ref="slide" background="#000000">
        <div class="slide__illustration">
            <MusicCreation
                :animationPercentage="animationPercentage"
                :start="timelinePosition.start"
                :end="timelinePosition.end"
            />
        </div>
    </Slide>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import easingFunctions from '@/helpers/easingFunctions';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';

@Component({
    components: {
        MusicCreation: () => import('@/components/Illustrations/MusicCreation.vue'),
    },
})
export default class MusicSlide extends SlideMixin {
    end:Point = new Point({ x: 87, y: 100 });

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
    get timelinePosition():Line {
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
