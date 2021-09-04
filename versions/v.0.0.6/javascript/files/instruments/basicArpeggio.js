
const basicArpeggioOutput = () => {
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
    let arpSynth = new OutputInstrument(Tone.Synth, arpFilter, 2, arpOptions)
    return arpSynth
}

const basicArpeggio = () => {
    return {
        name: "basicArpeggio",
        part: "arpeggio",
        kind: "harmony",
        instrument: basicArpeggioOutput(),
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '32n',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '1',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition( ( x % 6 ) + 1, sn, 3)] }
    }
}