<template>
    <Slide class="slide" ref="slide" background="#000000">
        <AudioControls
            class="audio_visualizer__controls"
            :audioVisualizer="audioVisualizer"
        />
        <AudioVizualization
            class="slide__illustration"
            :animationPercentage="entered"
            :audioDataArray="audioDataArray"
            :start="timelinePosition.start"
            :end="end"
        />
        <AudioAnimation
            :audioVisualizer="audioVisualizer"
            :audioDataArray="audioDataArray"
            :start="timelinePosition.start"
            :end="end"
        />
    </Slide>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import SlideMixin from '@/mixins/SlideMixin';
import Point from '@/classes/Point';
import Slide from '@/classes/Slide';
import Line from '@/classes/Line';
import AudioAnimation from '@/components/Molecules/AudioAnimation.vue';
import AudioVizualization from '@/components/Illustrations/AudioVisualization.vue';
import easingFunctions from '@/helpers/easingFunctions';
import Tune from '@/assets/sounds/android52 - ANDROID52 COLLECT - 09 The Story of the Girl That Fell from the Sky.mp3';
import AudioVisualizer from '@/helpers/AudioVisualizer';
import AudioControls from '@/components/Molecules/AudioControls.vue';

@Component({
    components: {
        AudioAnimation,
        AudioVizualization,
        AudioControls,
    },
})
export default class MusicVisualisationSlide extends SlideMixin {
    index:number;
    end:Point;
    playing:boolean;
    audioVisualizer:AudioVisualizer;
    audioDataArray:Uint8Array = new Uint8Array();

    constructor() {
        super();
        this.index = 7;
        this.audioVisualizer = new AudioVisualizer(
            Tune,
            this.setAudioData,
            50,
        );
        this.playing = false;
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
    @Watch('startTresholdPassed')
    public startPlaying():void {
        if (!this.startTresholdPassed) return;
        this.audioVisualizer.play();
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
        position: absolute
        top: 10px
        left: 10px
        z-index: 5
</style>
