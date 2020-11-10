export default class AudioVisualiser {
    mp3Path:string;
    audio:HTMLAudioElement;
    audioContext:AudioContext;
    source:MediaElementAudioSourceNode;
    analyser:AnalyserNode;
    bufferLength:number;
    dataArray:Uint8Array;
    isSetup:boolean;
    onStep:CallableFunction;

    constructor(mp3Path:string, onStep?:CallableFunction) {
        this.mp3Path = mp3Path;
        this.isSetup = false;
        if (onStep) this.onStep = onStep;
    }
    private setup():void {
        if (this.isSetup) return;
        this.isSetup = true;
        this.audio = new Audio(this.mp3Path);
        this.audio.load();
        this.audioContext = new AudioContext();
        this.source = this.audioContext.createMediaElementSource(this.audio);
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.smoothingTimeConstant = 0.5;
        this.source.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        this.analyser.fftSize = 256;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    }
    public step():void {
        requestAnimationFrame(() => this.step());
        if (this.audio.currentTime === 0) return;
        this.analyser.getByteFrequencyData(this.dataArray);
        if (this.onStep) this.onStep(this.dataArray);
    }
    public play():void {
        this.setup();
        this.audio.play();
        this.step();
    }
    public pause():void {
        this.audio.pause();
    }
}
