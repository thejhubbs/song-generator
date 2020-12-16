
const comp = new Tone.Compressor(-30, 1).toDestination()

const highFilter = new Tone.EQ3(-100, -50, -10).connect(comp);
const midFilter = new Tone.EQ3(-1, -2, -10).connect(comp);
const lowFilter = new Tone.EQ3(2, -40, -100).connect(comp);
const hatFilter = new Tone.EQ3(-100, -100, 2).connect(comp);
const snareFilter = new Tone.EQ3(2, 0, -100).connect(comp);

const voxFilter = new Tone.EQ3(5, 2, 5).connect(comp);
const vibratoFx = new Tone.Vibrato(5, .1).connect(voxFilter);
const chorusFx = new Tone.Chorus(4, 2.5, 0.5).connect(vibratoFx);

const hChFx = new Tone.Chorus(4, 2.5, 0.5).connect(midFilter);

const fxFilter = new Tone.EQ3(-100, -20, 2).connect(comp);
const reverbFx = new Tone.Reverb(1.5).connect(fxFilter);

let harmonySynth = new Instrument(Tone.Synth, hChFx, 0)
let melodySynth = new Instrument(Tone.Synth, highFilter, 0)
let bassSynth = new Instrument(Tone.Synth, lowFilter, 2)
let voxSynth = new Instrument(Tone.Synth, chorusFx, -5)
let fxSynth = new Instrument(Tone.Synth, reverbFx, 0)

let kickDrum = new Instrument(Tone.MembraneSynth, lowFilter, -8)
let snareDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10)
let hatDrum = new Instrument(Tone.MetalSynth, hatFilter, -25)