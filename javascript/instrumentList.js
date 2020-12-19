

const comp = new Tone.Compressor(-30, 1).toDestination()


// const lowFilter = new Tone.EQ3(1, -10, -100).connect(comp);
// const hatFilter = new Tone.EQ3(-100, -100, 2).connect(comp);
// const snareFilter = new Tone.EQ3(2, 0, -100).connect(comp);



//const rChFx = new Tone.Reverb(1).connect(harmonyFilter);
// const phaser = new Tone.Phaser({
// 	frequency: 30,
// 	octaves: 6,
// 	baseFrequency: 1000
// }).connect(rChFx)
//const hChFx = new Tone.Chorus(4, 2.5, .5).connect(harmonyFilter);


let harmonyOptions = {
    oscillator: {
        type: 'fatsawtooth',
        spread: 70,
        count: 7
    },
    envelope: {
        attack: .5,
        release: .5
    }
}
let harmonyReverb = new Tone.Reverb(.6).connect(comp)
let harmonyFilter = new Tone.EQ3(-10, 0, -45).connect(harmonyReverb);
let harmonySynth = new Instrument(Tone.Synth, harmonyFilter, 0, harmonyOptions)

let melodyOptions = {
    oscillator: {
        type: 'square',
        detune: 0
    },
    envelope: {
        attack: .001,
        release: 1
    }
}
//let melodyReverb = new Tone.Reverb(1).connect(comp)
let melodyChorus = new Tone.Distortion(.1).connect(comp);
let melodyFilter = new Tone.EQ3(-50, -20, -20).connect(melodyChorus);
let melodySynth = new Instrument(Tone.Synth, melodyFilter, 0, melodyOptions)

let melodyBOptions = {
    oscillator: {
        type: 'triangle',
        detune: 1200
    },
    envelope: {
        attack: .1,
        release: 3
    }
}
let melodyBReverb = new Tone.Reverb(2).connect(comp)
let melodyBVibrato = new Tone.Vibrato(10, .05).connect(comp);
let melodyBFilter = new Tone.EQ3(-50, -15, -10).connect(melodyBVibrato);
let melodyBSynth = new Instrument(Tone.Synth, melodyBFilter, 0, melodyBOptions)

let bassOptions = {
    oscillator: {
        type: 'sawtooth'
    },
    // envelope: {
    //     //attack: .001,
    //     //release: .1
    // }
}

let bassDistortion = new Tone.Distortion(.05).connect(comp);
let bassFilter = new Tone.EQ3(-10, -300, -1000).connect(bassDistortion);
let bassSynth = new Instrument(Tone.Synth, bassFilter, 0, bassOptions)


let voxOptions = {
    oscillator: {
        type: 'fatsawtooth',
        spread: 20,
        count: 7,
        detune: -1200
    },
    envelope: {
        attack: .1,
        release: 1
    }
}
const voxFilter = new Tone.EQ3(-50, 0, -50).connect(comp);
const vibratoFx = new Tone.Vibrato(5, .1).connect(voxFilter);
const chorusFx = new Tone.Chorus(4, 2.5, 0.5).connect(vibratoFx);
let voxSynth = new Instrument(Tone.Synth, chorusFx, -5, voxOptions)


let vox2Options = {
    oscillator: {
        type: 'square',
        //detune: -1200
    },
    // envelope: {
    //     attack: .1,
    //     release: 1
    // }
}
const vox2Filter = new Tone.EQ3(0, 0, -15).connect(comp);
//const vibrato2Fx = new Tone.Vibrato(5, .1).connect(vox2Filter);
const chorus2Fx = new Tone.Chorus(4, 2.5, 0.5).connect(vox2Filter);
let vox2Synth = new Instrument(Tone.Synth, chorus2Fx, -5, vox2Options)

let vox3Options = {
    oscillator: {
        type: 'triangle',
        detune: 1200
    },
    envelope: {
        attack: .1,
        release: 1
    }
}
const reverb3Fx = new Tone.Reverb(.5).connect(comp);
const vox3Filter = new Tone.EQ3(-100, 0, -15).connect(reverb3Fx);
const vibrato3Fx = new Tone.Vibrato(5, .1).connect(vox3Filter);
let vox3Synth = new Instrument(Tone.Synth, vibrato3Fx, -10, vox3Options)

let fxOptions = {
    oscillator: {
        type: 'triangle',
        detune: 1200
    },
    envelope: {
        attack: .1,
        release: 1
    }
}

const fxFilter = new Tone.EQ3(-100, -20, -10).connect(comp);
const fxReverb = new Tone.Reverb(5).connect(fxFilter);
let fxSynth = new Instrument(Tone.Synth, fxReverb, -2, fxOptions)


let fxBOptions = {
    oscillator: {
        type: 'sine',
        detune: -1200
    },
    envelope: {
    }
}

const fxBFilter = new Tone.EQ3(-50, -10, -20).connect(comp);
const fxBReverb = new Tone.Reverb(1).connect(fxBFilter);
let fxBSynth = new Instrument(Tone.Synth, fxBFilter, 0, fxOptions)


let kickFilter = new Tone.EQ3(1, -100, -100).connect(comp);
let kickDrum = new Instrument(Tone.MembraneSynth, kickFilter, -3)
// let snareDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10)
// let hatDrum = new Instrument(Tone.MetalSynth, hatFilter, -25)