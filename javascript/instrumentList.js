const comp = new Tone.Compressor(-30, 1).toDestination()

let harmonyOptions = {
    oscillator: {
        type: 'fatsawtooth',
        spread: 40,
        count: 7
    },
    envelope: {
        attack: .01,
        release: .1
    }
}

let harmonyFilter = new Tone.EQ3(-100, -25, -25).connect(comp);
let harmonySynth = new Instrument(Tone.Synth, harmonyFilter, 2, harmonyOptions)

let arpOptions = {
    oscillator: {
        type: 'sawtooth',
    },
    envelope: {
        attack: .001,
        release: .1
    }
}

let arpFilter = new Tone.EQ3(-100, -25, -25).connect(comp);
let arpSynth = new Instrument(Tone.Synth, arpFilter, 2, arpOptions)

let melodyOptions = {
    oscillator: {
        type: 'square',
        detune: 0
    },
    envelope: {
        attack: .001,
        release: .01
    }
}

let melodyFilter = new Tone.EQ3(-50, -20, -20).connect(comp);
let melodySynth = new Instrument(Tone.Synth, melodyFilter, 0, melodyOptions)


let bassOptions = {
    oscillator: {
        type: 'sawtooth'
    },
    // envelope: {
    //     //attack: .001,
    //     //release: .1
    // }
}

let bassFilter = new Tone.EQ3(-10, -300, -1000).connect(comp);
let bassSynth = new Instrument(Tone.Synth, bassFilter, 0, bassOptions)


let voxOptions = {
    oscillator: {
        type: 'square',
        //detune: -1200
    },
    // envelope: {
    //     attack: .1,
    //     release: 1
    // }
}
const voxFilter = new Tone.EQ3(-15, -4, -15).connect(comp);
let voxSynth = new Instrument(Tone.Synth, voxFilter, -5, voxOptions)

let fxOptions = {
    oscillator: {
        type: 'triangle',
        detune: 1200
    },
    envelope: {
        attack: .1,
        release: .1
    }
}

const fxFilter = new Tone.EQ3(-100, -20, -10).connect(comp);
let fxSynth = new Instrument(Tone.Synth, fxFilter, -2, fxOptions)

let drumSettings = { envelope: { attack: .0001, release: .1 }}
let hatSettings = { envelope: { attack: .0001, release: .1 }}

let kickFilter = new Tone.EQ3(1, -100, -100).connect(comp);
let snareFilter = new Tone.EQ3(1, 0, 0).connect(comp);

let hatFilter = new Tone.EQ3(-100, -15, -5).connect(comp);
let kickDrum = new Instrument(Tone.MembraneSynth, kickFilter, -3, drumSettings)
let snareDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10, drumSettings)
let tomsDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10)
let hatDrum = new Instrument(Tone.MetalSynth, hatFilter, -40, hatSettings)


instrumentList = [
    {
        name: "kick",
        instrument: kickDrum,
        volume: -5,
        filter: [0, 0, 0],
        fx1: ['Distortion', [1]],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "beat",
        shortcut: '7',
        noteArray: (chord, sn, x) => { return [chord.printChordNote(1, sn, 1)] }
    },

    {
        name: "snare",
        instrument: snareDrum,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'key',
        beatStyle: "offbeat",
        shortcut: '8',
        noteArray: (chord, sn, x) => { return [chord.printChordNote(1, sn, 3)] }
    },

    {
        name: "toms",
        instrument: tomsDrum,
        volume: false,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'key',
        shortcut: '9',
        beatStyle: "offbeatmelody",
        noteArray: (chord, sn, x) => { return [chord.printChordNote(3, sn, 3), chord.printChordNote(3, sn, 2), chord.printChordNote(2, sn, 2), chord.printChordNote(1, sn, 2)] }
    },
    
    {
        name: "hat",
        instrument: hatDrum,
        volume: -10,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "melody",
        shortcut: '4',
        noteArray: (chord, sn, x) => { return [chord.printChordNote(1, sn, 6)] }
    },

    {
        name: "bass",
        instrument: bassSynth,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'full',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '5',
        noteArray: (chord, sn, x) => { return [chord.printChordNote(1, sn, 1), chord.printChordNote((x % 4) + 1, sn, 1), chord.printScaleNote((x % 7) + 1, sn, 1)] }
    },

    {
        name: "harmony",
        instrument: harmonySynth,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'chord',
        beatStyle: "beat",
        shortcut: '6',
        noteArray: (chord, sn, x) => { return [chord.printChord(4, sn), null] }
    },

    {
        name: "arpeggio",
        instrument: arpSynth,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '32n',
        chordStyle: 'chord',
        beatStyle: "spreadmelody",
        shortcut: '1',
        noteArray: (chord, sn, x) => { return [chord.printChordNote( ( x % 6 ) + 1, sn, 3), null] }
    },


    {
        name: "melody",
        instrument: melodySynth,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '2',
        noteArray: (chord, sn, x) => { return [chord.printChordNote((x % 6) + 1, sn, 4), chord.printScaleNote((x % 7) + 1, sn, 4), chord.printChordNote((x % 3) + 1, sn, 4)] }
    },

    {
        name: "vox",
        instrument: voxSynth,
        volume: -15,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'full',
        chordStyle: 'key',
        beatStyle: "melody",
        shortcut: '3',
        noteArray: (chord, sn, x) => { return [chord.printScaleNote((x % 7) + 1, sn, 4)] }
    },

    {
        name: "fx",
        instrument: fxSynth,
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'key',
        beatStyle: "beat",
        shortcut: '0',
        noteArray: (chord, sn, x) => { return [chord.printChordNote((x % 3) + 1, sn, 5)] }
    },
]

//BeatStyle-
//Beat- low spread with beatPattern
//Offbeat- low spread but shifted with beatPattern
//Melody- high spread, high randomness off beatPattern
//BeatMelody- high spread with beatPattern
//OffBeatMelody- beatMelody but shifted
//Spreadmelody- very high spread melody

//ChordStyle-
//Key- always on key
//Chord- always on chord
//Random- switch up

//NoteStyle-
//Full- hold until the next note
//Half- split the distance in two
//8n, 16n, 32n- always play that note
