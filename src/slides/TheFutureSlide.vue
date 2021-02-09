<template>
    <Slide class="slide" ref="slide" :background="colors.$marine_dark">
        <div class="slide__centerer">
            <main class="slide__content">
                <h1 class="slide__title">Job's looking for a job!</h1>
                <p class="slide__message">
                    So if you are looking for a good frontend-developer
                    and you think one of these timelines
                    should contain a partnership,
                    feel free to send me a message on LinkedIn!
                    Furthermore, this project is open source, so if you want to look
                    at how I work and build projects, you shoud check out the GitHub repo.
                </p>
                <a title="Job Sturm's LinkedIn Page" role="button" href="https://www.linkedin.com/in/job-sturm/">My LinkedIn</a>
                <a title="Job Sturm's Portfolio's repository" role="button" href="https://github.com/jobsturm/portfolio-2020/">The repo</a>
            </main>
        </div>
        <TheFutureGraphic
            class="slide__illustration"
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

    .slide__illustration,
    .slide__centerer
        position: absolute
        width: 100vw
        @include main.viewportHeight(100, 0)
        top: 0
        left: 0
    .slide__centerer
        z-index: 2
        display: flex
        justify-content: center
        align-items: center

    .slide__content
        max-width: 600px
        padding: 8px

    .slide__title
        @extend %headline3_style
        color: main.$white
        margin-bottom: 16px
    .slide__message
        @extend %body1_style
        color: main.$white
</style>
