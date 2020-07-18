<template>
    <svg class="school_doodle" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="SchoolDoodle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="school_doodle_export" stroke="#056CF2">
                <g id="graphic">
                    <g id="tree" transform="translate(172.000000, 0.000000)">
                        <path d="M21.1565433,80 C20.2955386,73.6669927 22.9862462,70.5004891 29.2286662,70.5004891 C29.2729616,65.3142036 31.8961608,63.4522421 37.0982638,64.9146045 C37.20523,60.3048682 39.5058087,58 44,58" id="tree_wiggle" stroke-width="4"></path>
                        <path d="M62.1553915,91.0903307 C61.3007217,84.7313205 63.9716321,81.5518154 70.1681228,81.5518154 C70.2120923,76.3442353 72.815991,74.4746286 77.9798188,75.9429955 C78.085998,71.3143318 80.3696499,69 84.8307746,69" id="tree_wiggle" stroke-width="4" transform="translate(73.415387, 80.045165) rotate(40.000000) translate(-73.415387, -80.045165) "></path>
                        <path d="M51.1553915,55.0903307 C50.3007217,48.7313205 52.9716321,45.5518154 59.1681228,45.5518154 C59.2120923,40.3442353 61.815991,38.4746286 66.9798188,39.9429955 C67.085998,35.3143318 69.3696499,33 73.8307746,33" id="tree_wiggle" stroke-width="4" transform="translate(62.415387, 44.045165) rotate(55.000000) translate(-62.415387, -44.045165) "></path>
                        <path d="M32,195 L35.8118229,163.091785 L41.6757143,108.106017 C31.7135455,110.836216 26.3991278,107.894682 25.7324611,99.2814139 C25.4956551,99.0217291 7.1726731,97.9690903 11.1580153,82.3592775 C0.0356106881,78.0502584 -2.3503944,70.7351967 4,60.4140924 C-2,51.4713641 -1,44.3333333 7,39 C4.33333333,27.6666667 9,20.6666667 21,18 C23,6 30,2.33333333 42,7 C52,-1.66666667 61,-1.66666667 69,7 C80.3333333,4.33333333 87,8 89,18 C100.333333,20 105.333333,27 104,39 C113.333333,49.6666667 114.333333,59.6666667 107,69 C109,81 104.666667,88.6666667 94,92 C88,102.666667 80,107.333333 70,106 L83,195" id="tree_outline" stroke-width="8" stroke-linejoin="round"></path>
                    </g>
                    <g id="house" transform="translate(0.000000, 31.000000)" stroke-linejoin="round">
                        <polyline id="house_frame" stroke-width="16" points="0 164 0 66.4810846 66.5 0 133 66.4810846 133 164"></polyline>
                        <polyline id="house_door" stroke-width="8" points="23 165 23 95 58 95 58 165"></polyline>
                        <polygon id="house_window" stroke-width="8" points="75 95 111 95 111 130 75 130"></polygon>
                    </g>
                </g>
            </g>
        </g>
        <AnimationPath :drawPercentage="as.timeline" :d="timelinePath" id="general_path" stroke="#056CF2" stroke-width="16" fill="none"/>
    </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import animationStep from '@/helpers/animationStep';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import drawPercentageListGenerator from '@/helpers/drawPercentageListGenerator';
import Point from '@/classes/Point';
import Path from '@/classes/Path';
import SVGSmoothPath from '@/classes/SVGSmoothPath';

@Component({
    components: {
        AnimationPath,
    },
    mixins: [vueWindowSizeMixin],
})
export default class SchoolDoodle extends Vue {
    @Prop({ default: 0 }) readonly animationPercentage:number
    @Prop({ required: true }) readonly start:Point

    timeline = [
        { key: 'redCopybookLine', start: 0.10, end: 0.50 },
        { key: 'noteLine1', start: 0.10, end: 0.64 },
        { key: 'noteLine2', start: 0.15, end: 0.64 },
        { key: 'noteLine3', start: 0.18, end: 0.64 },
        { key: 'noteLine4', start: 0.21, end: 0.64 },
        { key: 'noteLine5', start: 0.23, end: 0.64 },
        { key: 'noteLine6', start: 0.26, end: 0.64 },
        { key: 'noteLine7', start: 0.28, end: 0.64 },
        { key: 'noteLine8', start: 0.30, end: 0.64 },
        { key: 'houseFrame', start: 0.32, end: 0.75 },
        { key: 'tree', start: 0.34, end: 0.80 },
        { key: 'timeline', start: 0, end: 1 },
    ]
    isMounted = false;

    // Animation Steps
    get as():object {
        const { animationPercentage, timeline } = this;
        return drawPercentageListGenerator({
            parentPercentage: animationPercentage,
            timeline,
        });
    }
    get graphicTransform():string {
        if (!this.isMounted) return 'translate(0 0)';
        const graphicElement = this.$refs.graphic as HTMLElement;
        const graphicWidth = graphicElement.getBoundingClientRect().width;
        const transformX = (this.windowWidth / 2) - (graphicWidth / 2);
        return `translate(${graphicWidth} 0)`;
    }
    get timelinePath():string {
        const path = new Path({
            points: [
                new Point({
                    x: ((Math.round(this.start.x) + 8) / this.windowWidth) * 100,
                    y: 0,
                }),
                new Point({
                    x: 10,
                    y: 40,
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
                    x: 90,
                    y: 100,
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

    mounted() {
        this.isMounted = true;
    }
}
</script>

<style lang="sass" scoped>
    .school_doodle
        width: 100vw
        height: 100vh
</style>
