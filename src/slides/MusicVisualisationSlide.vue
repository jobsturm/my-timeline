<template>
    <Slide class="slide" ref="slide" background="#000000">
        <AudioControls
            v-if="showAudioControls"
            class="audio_visualizer__controls"
            :audioVisualizer="audioVisualizer"
        />
        <AudioVizualization
            class="slide__illustration"
            :animationPercentage="entered"
            :audioDataArray="audioDataArray"
            :start="timelinePosition.start"
            :end="end"
            :exited="exited"
        />
        <AudioAnimation
            :audioVisualizer="audioVisualizer"
            :audioDataArray="audioDataArray"
            :start="timelinePosition.start"
            :end="end"
        />
        <!--
            This exists because of the browser autoplay policies -
            there hasn't been interaction with the page before this point
        -->
        <button
            v-if="!audioVisualizer.autoplayAllowed"
            class="play_button"
            @click="audioVisualizer.play()"
        >
            <svg width="44px" height="36px" viewBox="0 0 11 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="play" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="play" transform="translate(-3.600000, 0.000000)" stroke="#fff">
                        <path d="M5.9389186,2.0228012 C6.32236757,2.00454173 6.7127823,2.1325631 7.01927552,2.4111933 L7.01927552,2.4111933 L13.028925,7.87451103 C13.3550225,8.2348627 13.5181726,8.64950938 13.5181726,9.05016501 C13.5181726,9.44945593 13.3543477,9.82965018 13.0460618,10.1099101 L13.0460618,10.1099101 L7.01927552,15.5888067 C6.74316757,15.8398139 6.38341539,15.9788966 6.01026632,15.9788966 C5.59605276,15.9788966 5.22105276,15.8110034 4.94960615,15.5395568 C4.67815954,15.2681102 4.51026632,14.8931102 4.51026632,14.4788966 L4.51026632,14.4788966 L4.51026632,3.52110341 C4.51026632,3.14795434 4.64934899,2.78820217 4.90035621,2.51209422 C5.17898641,2.205601 5.55546963,2.04106068 5.9389186,2.0228012 Z" id="play-Path-3"></path>
                    </g>
                </g>
            </svg>
        </button>
    </Slide>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import {
    State,
    Mutation,
} from 'vuex-class';

import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import easingFunctions from '@/helpers/easingFunctions';
import AudioVisualizer from '@/helpers/AudioVisualizer';

@Component({
    components: {
        AudioAnimation: () => import('@/components/Molecules/AudioAnimation.vue'),
        AudioVizualization: () => import('@/components/Illustrations/AudioVisualization.vue'),
        AudioControls: () => import('@/components/Molecules/AudioControls.vue'),
    },
})
export default class MusicVisualisationSlide extends SlideMixin {
    @State('audioPermission') audioPermission: boolean;
    @Mutation('setAudioPermission') readonly setAudioPermission: CallableFunction;
    end:Point;
    playing:boolean;
    showAudioControls: boolean;
    audioVisualizer:AudioVisualizer;
    audioDataArray:Uint8Array = new Uint8Array();

    constructor() {
        super();
        this.audioVisualizer = new AudioVisualizer(
            'assets/sounds/android52 - ANDROID52 COLLECT - 09 The Story of the Girl That Fell from the Sky.mp3',
            this.setAudioData,
            50,
            () => {
                this.audioOnPlayHandler();
            },
        );
        this.playing = false;
        this.showAudioControls = false;
        this.end = new Point({ x: 8, y: 100 });
    }

    public get animationPercentage():number {
        return easingFunctions.linear(this.entered);
    }
    private get previousSlide():Slide|null {
        return this.slides[this.index - 1];
    }
    private get lineStartPosition():Point {
        if (!this.previousSlide) return new Point({ x: 0, y: 0 });
        return this.previousSlide.line.end;
    }
    private get timelinePosition():Line {
        return new Line({
            start: new Point({ x: this.lineStartPosition.x, y: 0 }),
            end: this.end,
        });
    }
    private get startTresholdPassed():boolean {
        return this.entered > -0.20;
    }
    public setAudioData(dataArray:Uint8Array):void {
        this.audioDataArray = dataArray.slice();
    }
    public playButtonClickHandler():void {
        this.setAudioPermission(true);
        this.startPlaying();
    }
    @Watch('startTresholdPassed')
    public startPlaying():void {
        if (!this.startTresholdPassed || !this.audioPermission) return;
        this.audioVisualizer.play();
    }
    private audioOnPlayHandler() {
        this.$gtag.event('audio_play', {
            event_category: 'Audio',
            event_label: 'Audio Playing',
            value: 0,
        });
        this.showAudioControls = true;
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
        z-index: 3
        pointer-events: none
        @include main.viewportHeight(100, 0)
        top: 0
        left: 0
    .audio_visualizer__controls
        position: fixed
        top: 10px
        left: 10px
        z-index: 6
    $play_button_size: 56px
    .play_button
        position: absolute
        top: calc(62% + 22px)
        left: calc(50% - #{$play_button_size / 2})
        width: $play_button_size
        height: $play_button_size
        z-index: 5
        background: rgba(0,0,0,0)
        border: 2px solid main.$white
        border-radius: 8px
</style>
