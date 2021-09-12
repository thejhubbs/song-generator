
import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const basicHatOutput = () => {
    let hatFilter = new Tone.EQ3(-100, -15, -5).connect(comp);
    let hatDrum = new OutputInstrument(Tone.MetalSynth, hatFilter, -40)
    return hatDrum
}

const basicHat = () => {
    return {
        name: "basicHat",
        part: "hat",
        kind: "drum",
        instrument: basicHatOutput(),
        volume: -15,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "beatmelody",
        shortcut: '4',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 6)] }
    }
}

export default basicHat