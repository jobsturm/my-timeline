<template>
    <div class="audio_visualizer">
        <div class="audio_visualizer__gradient_in"/>
        <div class="audio_visualizer__gradient_out"/>
        <MusicNotesCanvas
            class="audio_visualizer__canvas"
            :kickIsActive="kickIsActive"
            :hiHatIsActive="hiHatIsActive"
        />
        <!-- <div class="debug">
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
                    {{ index }} - {{ audioBar }}
                </div>
            </div>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import Point from '@/classes/Point';
import MusicNotesCanvas from '@/components/Illustrations/MusicNotesCanvas.vue';
import AudioVisualizer from '@/helpers/AudioVisualizer';

@Component({
    components: {
        MusicNotesCanvas,
    },
})
export default class AudioAnimation extends GraphicMixin {
    @Prop({ required: true }) readonly audioVisualizer: AudioVisualizer
    @Prop({ required: true }) readonly audioDataArray: Uint8Array

    graphicLayout = {
        textCoords: new Point({ x: 65, y: 43 }),
        textCoordsB500: new Point({ x: 90, y: 30 }),
        textCoordsB400: new Point({ x: 95, y: 30 }),
    }
    timeline = [
        { key: 'timeline', start: 0, end: 1 },
    ]
    colors:Array<string>;
    colorIndex:number;
    testFreq:number;

    constructor() {
        super();
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
    private get isPlaying():boolean {
        return this.audioVisualizer.isPlaying;
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
    .audio_visualizer__canvas
        position: absolute
        width: 100%
        height: 100%
        top: 0px
        left: 0px
    .audio_visualizer__gradient_in,
    .audio_visualizer__gradient_out
        position: absolute
        width: 100%
        height: 144px
        left: 0px
        z-index: 3

    .audio_visualizer__gradient_in
        background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 11%, rgba(0,0,0,0) 92%)
        top: 0px
    .audio_visualizer__gradient_out
        background: linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 11%, rgba(0,0,0,0) 92%)
        bottom: 0px

    .debug
        position: absolute
        width: 100%
        height: 100%
        top: 0px
        left: 0px
        opacity: 0.9
        z-index: 4
        .headline01
            color: white
    .audio_bars
        display: flex
        width: 100vw
        overflow: auto
        white-space: nowrap
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
