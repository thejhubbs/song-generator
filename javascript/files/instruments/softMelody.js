import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'


const softMelodyOutput = () => {
    let melodyOptions = {
        oscillator: {
            type: 'triangle',
            detune: 0
        },
        envelope: {
            attack: .1,
            release: .01
        }
    }
    
    let melodyFilter = new Tone.EQ3(-50, -20, -20).connect(comp);
    let melodyFx = new Tone.Chorus(10, 5, 1).connect(melodyFilter);
    melodyFx = new Tone.Vibrato(5, .3).connect(melodyFx)
    let melodySynth = new OutputInstrument(Tone.Synth, melodyFx, 0, melodyOptions)

    return melodySynth
}

const softMelody = () => {
    return {
        name: "softMelody",
        part: "melody",
        kind: "melody",
        instrument: softMelodyOutput(),
        volume: 10,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'chord',
        beatStyle: "melody",
        shortcut: '2',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition((x % 6) + 1, sn, 4), chord.printNoteFromScalePosition((x % 7) + 1, sn, 4), chord.printNoteFromChordPosition((x % 3) + 1, sn, 4)] }
    }
}

export default softMelody