import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const basicVoxOutput = () => {
    let voxOptions = {
        oscillator: {
            type: 'sawtooth'
        },
        envelope: {
            attack: .1,
            release: .5
        }
    }
    const voxFilter = new Tone.EQ3(-25, -4, -5).connect(comp);
    let voxSynth = new OutputInstrument(Tone.Synth, voxFilter, -5, voxOptions)
    
    return voxSynth
}

const basicVox = () => {
    return {
        name: "basicVox",
        part: "vox",
        kind: "melody",
        instrument: basicVoxOutput(),
        volume: 0,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'key',
        beatStyle: "melody",
        shortcut: '3',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromScalePosition((x % 7) + 1, sn, 4)] }
    }
}

export default basicVox