import { Vue, Component, Prop } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import Point from '@/classes/Point';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import drawPercentageListGenerator from '@/helpers/drawPercentageListGenerator';

@Component({
    components: {
        AnimationPath,
    },
    mixins: [vueWindowSizeMixin],
})
export default class GraphicMixin extends Vue {
    @Prop({ default: 0 }) readonly animationPercentage: number
    @Prop({ required: true }) readonly start: Point
    @Prop({ required: true }) readonly end: Point

    isMounted = false;
    graphicLayout = {};
    timeline: { key: string; start: number; end: number }[];

    get coords(): {[key: string]: object} {
        const graphicsLocations: { [key: string]: object } = {};
        Object.entries(this.graphicLayout).forEach((entry) => {
            const key = entry[0];
            const point = entry[1] as Point;
            const pixelPoint = this.createPixelPoint(point);
            const transform = this.createGraphicTransformProp(pixelPoint);
            graphicsLocations[key] = {
                ...pixelPoint,
                transform,
            };
        });
        return graphicsLocations;
    }
    // Animation Steps
    get as(): { [key: string]: number; } {
        const { animationPercentage, timeline } = this;
        return drawPercentageListGenerator({
            parentPercentage: animationPercentage,
            timeline,
        });
    }

    public createGraphicTransformProp({ x, y }: Point): string {
        return `translate(${x}, ${y})`;
    }
    public createPixelPoint({ x, y }: Point): Point {
        return this.getPixelFromPercentagePoint(new Point({ x, y }));
    }
    public getPixelFromPercentagePoint(point: Point): Point {
        return new Point({
            x: Math.round((this.windowWidth / 100) * point.x),
            y: Math.round((this.windowHeight / 100) * point.y),
        });
    }
    public getPercentageFromPixelPoint({ x, y }: Point): Point {
        return new Point({
            // +8 because the line is always 16px wide.
            x: ((Math.round(x) + 8) / this.windowWidth) * 100,
            y: ((Math.round(y)) / this.windowWidth) * 100,
        });
    }

    mounted() {
        this.isMounted = true;
    }
}
