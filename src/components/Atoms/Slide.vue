<template>
    <section class="slide" :style="slideStyle">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class Slide extends Vue {
    @Prop({ default: '#F9F9F9' }) readonly background: string

    get slideStyle():Record<string, string> {
        return {
            'background-color': this.background,
        };
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

    .slide
        width: 100vw
        @include main.viewportHeight(100, 0)
        position: relative
        overflow: hidden
</style>
