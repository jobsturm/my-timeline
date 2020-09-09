<template>
    <!-- ESlint isn't dealing with SVGs nicely and since it's exported anyway -->
    <!-- maintainability isn't a big concern. -->
    <!-- eslint-disable -->
    <g>
        <defs>
            <ellipse id="portal_path-1" cx="87" cy="52" rx="87" ry="52"></ellipse>
            <filter x="-23.0%" y="-38.5%" width="146.0%" height="176.9%" filterUnits="objectBoundingBox" id="portal_filter-2">
                <feGaussianBlur stdDeviation="0" in="SourceGraphic"></feGaussianBlur>
            </filter>
            <filter x="-34.5%" y="-57.7%" width="169.0%" height="215.4%" filterUnits="objectBoundingBox" :id="portalFilterOuterID">
                <feMorphology radius="5" operator="dilate" in="SourceAlpha" result="shadowSpreadOuter1"></feMorphology>
                <feOffset dx="0" dy="0" in="shadowSpreadOuter1" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix v-if="!blue" values="0 0 0 0 1   0 0 0 0 0.499890734   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
                <feColorMatrix v-else values="0 0 0 0 0   0 0 0 0 0.492406031   0 0 0 0 1  0 0 0 1 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
            <ellipse id="portal_path-5" cx="75" cy="43" rx="75" ry="43"></ellipse>
            <filter x="-7.7%" y="-13.4%" width="115.3%" height="126.7%" filterUnits="objectBoundingBox" :id="portalFilterInnerID">
                <feGaussianBlur stdDeviation="11.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur>
                <feOffset dx="0" dy="0" in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                <feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite>
                <feColorMatrix v-if="!blue" values="0 0 0 0 1   0 0 0 0 0.499890734   0 0 0 0 0  0 0 0 1 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
                <feColorMatrix v-else values="0 0 0 0 0   0 0 0 0 0.492406031   0 0 0 0 1  0 0 0 1 0" type="matrix" in="shadowInnerInner1"></feColorMatrix>
            </filter>
            <path v-if="!blue" :id="portalMaskPathID" d="M150.354651,121.045154 L0.354650675,121.045154 L0.354650675,43.0451536 L0.364698533,42.3340699 C1.02038473,19.1480021 33.6843638,0.422981651 74.1267674,0.0507998484 L75.3546507,0.0451535717 L76.5949128,0.0509143431 C117.035729,0.426841096 149.695648,19.1541891 150.344803,42.3411671 L150.354651,43.0451536 L150.354651,121.045154 Z"></path>
            <path v-else :id="portalMaskPathID" d="M0,0 L150,0 L150,78 L149.989952,78.7110836 C149.334266,101.897151 116.670287,120.622172 76.2278833,120.994354 L75,121 L73.7597379,120.994239 C33.3189218,120.618312 0.659002463,101.890964 0.00984815708,78.7039864 L0,78 L0,0 Z"></path>
        </defs>
        <g id="Portals" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Portal-Orange" transform="translate(-3.000000, 14.000000)">
                <g id="Portal" transform="translate(43.000000, 0.000000)">
                    <g id="graphical_portal" :style="portalStyle" :transform="portalTransform">
                        <g transform="translate(0.000000, 26.000000)">
                            <mask id="mask-3" fill="white">
                                <use xlink:href="#portal_path-1"></use>
                            </mask>
                            <g id="Mask" filter="url(#portal_filter-2)">
                                <use fill="black" fill-opacity="1" :filter="`url(#${portalFilterOuterID})`" xlink:href="#portal_path-1"></use>
                                <use v-if="!blue" fill="#FF7F00" fill-rule="evenodd" xlink:href="#portal_path-1"></use>
                                <use v-else fill="#36C7FF" fill-rule="evenodd" xlink:href="#portal_path-1"></use>
                            </g>
                            <g id="Rectangle" mask="url(#mask-3)">
                                <g transform="translate(12.000000, 9.000000)">
                                    <mask id="mask-6" fill="white">
                                        <use xlink:href="#portal_path-5"></use>
                                    </mask>
                                    <g id="Mask" stroke="none" fill="none">
                                        <use fill="#000000" fill-rule="evenodd" xlink:href="#portal_path-5"></use>
                                        <use fill="black" fill-opacity="1" :filter="`url(#${portalFilterInnerID})`" xlink:href="#portal_path-5"></use>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                    <g id="Mask-Contents" :transform="`translate(12.000000, ${portalMaskTransformTop})`">
                        <mask :id="portalMaskID" fill="white">
                            <use :xlink:href="`#${portalMaskPathID}`"></use>
                        </mask>
                        <use id="Mask" fill="#D8D8D8" opacity="0" :xlink:href="`#${portalMaskID}`"></use>
                        <g id="portal_content" :mask="`url(#${portalMaskID})`">
                            <slot></slot>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </g>
    <!-- eslint-enable -->
</template>

<script lang="ts">
import {
    Vue, Component, Prop,
} from 'vue-property-decorator';

@Component
export default class SVGPortal extends Vue {
    @Prop({ default: 1 }) readonly openPercentage: number
    @Prop({ default: false }) readonly blue: boolean

    id:String;

    constructor() {
        super();
        this.id = Math.random().toString(36).substr(2, 11);
    }

    get portalTransform():string {
        return `scale(${this.openPercentage})`;
    }
    get portalStyle():object {
        return { opacity: this.openPercentage };
    }
    get portalColorModifier():'blue' | 'orange' {
        return this.blue ? 'blue' : 'orange';
    }
    get portalFilterOuterID():string {
        return `filterOuter_${this.portalColorModifier}`;
    }
    get portalFilterInnerID():string {
        return `filterInner_${this.portalColorModifier}`;
    }
    get portalMaskPathID():string {
        return `portalMaskPath_${this.portalColorModifier}`;
    }
    get portalMaskID():string {
        return `portalMask_${this.portalColorModifier}`;
    }
    get portalMaskTransformTop():number {
        return this.blue ? 0 : 35;
    }
}
</script>

<style lang="sass" scoped>
    #graphical_portal
        transform-origin: 75px 90px
</style>
