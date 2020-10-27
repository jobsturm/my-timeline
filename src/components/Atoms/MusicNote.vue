<template>
    <!-- ESlint isn't dealing with SVGs nicely and since it's exported anyway -->
    <!-- maintainability isn't a big concern. -->
    <!-- eslint-disable -->
    <g>
        <defs>
            <text :id="id" class="ddc__music_note" text-anchor="middle" font-size="80" font-weight="normal" fill="#FFFFFF">
                <tspan>{{ note }}</tspan>
            </text>
        </defs>

        <g fill="#FFFFFF">
            <use filter="url(#blue_glow)" :xlink:href="`#${id}`"></use>
            <use :xlink:href="`#${id}`"></use>
        </g>
    </g>
    <!-- eslint-enable -->
</template>

<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class MusicNote extends Vue {
    @Prop({ default: 1 }) readonly openPercentage: number

    private id:string;
    private note:string;

    constructor() {
        super();
        const noteOptions = ['♪', '♬', '♫𝅳'];
        this.id = Math.random().toString(36).substr(2, 11);
        this.note = noteOptions[Math.floor(Math.random() * noteOptions.length)];
    }
}
</script>

<style lang="sass" scoped>
</style>
