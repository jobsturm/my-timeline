<template>
    <!-- ESlint isn't dealing with SVGs nicely and since it's exported anyway -->
    <!-- maintainability isn't a big concern. -->
    <!-- eslint-disable -->
    <g @mousedown="startNote" class="music_note">
        <defs>
            <text :id="id" class="ddc__music_note" text-anchor="middle" :font-size="size" font-weight="normal" fill="#fff">
                <tspan>{{ note }}</tspan>
            </text>
        </defs>

        <g fill="#FFFFFF" :style="noteStyle">
            <use class="music_note__hover_filter" filter="url(#blue_glow)" :xlink:href="`#${id}`"></use>
            <use filter="url(#blue_glow)" :xlink:href="`#${id}`"></use>
            <use :xlink:href="`#${id}`"></use>
        </g>
    </g>
    <!-- eslint-enable -->
</template>

<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class MusicNote extends Vue {
    @Prop({ default: 0.5 }) readonly openPercentage: number

    private id:string;
    private note:string;
    private enableSound:boolean;
    private frequency:number;
    private audioContext:AudioContext;

    constructor() {
        super();
        const noteOptions = ['♪', '♬', '♫𝅳'];
        const frequencyOptions = [261.6, 440, 523.3];
        const random = Math.floor(Math.random() * noteOptions.length);
        this.id = Math.random().toString(36).substr(2, 11);
        this.note = noteOptions[random];
        this.frequency = frequencyOptions[random];
        this.enableSound = true;
    }

    get size():number {
        return this.windowWidth < 1000 ? 80 : 70;
    }
    get noteStyle():Record<string, number|string> {
        const percentage = this.openPercentage;
        return {
            opacity: percentage,
        };
    }

    startNote():void {
        if (!this.enableSound) return;
        if (!this.audioContext) this.audioContext = new AudioContext();
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        oscillator.frequency.value = this.frequency;
        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);
        oscillator.start(0);
        gain.gain.exponentialRampToValueAtTime(
            0.00001, this.audioContext.currentTime + 2,
        );
    }
}
</script>

<style lang="sass" scoped>
    .music_note:hover
        cursor: pointer
        .music_note__hover_filter
            opacity: 1
    .music_note__hover_filter
        opacity: 0
        transition: all 200ms
</style>
