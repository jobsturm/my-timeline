<template>
    <svg class="dd__creative_outlets" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <text id="musical_indication" class="ddc__music_note" text-anchor="middle" font-family="AppleSymbols, Apple Symbols" font-size="180" font-weight="normal" fill="#FFFFFF">
                <tspan>𝄞</tspan>
            </text>
            <filter x="-35.2%" y="-14.2%" width="177.0%" height="128.5%" filterUnits="objectBoundingBox" id="blue_glow">
                <feOffset dx="2" dy="0" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur
                    stdDeviation="7.5"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                />
                <feColorMatrix
                    values="0 0 0 0 0   0 0 0 0 0.492406031   0 0 0 0 1  0 0 0 1 0"
                    type="matrix"
                    in="shadowBlurOuter1"
                />
            </filter>
        </defs>
        <g id="ddc__line">
            <AnimationPath ref="musicalScale0" :drawPercentage="as.timeline" :d="generateTimeLinePath(0)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath ref="musicalScale1" :drawPercentage="as.timeline" :d="generateTimeLinePath(2)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath ref="musicalScale2" :drawPercentage="as.timeline" :d="generateTimeLinePath(4)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath ref="musicalScale3" :drawPercentage="as.timeline" :d="generateTimeLinePath(6)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath ref="musicalScale4" :drawPercentage="as.timeline" :d="generateTimeLinePath(8)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
        </g>
        <g id="ddc__text" :transform="coords.noteGroupCoords.transform">
            <g id="𝄞" fill="#FFFFFF">
                <use filter="url(#blue_glow)" xlink:href="#musical_indication"></use>
                <use xlink:href="#musical_indication"></use>
            </g>
        </g>
        <g id="ddc__notes">
            <MusicNote
                v-for="noteCoords in getNotesCoords()"
                :key="noteCoords.x + noteCoords.y"
                :transform="`translate(${noteCoords.x}, ${noteCoords.y})`"
            />
        </g>
    </svg>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import MusicNote from '@/components/Atoms/MusicNote.vue';

@Component({
    components: {
        AnimationPath,
        MusicNote,
    },
})
export default class MusicCreation extends GraphicMixin {
    constructor() {
        super();
        this.graphicLayout = {
            noteGroupCoords: new Point({ x: 20, y: 12 }),
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 1 },
        ];
    }

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get musicScaleLineElements():Array<SVGPathElement>|null {
        if (!this.isMounted) return null;
        return [
            // Hopefully Vue 3 doesn't require these inline "as" statements anymore :/
            ((this.$refs.musicalScale0 as Vue).$el as SVGPathElement),
            ((this.$refs.musicalScale1 as Vue).$el as SVGPathElement),
            ((this.$refs.musicalScale2 as Vue).$el as SVGPathElement),
            ((this.$refs.musicalScale3 as Vue).$el as SVGPathElement),
            ((this.$refs.musicalScale4 as Vue).$el as SVGPathElement),
        ];
    }

    @Watch('windowSizeSum')
    getNotesCoords():any {
        if (!this.musicScaleLineElements) return null;
        const { musicScaleLineElements } = this;
        const noteFrequency = 250; // amount of pixels after which a new note is placed
        const noteCount = Math.floor(musicScaleLineElements[3].getTotalLength() / noteFrequency);
        let musicScaleIndex = 0;
        const noteCoords = [];

        for (let i = 0; i < noteCount; i += 1) {
            const musicScaleElement = musicScaleLineElements[musicScaleIndex];
            musicScaleIndex += 1;
            if (musicScaleIndex > 4) musicScaleIndex = 0;
            noteCoords.push(musicScaleElement.getPointAtLength((i * noteFrequency) + 250));
        }
        return noteCoords;
    }

    @Watch('windowSizeSum')
    generateTimeLinePath(offset:number):string {
        const relativeLineHeight = 8 / this.windowHeight * 100;
        const relativeLineWidth = 8 / this.windowWidth * 100;
        const startX:number = this.start.x + (offset * relativeLineWidth);
        const endX:number = this.end.x + (offset * relativeLineWidth);
        const path = new Path({
            points: [
                new Point({ x: startX, y: 0 }),
                new Point({ x: startX, y: 1 }),
                new Point({ x: 50, y: 50 - (offset * relativeLineHeight) }),
                new Point({ x: 50, y: 50 - (offset * relativeLineHeight) }),
                new Point({ x: endX, y: 99 + (offset * relativeLineHeight) }),
                new Point({ x: endX, y: 100 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .dd__creative_outlets
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2
    #ddc__text
        @extend %headline3_style
        fill: #FFFFFF
        font-size: 180px
    .ddc__music_note
        transform: rotateZ(90deg) translateY(20px)
        box-shadow: inset 0 0 10px #000000
</style>
