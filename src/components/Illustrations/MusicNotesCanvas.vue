<template>
    <canvas
        class="music_notes_canvas"
        ref="canvas"
        :width="windowWidth"
        :height="windowHeight"
    />
</template>

<script lang="ts">
import Point from '@/classes/Point';
import {
    Vue, Component, Watch, Prop,
} from 'vue-property-decorator';
import { vueWindowSizeMixin } from 'vue-window-size';

interface ParticleInterface {
    coords:Point;
    speed:number;
    direction:number;
}

let depthId = 0;

class Particle implements ParticleInterface {
    coords:Point;
    readonly originalCoords:Point;
    readonly yDiviation:number;
    speed:number;
    boostAmount:number;
    pulseAmount:number;
    direction:number;
    readonly depth:number;
    readonly fontSize:number;
    acrossPercentage:number;

    constructor({ coords, speed, direction }:ParticleInterface) {
        this.coords = coords;
        this.originalCoords = new Point({ x: this.coords.x, y: this.coords.y });
        this.yDiviation = 30 + (15 * Math.random());
        this.speed = speed;
        this.boostAmount = 0;
        this.pulseAmount = 0;
        this.direction = direction;
        this.depth = [1, 2, 3][depthId];
        this.fontSize = 30;
        this.acrossPercentage = window.innerWidth / this.coords.x;
        depthId += 1;
        if (depthId > 2) depthId = 0;
    }
    public update():void {
        this.updateBoost();
        this.updatePulse();
        this.updateCoords();
    }
    private updateCoords() {
        let x = this.coords.x - (this.speed + this.boostAmount) / this.depth;
        if (this.coords.x < -30) x = window.innerWidth;
        this.acrossPercentage = x / window.innerWidth;
        const y = this.originalCoords.y + Math.round(
            Math.sin(this.coords.x / this.yDiviation) * 19,
        );
        this.coords.x = x;
        this.coords.y = y;
    }
    private updateBoost():void {
        if (this.boostAmount <= 0) return;
        this.boostAmount -= 0.2;
    }
    private updatePulse():void {
        if (this.pulseAmount <= 0) return;
        this.pulseAmount -= 1;
    }
    public boost():void {
        this.boostAmount = 2.5;
    }
    public pulse():void {
        this.pulseAmount = 15;
    }

    public render(canvas:HTMLCanvasElement, context:CanvasRenderingContext2D):void {
        const fontsize = (this.fontSize + this.pulseAmount) / this.depth;
        context.font = `${fontsize}px Arial`;
        // context.rotate(Math.PI * 2 / (this.rotation * 6));
        context.fillStyle = 'white';
        context.fillText('♪', this.coords.x, this.coords.y);
    }
}

interface ParticleCanvasConfig {
    maxParticleCount:number,
    particleSpeed:number,
    particleSpeedDeviation:number,
    sourcePoint:Point,
}

@Component({
    mixins: [vueWindowSizeMixin],
})
export default class MusicNotesCanvas extends Vue {
    @Prop() readonly kickIsActive: boolean
    @Prop() readonly hiHatIsActive: boolean

    private config:ParticleCanvasConfig;
    private particles:Array<Particle>;
    private canvas:HTMLCanvasElement|null;
    private context:CanvasRenderingContext2D|null;

    constructor() {
        super();

        this.config = {
            maxParticleCount: 100,
            particleSpeed: 1,
            particleSpeedDeviation: 1,
            sourcePoint: new Point({ x: 50, y: 50 }),
        };
        this.canvas = null;
        this.context = null;
        this.particles = [];
    }

    private generate():void {
        if (!this.canvas) return;
        const { canvas } = this;

        for (let index = 0; index < this.config.maxParticleCount; index += 1) {
            const spawnCoordsX = canvas.width * Math.random();
            const spawnCoordsY = canvas.height * Math.random();
            this.particles.push(
                new Particle({
                    coords: new Point({ x: spawnCoordsX, y: spawnCoordsY }),
                    speed: this.config.particleSpeed,
                    direction: 0,
                }),
            );
        }
    }
    private applyToParticles(callable:CallableFunction):void {
        this.particles.forEach((particle) => {
            callable(particle);
        });
    }
    private renderCanvas():void {
        if (!this.context || !this.canvas) return;
        const { context, canvas } = this;
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.applyToParticles((particle:Particle) => {
            particle.render(canvas, context);
        });
    }
    private update():void {
        requestAnimationFrame(() => this.update());
        this.applyToParticles((particle:Particle) => {
            particle.update();
        });
        this.renderCanvas();
    }
    @Watch('kickIsActive')
    private onKick():void {
        this.applyToParticles((particle:Particle) => {
            particle.boost();
        });
    }
    @Watch('hiHatIsActive')
    private onHiHat():void {
        this.applyToParticles((particle:Particle) => {
            particle.pulse();
        });
    }

    private mounted():void {
        this.canvas = this.$refs.canvas as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        const particlePerSquare = 145;
        const { innerHeight, innerWidth } = window;
        this.config.maxParticleCount = Math.ceil(
            (innerHeight * innerWidth) / (particlePerSquare ** 2),
        );
        this.generate();
        this.update();
    }
}
</script>

<style lang="sass" scoped>
    @use '@/styles/main'

</style>
