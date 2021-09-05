import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const rockFxOutput = () => {
    let fxOptions = {
        oscillator: {
            type: 'triangle',
            detune: 1200
        },
        envelope: {
            attack: .1,
            release: .1
        }
    }
    
    const fxFilter = new Tone.EQ3(-100, -20, -10).connect(comp);
    let fxFx = new Tone.Reverb(1).connect(fxFilter)
    let fxSynth = new OutputInstrument(Tone.Synth, fxFx, -2, fxOptions)
    return fxSynth
}

const rockFx = () => {
    return {
        name: "rockFx",
        part: "fx",
        kind: "fx",
        instrument: rockFxOutput(),
        volume: 15,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'key',
        beatStyle: "offbeatmelody",
        shortcut: '0',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromScalePosition((x % 3) + 1, sn, 5)] }
    }
}

export default rockFx