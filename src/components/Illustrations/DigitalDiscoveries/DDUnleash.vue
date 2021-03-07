<template>
    <!-- eslint-disable max-len -->
    <svg class="dd_unleash">
        <foreignObject
            :x="coords.introTextCoords.x"
            :y="coords.introTextCoords.y"
            :width="0.96 * windowWidth"
            height="200"
        >
            <div id="av_text" xmlns="http://www.w3.org/1999/xhtml">
                One with games <br/>
                and music!
            </div>
        </foreignObject>
        <g id="dd_unleash__text_group" :transform="coords.introTextCoords.transform">
            <text
                :style="getTextIntroStyle('textLine1')"
                transform="translate(60, -10)"
                class="title"
            >
                One with games
            </text>
            <text
                :style="getTextIntroStyle('textLine2')"
                transform="translate(60, 30)"
                class="title"
            >
                and music
            </text>
        </g>
        <g :transform="coords.portalInCoords.transform">
            <SVGPortal
                :blue="false"
                transform="translate(-160, 10)"
            >
                <g transform="translate(28, 0)">
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(0)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-6" stroke="#009CDF" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(1)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-5" stroke="#973999" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(2)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-4" stroke="#E23838" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(3)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-3" stroke="#F78200" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(4)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-2" stroke="#FFB900" stroke-width="16" fill="none"/>
                    <AnimationPath :drawPercentage="as.portalLine" :d="getportalLinePath(5)" class="dd_unleash_portal_path" id="dd_unleash_portal_path-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
                </g>
            </SVGPortal>
        </g>
        <g id="rainbow">
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(5)" class="dd_unleash_general_path" id="dd_unleash_general_path-6" stroke="#009CDF" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(4)" class="dd_unleash_general_path" id="dd_unleash_general_path-5" stroke="#973999" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(3)" class="dd_unleash_general_path" id="dd_unleash_general_path-4" stroke="#E23838" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(2)" class="dd_unleash_general_path" id="dd_unleash_general_path-3" stroke="#F78200" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(1)" class="dd_unleash_general_path" id="dd_unleash_general_path-2" stroke="#FFB900" stroke-width="16" fill="none"/>
            <AnimationPath :drawPercentage="as.timeline" :d="getTimeLinePath(0)" class="dd_unleash_general_path" id="dd_unleash_general_path-1" stroke="#5EBD3E" stroke-width="16" fill="none"/>
        </g>
        <defs id="dsotm_defs">
            <polygon id="dsotm_path-1" points="0 192 224 192 112 0"></polygon>
            <filter x="-3.5%" y="-4.2%" width="107.0%" height="108.1%" filterUnits="objectBoundingBox" id="dsotm_filter-2">
                <feGaussianBlur stdDeviation="7" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
                <feColorMatrix values="0 0 0 0 0.421284299   0 0 0 0 1   0 0 0 0 0.918238702  0 0 0 1 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
            </filter>
        </defs>
        <g id="after_prisma" transform="translate(0, 40)">
            <AnimationPath :drawPercentage="as.timelinePrisma" :d="prismaPath" class="dd_unleash_general_path" id="dd_unleash_general_path-6" stroke="#FFFFFF" stroke-width="4" fill="none"/>
        </g>
        <g id="dsotm" :transform="coords.dsotmCoords.transform" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="dsotm_transformer" transform="translate(-112, -60)">
                <use fill="#000000" fill-rule="evenodd" xlink:href="#dsotm_path-1"></use>
                <use fill="black" fill-opacity="1" filter="url(#dsotm_filter-2)" xlink:href="#dsotm_path-1"></use>
                <use stroke="#FFFFFF" stroke-width="1" xlink:href="#dsotm_path-1"></use>
            </g>
        </g>
    </svg>
    <!-- eslint-enable max-len -->
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGPortal from '@/components/Atoms/SVGPortal.vue';

@Component({
    components: {
        AnimationPath,
        SVGPortal,
    },
})
export default class DDUnleash extends GraphicMixin {
    graphicLayout = {
        introTextCoords: new Point({ x: 20, y: 33 }),
        portalInCoords: new Point({ x: 20, y: 0 }),
        dsotmCoords: new Point({ x: 46, y: 55 }),
    }
    timeline = [
        { key: 'timeline', start: 0.2, end: 0.7 },
        { key: 'timelinePrisma', start: 0.7, end: 1 },
        { key: 'portalLine', start: 0.10, end: 0.2 },
        { key: 'textLine1', start: 0.35, end: 0.55 },
        { key: 'textLine2', start: 0.65, end: 0.8 },
        { key: 'textLine3', start: 0.7, end: 0.8 },
    ]

    get relativeLineWidth():number {
        return 16 / this.windowWidth * 100;
    }
    get prismaPath():string {
        const path = new Path({
            points: [
                new Point({ x: 46, y: 55 }),
                new Point({ x: 66, y: 55 }),
                new Point({ x: 76, y: 90 }),
                this.end,
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }

    getTimeLinePath(index:number):string {
        const relativeLineHeight = 16 / this.windowHeight * 100;
        const startPointX = 20 - (index * this.relativeLineWidth);
        const midPointX = 20 - (index * this.relativeLineWidth);
        const midPointY = 40 - (index * relativeLineHeight * 2);
        const endPointY = 55 + (index * relativeLineHeight);

        const path = new Path({
            points: [
                new Point({ x: startPointX, y: 15 }),
                new Point({ x: startPointX, y: 16 }),
                new Point({ x: midPointX, y: midPointY }),
                new Point({ x: midPointX, y: midPointY + 1 }),
                new Point({ x: 45, y: endPointY }),
                new Point({ x: 45 + 1, y: endPointY }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    getportalLinePath(index:number):string {
        const X = 0 + (index * this.relativeLineWidth);
        const path = new Path({
            points: [
                new Point({ x: X, y: 0 }),
                new Point({ x: X, y: 10 }),
            ],
        });
        const { windowWidth, windowHeight } = this;
        return new SVGSmoothPath({ path, windowWidth, windowHeight }).SVGStringPath;
    }
    getTextIntroStyle(asID:string):string {
        return `opacity: ${this.as[asID]}`;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .dd_unleash
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        z-index: 2
    .title
        @extend %headline3_style
        fill: main.$white
        font-size: max(min(44px, 1vw), 32px)
        @media (max-width: 450px)
            font-size: max(min(1.5em, 6vw), 12px)
</style>
