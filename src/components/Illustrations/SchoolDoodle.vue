<template>
    <svg class="school_doodle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g
            id="SchoolDoodle"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
        >
            <g id="copybook_lines" :transform="coords.copybook.transform" stroke-width="4">
                <g transform="translate(-100, -245)">
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine9" x1="0" y1="405" x2="617" y2="405" id="copybook_line_9" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine8" x1="0" y1="364.5" x2="617" y2="364.5" id="copybook_line_8" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine7" x1="0" y1="324.5" x2="617" y2="324.5" id="copybook_line_7" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine6" x1="0" y1="284.5" x2="617" y2="284.5" id="copybook_line_6" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine5" x1="0" y1="202.5" x2="617" y2="202.5" id="copybook_line_5" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine4" x1="0" y1="162.5" x2="617" y2="162.5" id="copybook_line_4" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine3" x1="0" y1="122.5" x2="617" y2="122.5" id="copybook_line_3" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine2" x1="0" y1="82.5" x2="617" y2="82.5" id="copybook_line_2" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.noteLine1" x1="0" y1="42.5" x2="617" y2="42.5" id="copybook_line_1" stroke="#438BF8" opacity="0.169456845"/>
                    <AnimationPath nodeName="line" :drawPercentage="as.redCopybookLine" x1="76.5" y1="-5.31275443e-14" x2="77" y2="450" id="copybook_red_line" stroke="#FFE9EE"/>
                </g>
            </g>
            <g id="drawings" :transform="coords.house.transform">
                <g id="house" transform="translate(0, -165)" stroke="#056CF2" stroke-linejoin="round">
                    <AnimationPath nodeName="polyline" :drawPercentage="as.houseFrame" id="house_frame" stroke-width="16" points="0 164 0 66.4810846 66.5 0 133 66.4810846 133 164"/>
                    <AnimationPath nodeName="polyline" :drawPercentage="as.houseDoor" id="house_door" stroke-width="8" points="23 165 23 95 58 95 58 165"/>
                    <AnimationPath nodeName="polygon" :drawPercentage="as.houseWindow" id="house_window" stroke-width="8" points="75 95 111 95 111 130 75 130"/>
                </g>
                <g v-if="windowWidth > 600" id="tree" transform="translate(135, -196)" stroke="#056CF2">
                    <AnimationPath :drawPercentage="as.tree1" id="tree_wiggle" d="M21.1565433,80 C20.2955386,73.6669927 22.9862462,70.5004891 29.2286662,70.5004891 C29.2729616,65.3142036 31.8961608,63.4522421 37.0982638,64.9146045 C37.20523,60.3048682 39.5058087,58 44,58" stroke-width="4"/>
                    <AnimationPath :drawPercentage="as.tree1" id="tree_wiggle" d="M62.1553915,91.0903307 C61.3007217,84.7313205 63.9716321,81.5518154 70.1681228,81.5518154 C70.2120923,76.3442353 72.815991,74.4746286 77.9798188,75.9429955 C78.085998,71.3143318 80.3696499,69 84.8307746,69" stroke-width="4" transform="translate(73.415387, 80.045165) rotate(40.000000) translate(-73.415387, -80.045165) "/>
                    <AnimationPath :drawPercentage="as.tree1" id="tree_wiggle" d="M51.1553915,55.0903307 C50.3007217,48.7313205 52.9716321,45.5518154 59.1681228,45.5518154 C59.2120923,40.3442353 61.815991,38.4746286 66.9798188,39.9429955 C67.085998,35.3143318 69.3696499,33 73.8307746,33" stroke-width="4" transform="translate(62.415387, 44.045165) rotate(55.000000) translate(-62.415387, -44.045165) "/>
                    <AnimationPath :drawPercentage="as.tree1" id="tree_outline" d="M32,195 L35.8118229,163.091785 L41.6757143,108.106017 C31.7135455,110.836216 26.3991278,107.894682 25.7324611,99.2814139 C25.4956551,99.0217291 7.1726731,97.9690903 11.1580153,82.3592775 C0.0356106881,78.0502584 -2.3503944,70.7351967 4,60.4140924 C-2,51.4713641 -1,44.3333333 7,39 C4.33333333,27.6666667 9,20.6666667 21,18 C23,6 30,2.33333333 42,7 C52,-1.66666667 61,-1.66666667 69,7 C80.3333333,4.33333333 87,8 89,18 C100.333333,20 105.333333,27 104,39 C113.333333,49.6666667 114.333333,59.6666667 107,69 C109,81 104.666667,88.6666667 94,92 C88,102.666667 80,107.333333 70,106 L83,195" stroke-width="8" stroke-linejoin="round"/>
                </g>
                <g v-if="windowWidth > 1000" id="tree" transform="translate(270, -196)" stroke="#056CF2">
                    <AnimationPath :drawPercentage="as.tree2" id="tree_wiggle" d="M21.1565433,80 C20.2955386,73.6669927 22.9862462,70.5004891 29.2286662,70.5004891 C29.2729616,65.3142036 31.8961608,63.4522421 37.0982638,64.9146045 C37.20523,60.3048682 39.5058087,58 44,58" stroke-width="4"/>
                    <AnimationPath :drawPercentage="as.tree2" id="tree_wiggle" d="M62.1553915,91.0903307 C61.3007217,84.7313205 63.9716321,81.5518154 70.1681228,81.5518154 C70.2120923,76.3442353 72.815991,74.4746286 77.9798188,75.9429955 C78.085998,71.3143318 80.3696499,69 84.8307746,69" stroke-width="4" transform="translate(73.415387, 80.045165) rotate(40.000000) translate(-73.415387, -80.045165) "/>
                    <AnimationPath :drawPercentage="as.tree2" id="tree_wiggle" d="M51.1553915,55.0903307 C50.3007217,48.7313205 52.9716321,45.5518154 59.1681228,45.5518154 C59.2120923,40.3442353 61.815991,38.4746286 66.9798188,39.9429955 C67.085998,35.3143318 69.3696499,33 73.8307746,33" stroke-width="4" transform="translate(62.415387, 44.045165) rotate(55.000000) translate(-62.415387, -44.045165) "/>
                    <AnimationPath :drawPercentage="as.tree2" id="tree_outline" d="M32,195 L35.8118229,163.091785 L41.6757143,108.106017 C31.7135455,110.836216 26.3991278,107.894682 25.7324611,99.2814139 C25.4956551,99.0217291 7.1726731,97.9690903 11.1580153,82.3592775 C0.0356106881,78.0502584 -2.3503944,70.7351967 4,60.4140924 C-2,51.4713641 -1,44.3333333 7,39 C4.33333333,27.6666667 9,20.6666667 21,18 C23,6 30,2.33333333 42,7 C52,-1.66666667 61,-1.66666667 69,7 C80.3333333,4.33333333 87,8 89,18 C100.333333,20 105.333333,27 104,39 C113.333333,49.6666667 114.333333,59.6666667 107,69 C109,81 104.666667,88.6666667 94,92 C88,102.666667 80,107.333333 70,106 L83,195" stroke-width="8" stroke-linejoin="round"/>
                </g>
            </g>
        </g>
        <AnimationPath :drawPercentage="as.timeline" :d="timelinePath" id="general_path" stroke="#056CF2" stroke-width="16" fill="none"/>
    </svg>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGSmoothPath from '@/classes/SVGSmoothPath';
