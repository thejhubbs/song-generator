import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'


const rockPianoOutput = () => {
    let arpOptions = {
        oscillator: {
            type: 'triangle',
        },
        envelope: {
            attack: .001,
            release: .1
        }
    }
    
    let arpFilter = new Tone.EQ3(-100, -15, -15).connect(comp);
    let arpSynth = new OutputInstrument(Tone.Synth, arpFilter, 1, arpOptions)
    return arpSynth
}

const rockPiano = () => {
    return {
        name: "rockPiano",
        part: "arpeggio",
        kind: "harmony",
        instrument: rockPianoOutput(),
        volume: 15,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '8n',
        chordStyle: 'chord',
        beatStyle: "melody",
        shortcut: '1',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition( ( x % 6 ) + 1, sn, 4)] }
    }
}

export default rockPiano