
import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const basicKickOutput = () => {
    let kickFilter = new Tone.EQ3(1, -100, -100).connect(comp);
    let drumSettings = { envelope: { attack: .0001, release: .1 }}
    let kickDrum = new OutputInstrument(Tone.MembraneSynth, kickFilter, -3, drumSettings)
    return kickDrum
}

const basicKick = () => {
    return {
        name: "basicKick",
        part: "kick",
        kind: "drum",
        instrument: basicKickOutput(),
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['Distortion', [1]],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "hardbeat",
        shortcut: '7',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 1)] }
    }
}

export default basicKick