<template>
    <div class="rainbow_background">
        <div class="rainbow rainbow--part_1" :style="getRainbowStyle(0)"/>
        <div class="rainbow rainbow--part_2" :style="getRainbowStyle(1)"/>
        <div class="rainbow rainbow--part_3" :style="getRainbowStyle(2)"/>
        <div class="rainbow rainbow--part_4" :style="getRainbowStyle(3)"/>
        <div class="rainbow rainbow--part_5" :style="getRainbowStyle(4)"/>
        <div class="rainbow rainbow--part_6" :style="getRainbowStyle(5)"/>
    </div>
</template>

<script lang="ts">
import {
    Component, Prop, Watch,
} from 'vue-property-decorator';
import GraphicMixin from '@/mixins/GraphicMixin';

@Component
export default class RainbowBackground extends GraphicMixin {
    @Prop({ required: true }) readonly effectType: string

    constructor() {
        super();
        this.timeline = [
            { key: 'rainbow_block_0', start: 0, end: 1 },
            { key: 'rainbow_block_1', start: 0.03, end: 1 },
            { key: 'rainbow_block_2', start: 0.06, end: 1 },
            { key: 'rainbow_block_3', start: 0.09, end: 1 },
            { key: 'rainbow_block_4', start: 0.12, end: 1 },
            { key: 'rainbow_block_5', start: 0.15, end: 1 },
        ];
    }

    @Watch('windowSizeSum')
    private getRainbowStyle(index:number):Record<string, string> {
        const animationPercentage = this.as[`rainbow_block_${index}`];
        const borderRadius = 32 - (32 * this.as[`rainbow_block_${index}`]);
        let margin = 16 - (16 * this.as[`rainbow_block_${index}`]);

        if (this.effectType === 'stretch') {
            margin = 0;
        }

        return {
            height: `${this.windowHeight * animationPercentage}px`,
            marginLeft: `${margin}px`,
            marginRight: `${margin}px`,
            borderBottomLeftRadius: `${borderRadius}px`,
            borderBottomRightRadius: `${borderRadius}px`,
        };
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .rainbow_background
        width: 100%
        @include main.viewportHeight(100, 0)
        display: flex
    .rainbow
        width: calc(100% / 6)
        will-change: height, margin, border-radius
    .rainbow--part_1
        background: #5EBD3E
    .rainbow--part_2
        background: #FFB900
    .rainbow--part_3
        background: #F78200
    .rainbow--part_4
        background: #E23838
    .rainbow--part_5
        background: #973999
    .rainbow--part_6
        background: #009CDF
</style>