import GraphicMixin from '@/mixins/GraphicMixin';

@Component({
    components: {
        AnimationPath,
    },
})
export default class SchoolDoodle extends GraphicMixin {
    graphicLayout = {
        house: new Point({ x: 35, y: 60 }),
        tree: new Point({ x: 55, y: 60 }),
        copybook: new Point({ x: 35, y: 60 }),
    }
    timeline = [
        { key: 'redCopybookLine', start: 0, end: 1 },
        { key: 'noteLine1', start: 0.42, end: 0.88 },
        { key: 'noteLine2', start: 0.42, end: 0.86 },
        { key: 'noteLine3', start: 0.42, end: 0.84 },
        { key: 'noteLine4', start: 0.42, end: 0.82 },
        { key: 'noteLine5', start: 0.42, end: 0.8 },
        { key: 'noteLine6', start: 0.42, end: 0.82 },
        { key: 'noteLine7', start: 0.42, end: 0.84 },
        { key: 'noteLine8', start: 0.42, end: 0.86 },
        { key: 'noteLine9', start: 0.42, end: 0.90 },
        { key: 'houseFrame', start: 0.5, end: 0.75 },
        { key: 'houseDoor', start: 0.51, end: 0.75 },
        { key: 'houseWindow', start: 0.53, end: 0.75 },
        { key: 'tree1', start: 0.588, end: 0.8 },
        { key: 'tree2', start: 0.659, end: 0.85 },
        { key: 'timeline', start: 0, end: 1 },
    ]

    get timelinePath():string {
        const path = new Path({
            points: [
                this.getPercentageFromPixelPoint({
                    x: this.start.x,
                    y: -1,
                }),
                this.getPercentageFromPixelPoint({
                    x: this.start.x,
                    y: 0,
                }),
                new Point({
                    x: 10,
                    y: 40,
                }),
                new Point({
                    x: 10,
                    y: 41,
                }),
                new Point({
                    x: 30,
                    y: 60,
                }),
                new Point({
                    x: 60,
                    y: 60,
                }),
                new Point({
                    x: this.end.x,
                    y: 100,
                }),
                new Point({
                    x: this.end.x,
                    y: 101,
                }),
            ],
        });
        const SVGPath = new SVGSmoothPath({
            path,
            windowWidth: this.windowWidth,
            windowHeight: this.windowHeight,
        }).SVGStringPath;
        return SVGPath;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .school_doodle
        width: 100vw
        @include main.viewportHeight(100, 0)
</style>
