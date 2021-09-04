
const basicMelodyOutput = () => {
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
    let melodySynth = new OutputInstrument(Tone.Synth, melodyFilter, 0, melodyOptions)
    return melodySynth
}

const basicMelody = () => {
    return {
        name: "basicMelody",
        part: "melody",
        kind: "melody",
        instrument: basicMelodyOutput(),
        volume: 10,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '2',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition((x % 6) + 1, sn, 4), chord.printNoteFromScalePosition((x % 7) + 1, sn, 4), chord.printNoteFromChordPosition((x % 3) + 1, sn, 4)] }
    }
}