<template>
    <svg class="discover_computer" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <AnimationPath :drawPercentage="as.timeline" :d="timelineSVGPath" id="general_path" stroke="#056CF2" stroke-width="16" fill="none"/>
        <g id="rainbows">
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(0)" class="rainbow" id="rainbow-0" stroke="#056CF2" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(1)" class="rainbow" id="rainbow-1" stroke="#4EBA6F" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(2)" class="rainbow" id="rainbow-2" stroke="#2D95BF" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(3)" class="rainbow" id="rainbow-3" stroke="#955BA5" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(4)" class="rainbow" id="rainbow-4" stroke="#F0C419" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(5)" class="rainbow" id="rainbow-5" stroke="#4EBA6F" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.rainbow" :d="getRainbowPath(6)" class="rainbow" id="rainbow-6" stroke="#F15A5A" stroke-width="16" fill="none"/>
        </g>
        <g id="computer_group" :transform="coords.computer.transform">
            <defs>
                <path d="M29,0 C29,0 28,14.6666667 26,44 L0,44 L0,57 L138,57 L138,44 L112,44 L109,0 C55.6666667,0 29,0 29,0 Z" id="path-1"></path>
            </defs>
            <g id="computer" transform="translate(-182, 0)">
                <g id="stand" transform="translate(113.000000, 314.000000)">
                    <mask id="mask-2" fill="white">
                        <use xlink:href="#path-1"></use>
                    </mask>
                    <use fill="#9BAFB9" xlink:href="#path-1"></use>
                    <polygon id="stand_shadow" fill="#77909E" opacity="0.364932106" mask="url(#mask-2)" points="28 2 28 10 110 10 110 2"></polygon>
                </g>
                <path id="computer_frame--top" fill="#E5EBEF" d="M16,0 L348,0 C356.836556,-1.623249e-15 364,7.163444 364,16 L364,52 L364,52 L0,52 L0,16 C-1.082166e-15,7.163444 7.163444,1.623249e-15 16,0 Z"></path>
                <path id="computer_frame--bottom" fill="#E5EBEF" d="M0,264 L364,264 L364,300 C364,308.836556 356.836556,316 348,316 L16,316 C7.163444,316 1.082166e-15,308.836556 0,300 L0,264 L0,264 Z"></path>
                <rect id="computer_screen" :data-screen-on="screenOn" fill="#263239" x="0" y="52" width="364" height="212"></rect>
                <rect id="computer_logo" fill="#BECDD4" x="176" y="283" width="12" height="12"></rect>
            </g>
        </g>
        <g id="text_group" :transform="coords.computer.transform">
            <text
                class="discover_computer__title"
                text-anchor="end"
                :style="textStyle"
            >
                But then I discovered computers
            </text>
        </g>
    </svg>
</template>

<script lang="ts">
import {
    Component, Watch,
} from 'vue-property-decorator';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import GraphicMixix from '@/mixins/GraphicMixin';
import easingFunctions from '@/helpers/easingFunctions';

@Component({
    components: {
        AnimationPath,
    },
})
export default class SchoolDoodle extends GraphicMixix {
    graphicLayout = {
        computer: new Point({ x: 80, y: 28 }),
    }
    timeline = [
        { key: 'timeline', start: 0, end: 0.5 },
        { key: 'rainbow', start: 0.7, end: 1 },
        { key: 'textTransform', start: 0.5, end: 0.7 },
    ]
    rainbowOffset = 15;
    rainbowRandomOffsets = Array.from({
        length: 10,
    }, () => Math.floor(Math.random() * this.rainbowOffset));

    get timelineSVGPath():string {
        const computerCoords = this.graphicLayout.computer;
        const path = new Path({
            points: [
                new Point({ x: this.start.x, y: -1 }),
                new Point({ x: this.start.x, y: 0 }),
                new Point({ x: 80, y: 25 }),
                new Point({ x: computerCoords.x, y: computerCoords.y }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    get screenOn():boolean {
        return (this.animationPercentage > 0.5);
    }
    get textStyle() {
        const percentage = easingFunctions.easeOutQuad(this.as.textTransform);
        const translateTopBase = 100;
        const translateTop = translateTopBase + (65 * percentage);

        return {
            opacity: percentage,
            transform: `translate(-240px, ${translateTop}px)`,
        };
    }

    @Watch('windowSizeSum')
    private getRainbowPath(index: number):string {
        const computerCoords = this.graphicLayout.computer;
        const offset = this.rainbowRandomOffsets[index];
        const start = computerCoords.y + 14;
        const path = new Path({
            points: [
                new Point({ x: computerCoords.x - 8, y: start }),
                new Point({ x: 50, y: start + (offset - (this.rainbowOffset) - 9) }),
                new Point({ x: 30, y: start + 10 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .discover_computer
        width: 100vw
        height: 100vh

    #computer_screen
        fill: #263239
        transition: all 200ms

    #computer_screen[data-screen-on='true']
        fill: main.$primary

    .discover_computer__title
        @extend %headline3_style
        text-align: right
        font-weight: 800
        font-size: min(44px, 3vw)
</style>
