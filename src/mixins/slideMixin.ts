import Vue from 'vue';
import Component from 'vue-class-component';
import { vueWindowSizeMixin } from 'vue-window-size';
import {
    State,
    Mutation,
} from 'vuex-class';
import { Watch } from 'vue-property-decorator';
// It is used, but ESLint's regex doesn't recognize it
// eslint-disable-next-line
import Slide from '@/classes/Slide';
import SlideComponent from '@/components/Atoms/Slide.vue';
import drawPercentageListGenerator from '@/helpers/drawPercentageListGenerator';
import colors from '@/helpers/colors';

@Component({
    mixins: [vueWindowSizeMixin],
    components: {
        Slide: SlideComponent,
    },
})
export default class SlideMixin extends Vue {
    @State('getPreviousLinePosition') getPreviousLinePosition!: number;
    @State('slides') slides!: Slide[];
    @Mutation('registerSlide') readonly registerSlide: CallableFunction;
    @Mutation('updateSlide') readonly updateSlide: CallableFunction;
    entered:number;
    exited:number;
    height:number;
    width:number;
    timeline: { key: string; start: number; end: number }[];
    colors: Record<string, string>;

    constructor() {
        super();
        this.colors = colors;
        this.entered = 0;
        this.exited = 0;
        this.height = 0;
        this.width = 0;
    }

    get windowSizeSum(): number {
        return this.windowWidth + this.windowHeight;
    }
    // Animation Steps
    get as(): { [key: string]: number; } {
        const { timeline } = this;
        return drawPercentageListGenerator({
            parentPercentage: this.entered,
            timeline,
        });
    }

    private handleScroll(): void {
        window.requestAnimationFrame(() => {
            this.getInViewPercentage();
        });
    }

    @Watch('windowSizeSum')
    private getInViewPercentage(): void {
        // Get "in view" percentage of slide
        const component = this.$refs.slide as Vue;
        const position = component.$el.getBoundingClientRect();
        const percentage = 1 - (position.top / position.height);
        // Percentage of slide on screen, to two decimals
        const rounded = (Math.round((percentage + Number.EPSILON) * 10000) / 10000);
        let entered = rounded;
        if (entered > 1) entered = 1;
        let exited = rounded - 1;
        if (exited > 1) exited = 1;
        this.height = position.height;
        this.width = position.width;
        this.entered = entered;
        this.exited = exited;
    }

    created():void {
        window.addEventListener('scroll', this.handleScroll);
    }

    destroyed():void {
        window.removeEventListener('scroll', this.handleScroll);
    }

    mounted():void {
        this.getInViewPercentage();
    }
}
