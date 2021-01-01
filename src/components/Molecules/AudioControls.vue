<template>
    <div class="audio_controls">
        <button
            v-if="this.audioVisualizer.isPlaying"
            class="audio_controls__button audio_controls__button--pause"
            @click="audioVisualizer.pause()"
        >
            <svg width="10px" height="14px" viewBox="0 0 10 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="pause-Rectangle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="pause" transform="translate(-4.000000, -2.000000)" stroke="#fff">
                        <rect id="pause-Rectangle" x="10.5" y="2.5" width="3" height="13"></rect>
                        <rect id="pause-Rectangle" x="4.5" y="2.5" width="3" height="13"></rect>
                    </g>
                </g>
            </svg>
        </button>
        <button
            v-else
            class="audio_controls__button audio_controls__button--play"
            @click="audioVisualizer.play()"
        >
            <svg width="11px" height="16px" viewBox="0 0 11 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <g id="play" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="play" transform="translate(-4.000000, -1.000000)" stroke="#fff">
                        <path d="M5.9389186,2.0228012 C6.32236757,2.00454173 6.7127823,2.1325631 7.01927552,2.4111933 L7.01927552,2.4111933 L13.028925,7.87451103 C13.3550225,8.2348627 13.5181726,8.64950938 13.5181726,9.05016501 C13.5181726,9.44945593 13.3543477,9.82965018 13.0460618,10.1099101 L13.0460618,10.1099101 L7.01927552,15.5888067 C6.74316757,15.8398139 6.38341539,15.9788966 6.01026632,15.9788966 C5.59605276,15.9788966 5.22105276,15.8110034 4.94960615,15.5395568 C4.67815954,15.2681102 4.51026632,14.8931102 4.51026632,14.4788966 L4.51026632,14.4788966 L4.51026632,3.52110341 C4.51026632,3.14795434 4.64934899,2.78820217 4.90035621,2.51209422 C5.17898641,2.205601 5.55546963,2.04106068 5.9389186,2.0228012 Z" id="play-Path-3"></path>
                    </g>
                </g>
            </svg>
        </button>
        <div class="audio_visualizer__slider--container">
            <input
                class="audio_visualizer__slider"
                v-model="volume"
                type="range"
                min="0"
                max="100"
            />
        </div>
    </div>
</template>

<script lang="ts">
import {
    Prop, Component, Vue, Watch,
} from 'vue-property-decorator';
import AudioVisualizer from '@/helpers/AudioVisualizer';

@Component
export default class AudioControls extends Vue {
    @Prop({ required: true }) readonly audioVisualizer: AudioVisualizer

    volume:number;

    constructor() {
        super();
        this.volume = this.audioVisualizer.volume;
    }

    @Watch('volume')
    private setVolume():void {
        this.audioVisualizer.setVolume(this.volume);
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .audio_controls
        display: flex
        background: rgba(main.$black, 0.5)
        opacity: 0.2
        transition: all 200ms
        &:hover
            opacity: 1
            background: rgba(main.$black, 1)

    .audio_controls__button
        border: 1px solid main.$white
        border-radius: 4px
        background: rgba(0,0,0,0)
        outline: 0
        width: 30px
        height: 30px
        padding: 0px
        margin-right: 8px
        display: flex
        justify-content: center
        align-items: center
        &:hover
            cursor: pointer

        svg
            margin-top: -2px

    .audio_visualizer__slider--container
        border: 1px solid main.$white
        border-radius: 4px
        height: 28px
        padding: 0 6px
        display: flex
        justify-content: center
        align-items: center
</style>
