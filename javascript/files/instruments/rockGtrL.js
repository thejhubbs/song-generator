import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'


const rockGtrLOutput = () => {
    let melodyOptions = {
        oscillator: {
            type: 'square',
            detune: 0
        },
        envelope: {
            attack: .001,
            release: .1
        }
    }
    
    let melodyFilter = new Tone.EQ3(-50, -20, -5).connect(comp);
    let melodyFx = new Tone.Distortion(1).connect(melodyFilter)
    let melodySynth = new OutputInstrument(Tone.Synth, melodyFx, 0, melodyOptions)
    return melodySynth
}

const rockGtrL = () => {
    return {
        name: "rockGtrL",
        part: "melody",
        kind: "melody",
        instrument: rockGtrLOutput(),
        volume: -5,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'chord',
        beatStyle: "melody",
        shortcut: '2',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition((x % 6) + 1, sn, 4), chord.printNoteFromScalePosition((x % 7) + 1, sn, 4), chord.printNoteFromChordPosition((x % 3) + 1, sn, 4)] }
    }
}

export default rockGtrL