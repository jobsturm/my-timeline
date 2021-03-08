export default class AudioVisualiser {
    mp3Path:string;
    audio:HTMLAudioElement;
    audioContext:AudioContext;
    source:MediaElementAudioSourceNode;
    analyser:AnalyserNode;
    bufferLength:number;
    gainNode:GainNode;
    dataArray:Uint8Array;
    isSetup:boolean;
    isPlaying:boolean;
    autoplayAllowed:boolean;
    onStep:CallableFunction;
    volume:number;

    constructor(mp3Path:string, onStep?:CallableFunction, volume = 50) {
        this.mp3Path = mp3Path;
        this.isSetup = false;
        this.isPlaying = false;
        this.autoplayAllowed = false;
        this.volume = volume;
        if (onStep) this.onStep = onStep;
    }
    private getAudio():Promise<Record<'default', string>> {
        return import(/* webpackMode: "eager" */`@/${this.mp3Path}`);
    }
    private async setup():Promise<void> {
        if (this.isSetup) return;
        const audio = await this.getAudio();
        return new Promise((resolve) => {
            this.isSetup = true;
            this.audio = new Audio(audio.default);
            this.audio.load();
            this.audio.addEventListener('play', () => { this.setPlaying(); });
            this.audio.addEventListener('pause', () => { this.setPause(); });
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
            this.source = this.audioContext.createMediaElementSource(this.audio);

            // Analyzer Node
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.smoothingTimeConstant = 0.5;

            // Gain Node (for Volume)
            this.gainNode = this.audioContext.createGain();
            this.setVolume(this.volume);

            this.gainNode.connect(this.audioContext.destination);
            this.analyser.connect(this.gainNode);

            this.source.connect(this.analyser);
            this.analyser.fftSize = 256;
            this.bufferLength = this.analyser.frequencyBinCount;
            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            resolve();
        });
    }
    private setPlaying():void {
        this.isPlaying = true;
    }
    private setPause():void {
        this.isPlaying = false;
    }
    public step():void {
        requestAnimationFrame(() => this.step());
        if (this.audio.currentTime === 0) return;
        this.analyser.getByteFrequencyData(this.dataArray);
        if (this.onStep) this.onStep(this.dataArray);
    }
    public async play():Promise<void> {
        await this.setup();
        this.audio.play().then(() => {
            this.autoplayAllowed = true;
            this.step();
        }).catch(() => {
            this.autoplayAllowed = false;
        });
    }
    public pause():void {
        this.audio.pause();
    }
    public setVolume(volume:number):void {
        this.volume = volume;
        this.gainNode.gain.setValueAtTime(this.volume / 100, this.audioContext.currentTime);
    }
}
