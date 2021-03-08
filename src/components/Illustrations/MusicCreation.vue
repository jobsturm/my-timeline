<template>
    <svg class="dd__creative_outlets" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <text id="musical_indication" class="ddc__music_note" text-anchor="middle" font-size="180" font-weight="normal" fill="#FFFFFF">
                <tspan>𝄞</tspan>
            </text>
            <text id="intro_text" class="title text" text-anchor="start" font-family="AppleSymbols, Apple Symbols" font-size="180" font-weight="normal" fill="#FFFFFF">
                <tspan>Like...</tspan>
            </text>
            <text id="outro_text" class="text" text-anchor="start" font-family="AppleSymbols, Apple Symbols" font-size="180" font-weight="normal" fill="#FFFFFF">
                <template v-if="windowWidth > 500">
                    <tspan>Creating Music</tspan>
                </template>
                <template v-else>
                    <tspan>Creating</tspan>
                    <tspan x="0" dy="52">Music</tspan>
                </template>
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
        <g id="top_text" :transform="responsiveCoords.introText.transform">
            <g id="top__text__animation_container" :style="introTransform">
                <use filter="url(#blue_glow)" xlink:href="#intro_text"></use>
                <use xlink:href="#intro_text"></use>
            </g>
        </g>
        <g id="bottom_text" :transform="responsiveCoords.outroText.transform">
            <g id="top__text__animation_container" :style="outroTransform">
                <use filter="url(#blue_glow)" xlink:href="#outro_text"></use>
                <use xlink:href="#outro_text"></use>
            </g>
        </g>
        <g id="ddc__line">
            <AnimationPath :drawPercentage="as.timeline" :d="generateTimeLinePath(0)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="generateTimeLinePath(2)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="generateTimeLinePath(4)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="generateTimeLinePath(6)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="generateTimeLinePath(8)" class="dd__creative_outlets_general_path" id="dd__creative_outlets_general_path" stroke="#FFFFFF" stroke-width="4" fill="none"/>
        </g>
        <g id="ddc__text" :transform="coords.musicalIndication.transform">
            <g id="𝄞" fill="#FFFFFF">
                <use filter="url(#blue_glow)" xlink:href="#musical_indication"></use>
                <use xlink:href="#musical_indication"></use>
            </g>
        </g>
        <g id="ddc__notes">
            <MusicNote
                v-for="(noteCoords) in notesCoords"
                :key="noteCoords.x + noteCoords.y"
                :openPercentage="as[noteCoords.ID]"
                :transform="`
                    translate(${noteCoords.x}, ${noteCoords.y})
                    rotate(${noteCoords.degrees}, 0, 0)
                `"
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
import RotationPoint from '@/classes/RotationPoint';
import Path from '@/classes/Path';
import MusicNote from '@/components/Atoms/MusicNote.vue';
import GraphicLocation from '@/classes/GraphicLocation';

@Component({
    components: {
        AnimationPath,
        MusicNote,
    },
})
export default class MusicCreation extends GraphicMixin {
    notes:Record<string, RotationPoint> = {
        note1: new RotationPoint({ x: 20, y: 32, degrees: 90 }),
        note2: new RotationPoint({ x: 30, y: 44, degrees: 30 }),
        note3: new RotationPoint({ x: 50, y: 48, degrees: 0 }),
        note4: new RotationPoint({ x: 66, y: 48, degrees: 25 }),
        note5: new RotationPoint({ x: 82, y: 58, degrees: 78 }),
        note6: new RotationPoint({ x: 88, y: 76, degrees: 90 }),
        note7: new RotationPoint({ x: 87, y: 95, degrees: 90 }),
    }

    constructor() {
        super();
        this.graphicLayout = {
            musicalIndication: new Point({ x: 20, y: 12 }),
            introText: new Point({ x: 35, y: 25 }),
            introTextMobile: new Point({ x: 45, y: 25 }),
            outroText: new Point({ x: 35, y: 75 }),
            outroTextMobile: new Point({ x: 5, y: 75 }),
            ...this.notes,
        };
        this.timeline = [
            { key: 'timeline', start: 0, end: 1 },
            { key: 'introText', start: 0.2, end: 0.7 },
            { key: 'outroText', start: 0.6, end: 0.9 },
            { key: 'note1', start: 0.4, end: 0.5 },
            { key: 'note2', start: 0.4, end: 0.6 },
            { key: 'note3', start: 0.5, end: 0.65 },
            { key: 'note4', start: 0.6, end: 0.7 },
            { key: 'note5', start: 0.75, end: 0.9 },
            { key: 'note6', start: 0.86, end: 0.95 },
            { key: 'note7', start: 0.7, end: 1 },
        ];
    }

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get introTransform():Record<string, number|string> {
        const percentage = this.as.introText;
        const transformTop = -100 + (100 * percentage);
        return {
            transform: `translateY(${transformTop}px)`,
            opacity: percentage,
        };
    }
    get outroTransform():Record<string, number|string> {
        const percentage = this.as.outroText;
        const transformTop = -100 + (100 * percentage);
        return {
            transform: `translateY(${transformTop}px)`,
            opacity: percentage,
        };
    }
    get notesCoords():Array<Record<string, string|number>> {
        const notes = ['note1', 'note3', 'note5', 'note6', 'note7'];
        const notesDesktop = ['note2', 'note4'];
        const noteCoords:Array<Record<string, string|number>> = [];

        let noteCoordIDs = notes;
        if (this.windowWidth > 1000) noteCoordIDs = [...notes, ...notesDesktop];

        noteCoordIDs.forEach((ID) => {
            noteCoords.push({
                ID,
                ...this.notes[ID],
                ...this.coords[ID],
            });
        });
        return noteCoords;
    }
    get responsiveCoords():Record<string, GraphicLocation> {
        const isMobile = this.windowWidth < 930;
        return {
            introText: isMobile ? this.coords.introTextMobile : this.coords.introText,
            outroText: isMobile ? this.coords.outroTextMobile : this.coords.outroText,
        };
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
    .title
        @extend %headline2_style
    .text
        fill: main.$white
    #outro_text
        @extend %headline3_style
</style>
