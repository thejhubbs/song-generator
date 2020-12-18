

const comp = new Tone.Compressor(-30, 1).toDestination()


const lowFilter = new Tone.EQ3(1, -10, -100).connect(comp);
const hatFilter = new Tone.EQ3(-100, -100, 2).connect(comp);
const snareFilter = new Tone.EQ3(2, 0, -100).connect(comp);

const voxFilter = new Tone.EQ3(5, 2, 5).connect(comp);
const vibratoFx = new Tone.Vibrato(5, .1).connect(voxFilter);
const chorusFx = new Tone.Chorus(4, 2.5, 0.5).connect(vibratoFx);

const melFilter = new Tone.EQ3(-50, -20, -50).connect(comp);
const hChFxMel = new Tone.Chorus(4, 5, 4).connect(melFilter);
const chorusFxMel = new Tone.Distortion(1).connect(hChFxMel);

const harmonyFilter = new Tone.EQ3(-15, 0, 1).connect(comp);
const rChFx = new Tone.Reverb(1).connect(harmonyFilter);
const phaser = new Tone.Phaser({
	frequency: 30,
	octaves: 6,
	baseFrequency: 1000
}).connect(rChFx)
const hChFx = new Tone.Chorus(4, 3, 1).connect(phaser);

const fxFilter = new Tone.EQ3(-100, -20, 2).connect(comp);
const reverbFx = new Tone.Reverb(1.5).connect(fxFilter);

let harmonySynth = new Instrument(Tone.Synth, harmonyFilter, 0)
let melodySynth = new Instrument(Tone.Synth, chorusFxMel, 0)
let bassSynth = new Instrument(Tone.Synth, lowFilter, 0)
let voxSynth = new Instrument(Tone.Synth, chorusFx, -5)
let fxSynth = new Instrument(Tone.Synth, reverbFx, 0)

let kickDrum = new Instrument(Tone.MembraneSynth, lowFilter, -8)
let snareDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10)
let hatDrum = new Instrument(Tone.MetalSynth, hatFilter, -25)