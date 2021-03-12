<template>
    <Slide
        class="header"
        :class="animationClass"
        ref="slide"
    >
        <main class="header__intro">
            <h1 class="header__title">Job Sturm</h1>
            <h2 class="header__subtitle">
                <span class="header__subtitle_transition header__subtitle_transition--opening">
                    Frontend Developer
                </span>
                <span class="header__subtitle_transition header__subtitle_transition--end">
                    My timeline
                </span>
            </h2>
        </main>
        <div class="header__background_graphic">
            <div class="timeline_bar" ref="timeline"/>
        </div>
        <div class="header__audio_consent_prompt" @click="setAudioPermission(!audioPermission)">
            <label for="audio_allow_checkbox">Allow audio to be played later on?</label>
            <input
                id="audio_allow_checkbox"
                :checked="audioPermission"
                @input="setAudioPermission(!audioPermission)"
                type="checkbox"
            />
            <div
                class="toggle"
                :class="{
                    'toggle--toggled': audioPermission,
                }"
            ></div>
        </div>
    </Slide>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import {
    State,
    Mutation,
} from 'vuex-class';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import Point from '@/classes/Point';
import SlideMixin from '@/mixins/SlideMixin';

@Component
export default class IntroSlide extends SlideMixin {
    @State('audioPermission') audioPermission: boolean;
    @Mutation('setAudioPermission') readonly setAudioPermission: CallableFunction;
    animationState:string;

    constructor() {
        super();
        this.animationState = 'start';
    }
    get animationClass():string {
        return `header--${this.animationState}`;
    }
    @Watch('windowSizeSum')
    updateLine(): void {
        const { start, end } = this.getTimelinePosition();
        this.updateSlide({
            index: this.index,
            line: new Line({ start, end }),
        });
    }
    getTimelinePosition(): Line {
        const timelineElement = this.$refs.timeline as HTMLElement;
        const timelinePosition = timelineElement.getBoundingClientRect();
        const start = new Point({
            x: timelinePosition.left + 8,
            y: timelineElement.offsetTop,
        });
        const end = new Point({
            x: timelinePosition.left + 8,
            y: timelineElement.offsetTop + timelinePosition.height,
        });
        return new Line({
            start,
            end,
        });
    }
    mounted():void {
        setTimeout(() => {
            this.animationState = 'timeline-slid-in';
        }, 750);
        setTimeout(() => {
            this.animationState = 'timeline-showing';
        }, 750 + 900);
        setTimeout(() => {
            this.animationState = 'timeline-animation-complete';
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

    .header
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        background: main.$grey_bg
        display: flex
        justify-content: center
        align-items: center
        overflow: hidden
        flex-direction: column

    .header .header__intro
        z-index: 2
        transition: all 900ms cubic-bezier(0.7,0,0.3,1)

    .header__title
        @extend %headline1_style
        color: main.$black
        @media (max-width: 768px)
            font-size: 4em
        @media (max-width: 400px)
            font-size: 3em


    .header__subtitle
        @extend %headline4_style
        color: main.$black
        position: relative
        @media (max-width: 768px)
            font-size: 1.8em
        @media (max-width: 400px)
            font-size: 1.4em

    .header__subtitle_transition
        position: absolute
    .header__subtitle_transition--opening,
    .header__subtitle_transition--end
        transition: all 900ms cubic-bezier(0.7,0,0.3,1)

    .header__subtitle_transition--end
        transform: translateY(-30px)
        opacity: 0

    .header__background_graphic
        background: main.$grey_bg
        width: 100%
        height: 100%
        position: absolute
        top: 0
        left: 0

    .timeline_bar
        width: 16px
        height: 0vh
        position: absolute
        left: calc(50% - 282px)
        top: calc(50% + 40px)
        background: linear-gradient(lighten(main.$primary, 20), main.$primary)
        transform: translateY(calc(50vh + 40px))
        transition: all 900ms cubic-bezier(0.7,0,0.3,1)
        @media (max-width: 768px)
            left: calc(50% - 150px)
        @media (max-width: 400px)
            left: calc(50% - 110px)

        &:before
            position: absolute
            display: inline-block
            content: ''
            width: 80px
            height: 80px
            background: main.$primary
            margin-left: 8px
            transform: translate(-50%, -75px)
            border-radius: 50%
            @media (max-width: 400px)
                width: 60px
                height: 60px
                transform: translate(-50%, -55px)

    .header__audio_consent_prompt
        @extend %body2_style
        opacity: 0
        transition: all 180ms cubic-bezier(0.7,0,0.3,1)
        display: inline-block
        position: absolute
        bottom: 20px
        left: calc(50% - 200px)
        right: 12px

        @media (max-width: 768px)
            left: calc(50% - 80px)
        @media (max-width: 400px)
            left: calc(50% - 48px)

        :hover
            cursor: pointer
        input
            display: none
        label
            display: block
    .toggle
        width: 32px
        height: 12px
        border-radius: 8px
        margin-top: 8px
        background: rgba(#C24242, 0.2)
        position: relative
        transition: all 180ms cubic-bezier(0.7,0,0.3,1)
        &:before
            display: block
            position: relative
            content: ''
            height: 16px
            width: 16px
            background: #C24242
            top: -2px
            border-radius: 16px
            transition: all 180ms cubic-bezier(0.7,0,0.3,1)
            transform: translateX(0px)
    .toggle--toggled
        background: rgba(main.$primary, 0.2)
        &:before
            background: main.$primary
            transform: translateX(16px)

    // Animations
    .header--timeline-animation-complete,
    .header--timeline-slid-in,
    .header--timeline-showing
        .header__intro
            transform: translate(0px, 5px) scale(0.8)
            @media (max-width: 768px)
                transform: translate(50px, 5px) scale(0.8)
        .timeline_bar
            transform: translateY(0%)

    .header--timeline-animation-complete,
    .header--timeline-showing
        .timeline_bar
            height: 50vh
        .header__subtitle_transition--opening
            transform: translateY(60vh)
        .header__subtitle_transition--end
            transform: translateY(0px)
            opacity: 1

    .header--timeline-animation-complete
        .header__audio_consent_prompt
            opacity: 1
</style>
