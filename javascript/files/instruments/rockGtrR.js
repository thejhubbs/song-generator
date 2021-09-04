const rockGtrROutput = () => {
    let harmonyOptions = {
        oscillator: {
            type: 'square',
            detune: 0
        },
        envelope: {
            attack: .001,
            release: .1
        }
    }

    let harmonyFilter = new Tone.EQ3(-50, -10, -10).connect(comp);
    let harmonyFx = new Tone.Distortion(1).connect(harmonyFilter)
    let harmonySynth = new OutputInstrument(Tone.Synth, harmonyFx, 2, harmonyOptions)
    return harmonySynth
}

const rockGtrR = () => {
    return {
        name: "rockGtrR",
        part: "harmony",
        kind: "harmony",
        instrument: rockGtrROutput(),
        volume: 50,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '6',
        noteArray: (chord, sn, x) => { return [ [chord.printNoteFromChordPosition(1, sn, 3), chord.printNoteFromChordPosition(3, sn, 4)], chord.printNoteFromChordPosition(1, sn, 2)] }
    }
}
