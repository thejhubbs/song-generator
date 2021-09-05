import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'


const basicTomsOutput = () => {
    let snareFilter = new Tone.EQ3(1, 0, 0).connect(comp);
    let tomsDrum = new OutputInstrument(Tone.MembraneSynth, snareFilter, -10)
    return tomsDrum
}

const basicToms = () => {
    return {
        name: "basicToms",
        part: "toms",
        kind: "drum",
        instrument: basicTomsOutput(),
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'key',
        shortcut: '9',
        beatStyle: "offbeatmelody",
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(3, sn, 3), chord.printNoteFromChordPosition(3, sn, 2), chord.printNoteFromChordPosition(2, sn, 2), chord.printNoteFromChordPosition(1, sn, 2)] }
    }
}

export default basicToms