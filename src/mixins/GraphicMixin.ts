import { Vue, Component, Prop } from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';
import Point from '@/classes/Point';
import AnimationPath from '@/components/Atoms/AnimationPath.vue';
import drawPercentageListGenerator from '@/helpers/drawPercentageListGenerator';
import GraphicLocation from '@/classes/GraphicLocation';
import { State } from 'vuex-class';
import colors from '@/helpers/colors';

interface ResponsivePointsInterface {
    desktop: Point,
    mobile: Point,
}

// interface GraphicLayoutInterface {
//     [propName: string]: ResponsivePointsInterface | Point,
// }

@Component({
    components: {
        AnimationPath,
    },
    mixins: [vueWindowSizeMixin],
})
export default class GraphicMixin extends Vue {
    @State('windowHeight') windowHeight: number;
    @Prop({ default: 0 }) readonly animationPercentage: number
    @Prop({ default: () => new Point({ x: 0, y: 0 }) }) readonly start: Point
    @Prop({ default: () => new Point({ x: 0, y: 100 }) }) readonly end: Point

    isMounted = false;
    graphicLayout:Record<string, Point | ResponsivePointsInterface> = {};
    timeline: { key: string; start: number; end: number }[];
    colors: Record<string, string>;

    constructor() {
        super();
        this.colors = colors;
    }

    get windowSizeSum(): number {
        return this.windowWidth + this.windowHeight;
    }

    get coords():Record<string, GraphicLocation> {
        const graphicsLocations:Record<string, GraphicLocation> = {};
        Object.entries(this.graphicLayout).forEach((entry) => {
            const key = entry[0];
            const value = entry[1] as Point|Record<'desktop'|'mobile', Point>;
            if (value.constructor.name === 'Object') {
                const pointList = value as Record<'desktop'|'mobile', Point>;
                let point = pointList.desktop;
                if (this.windowWidth < 769) point = pointList.mobile;
                graphicsLocations[key] = this.getGraphicsLocation(point);
            } else {
                const percentagePoint = value as Point;
                graphicsLocations[key] = this.getGraphicsLocation(percentagePoint);
            }
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
            x: ((Math.round(x)) / this.windowWidth) * 100,
            y: ((Math.round(y)) / this.windowHeight) * 100,
        });
    }
    private getGraphicsLocation(percentagePoint: Point): GraphicLocation {
        const pixelPoint = this.createPixelPoint(percentagePoint);
        const transform = `translate(${pixelPoint.x}, ${pixelPoint.y})`;
        return new GraphicLocation({
            x: pixelPoint.x,
            y: pixelPoint.y,
            transform,
        });
    }

    public mounted():void {
        this.isMounted = true;
    }
}
