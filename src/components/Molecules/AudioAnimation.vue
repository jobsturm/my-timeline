<template>
    <div class="audio_visualizer">
        <button @click="audioVisualizer.play()">Play</button>
        <button @click="audioVisualizer.pause()">Pause</button>
        <h1 class="headline01">
            {{ this.audioDataArray[39] }}
        </h1>
        <h1 class="headline01">
            active:
            <span v-if="kickIsActive">KICK</span>
            <span v-if="hiHatIsActive">HI-HAT</span>
        </h1>
        <input v-model="testFreq"/>
        <div class="audio_bars">
            <div
                v-for="(audioBar, index) in audioDataArray"
                :key="`audio_visualizer_bar_${index}`"
                :style="{
                    height: `${audioBar}px`,
                    background: color,
                }"
                class="audio_bar"
            >
                {{ index }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import Point from '@/classes/Point';
import AudioVisualizer from '@/helpers/AudioVisualizer';
import Tune from '@/assets/sounds/android52 - ANDROID52 COLLECT - 09 The Story of the Girl That Fell from the Sky.mp3';

@Component
export default class AudioAnimation extends GraphicMixin {
    @Prop({ required: true }) readonly isPlayingAudio: boolean

    graphicLayout = {
        textCoords: new Point({ x: 65, y: 43 }),
        textCoordsB500: new Point({ x: 90, y: 30 }),
        textCoordsB400: new Point({ x: 95, y: 30 }),
    }
    timeline = [
        { key: 'timeline', start: 0, end: 1 },
    ]
    audioVisualizer:AudioVisualizer;
    audioDataArray:Uint8Array = new Uint8Array();
    colors:Array<string>;
    colorIndex:number;
    testFreq:number;

    constructor() {
        super();
        this.audioVisualizer = new AudioVisualizer(
            Tune,
            this.setAudioData,
        );
        this.colors = ['red', 'yellow', 'green', 'blue'];
        this.colorIndex = 0;
        this.testFreq = 160;
    }

    private get kickIsActive():boolean {
        return (this.audioDataArray[2] > 250);
    }
    private get hiHatIsActive():boolean {
        return (
            this.audioDataArray[24] > this.testFreq
            && this.audioDataArray[39] > 150
        );
    }
    private get color():string {
        return this.colors[this.colorIndex];
    }

    public setAudioData(dataArray:Uint8Array):void {
        this.audioDataArray = dataArray.slice();
    }
    @Watch('isPlayingAudio')
    private startPlaying():void {
        if (!this.isPlayingAudio) return;
        this.audioVisualizer.play();
    }
    @Watch('kickIsActive')
    private onKick():void {
        if (!this.kickIsActive) return;
        this.colorIndex += 1;
        if (this.colorIndex > this.colors.length - 1) {
            this.colorIndex = 0;
        }
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .audio_visualizer
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        background: main.$black
        z-index: 2
        .headline01
            color: white

    .audio_bars
        display: flex
        width: 100vw

    .audio_bar
        width: 100px
        height: 15px
        background: red
        color: white
        text-align: left
        font-size: 13px
        border: 1px solid black
        text-shadow: 1px 1px black
        writing-mode: vertical-rl
        text-orientation: mixed
</style>
