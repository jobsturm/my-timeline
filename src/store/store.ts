import Vue from 'vue';
import Vuex from 'vuex';
import Slide from '@/classes/Slide';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        slides: new Array<Slide>(),
        audioPermission: false,
        windowHeight: window.innerHeight,
    },
    mutations: {
        registerSlide(
            state,
            slide: Slide,
        ):void {
            state.slides.push(slide);
        },
        updateSlide(
            state,
            slide: Slide,
        ):void {
            const foundIndex = state.slides.findIndex(
                arraySlide => arraySlide.index === slide.index,
            );
            Vue.set(state.slides, foundIndex, slide);
        },
        setAudioPermission(state, audioPermission:boolean):void {
            state.audioPermission = audioPermission;
        },
        setWindowHeight(state, windowHeight:number):void {
            state.windowHeight = windowHeight;
        },
    },
    actions: {
    },
    modules: {
    },
});
