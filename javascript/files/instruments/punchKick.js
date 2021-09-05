import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'


const punchKickOutput = () => {
    let kickFilter = new Tone.EQ3(2, -100, -100).connect(comp);
    let drumSettings = { envelope: { attack: .01, release: .1 }}
    let kickDrum = new OutputInstrument(Tone.MembraneSynth, kickFilter, -3, drumSettings)
    return kickDrum
}

const punchKick = () => {
    return {
        name: "punchKick",
        part: "kick",
        kind: "drum",
        instrument: punchKickOutput(),
        volume: 5,
        filter: [0, 0, 0],
        fx1: ['Distortion', [1]],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "beat",
        shortcut: '7',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 1)] }
    }
}

export default punchKick