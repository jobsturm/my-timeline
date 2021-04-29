<template>
    <Slide class="slide" ref="slide" :background="backgroundColor">
        <div class="slide__centerer">
            <main class="slide__content">
                <h1 class="slide__title">I'm happily employed!</h1>
                <p class="slide__message">
                    And not accepting any offers at this time!
                </p>
                <a
                    class="slide_button"
                    target="_blank"
                    title="Job Sturm's LinkedIn Page"
                    role="button"
                    href="https://www.linkedin.com/in/job-sturm/"
                >
                    <img
                        class="slide_button__logo"
                        aria-hidden
                        alt="LinkedIn logo"
                        src="@/assets/logos/linkedin-brands.svg"
                    />
                    My LinkedIn
                </a>
                <a
                    class="slide_button"
                    target="_blank"
                    title="Job Sturm's Portfolio's repository"
                    role="button"
                    href="https://github.com/jobsturm/portfolio-2020/"
                >
                    <img
                        class="slide_button__logo"
                        aria-hidden
                        alt="Github's logo"
                        src="@/assets/logos/github-brands.svg"
                    />
                    The repo
                </a>
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
import Color from 'color';

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
        this.timeline = [
            { key: 'background', start: 0, end: 1 },
        ];
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
    get backgroundColor(): string {
        const startColor = Color(this.colors.$marine_dark);
        const endColor = Color(this.colors.$marine_light);
        const color = startColor.mix(endColor, this.as.background);
        return color;
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
    $button_spacing: 12px

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
        padding: 12px
    .slide__title
        @extend %headline3_style
        color: main.$white
        margin-bottom: 16px
        @media (max-width: 368px)
            font-size: min(70px, 11vw)
    .slide__message
        @extend %body1_style
        color: main.$white
        margin-bottom: 16px
    .slide_button
        @extend %body1_style
        transition: all 100ms
        display: inline-flex
        align-items: center
        padding: 16px
        border-radius: 4px
        border: 1px solid lighten(main.$primary, 8)
        color: main.$white
        text-decoration: none
        background: main.$primary
        white-space: nowrap
        margin: $button_spacing $button_spacing 0px 0px
        &:hover
            transition: all 170ms
            border: 1px solid main.$white
        @media (max-width: 368px)
            font-size: 14px
    .slide_button__logo
        height: 24px
        margin: 0px 12px 0px 0px
        padding: 0px
        @media (max-width: 368px)
            height: 18px
</style>
