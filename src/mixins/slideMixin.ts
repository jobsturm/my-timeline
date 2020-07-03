import Vue from 'vue';
import Component from 'vue-class-component';
import { vueWindowSizeMixin } from 'vue-window-size';
import {
    State,
    Mutation,
} from 'vuex-class';
import Slide from '@/classes/Slide';

@Component({
    mixins: [vueWindowSizeMixin],
})
export default class slideMixin extends Vue {
    @State('getPreviousLinePosition') getPreviousLinePosition!:Number;
    @State('slides') slides!:Array<Slide>;
    @Mutation('registerSlide') registerSlide!:Function;
    @Mutation('updateSlide') updateSlide!:Function;

    entered = 0;
    exited = 0;
    height = 0;
    width = 0;

    get windowSizeSum():number {
        return this.windowWidth + this.windowHeight;
    }

    handleScroll():void {
        window.requestAnimationFrame(() => {
            this.getInViewPercentage();
        });
    }

    getInViewPercentage() {
        // Get "in view" percentage of slide
        const element = this.$refs.slide as HTMLElement;
        const position = element.getBoundingClientRect();
        const percentage = 1 - (position.top / window.innerHeight);
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

    created() {
        window.addEventListener('scroll', this.handleScroll);
    }

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    mounted() {
        this.getInViewPercentage();
    }
}
