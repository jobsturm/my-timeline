<template>
    <svg class="slide_triangle" :style="triangleStyle">
        <polygon :points="trianglePoints"></polygon>
    </svg>
</template>

<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';

@Component({
    mixins: [vueWindowSizeMixin],
})
export default class SlideTriangle extends Vue {
    @Prop({ default: '#000' }) readonly background: string
    @Prop({ default: 200 }) readonly height: number

    get triangleStyle():Record<string, string> {
        return {
            fill: this.background,
            height: `${this.height}px`,
        };
    }
    get trianglePoints():string {
        return `0,0 0,${this.height} ${this.windowWidth},0`;
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .slide_triangle
        width: 100%
</style>
