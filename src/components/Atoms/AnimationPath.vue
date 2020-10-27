<template>
    <component
        :is="nodeName"
        ref="pathElement"
        v-bind="pathProperties"
    />
</template>

<script lang="ts">
import {
    Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import Point from '@/classes/Point';

@Component({
    mixins: [vueWindowSizeMixin],
})
export default class AnimationPath extends Vue {
    @Prop({ default: 0 }) readonly drawPercentage: number | undefined
    @Prop({ default: 'path' }) readonly nodeName: string | undefined

    id = `path_${this.$attrs.id}`;
    pathLength = 0;
    start:Point = new Point({ x: 0, y: 0 });
    end:Point = new Point({ x: 0, y: 0 });

    get percentage():number {
        return 1 - (this.drawPercentage || 0);
    }
    get windowSizeSum():number {
        return this.windowWidth + this.windowHeight;
    }
    get pathElement():SVGPathElement {
        return this.$el as SVGPathElement;
    }
    get strokeDasharray():string {
        return `${this.pathLength} ${this.pathLength}`;
    }
    get strokeDashoffset():number {
        return Math.ceil(this.pathLength * (this.percentage || 0));
    }
    get pathProperties():Record<string, number|string> {
        const { strokeDasharray, strokeDashoffset } = this;
        return {
            ...this.$attrs,
            'stroke-dasharray': strokeDasharray,
            'stroke-dashoffset': strokeDashoffset,
        };
    }

    @Watch('windowSizeSum')
    setPathLength():void {
        const { pathElement } = this;
        this.pathLength = pathElement.getTotalLength();
        this.start = pathElement.getPointAtLength(0);
        this.end = pathElement.getPointAtLength(this.pathLength);
    }

    mounted():void {
        window.requestAnimationFrame(() => {
            this.setPathLength();
        });
    }
}
</script>

<style lang="sass">

</style>
