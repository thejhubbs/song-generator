import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const basicHarmonyOutput = () => {
    let harmonyOptions = {
        oscillator: {
            type: 'sawtooth',
        },
        envelope: {
            attack: .01,
            release: .1
        }
    }

    let harmonyFilter = new Tone.EQ3(-100, -25, -25).connect(comp);
    let harmonySynth = new OutputInstrument(Tone.Synth, harmonyFilter, 2, harmonyOptions)
    return harmonySynth
}

const basicHarmony = () => {
    return {
        name: "basicHarmony",
        part: "harmony",
        kind: "harmony",
        instrument: basicHarmonyOutput(),
        volume: 15,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: '16n',
        chordStyle: 'chord',
        beatStyle: "hardbeat",
        shortcut: '6',
        noteArray: (chord, sn, x) => { return [chord.printChord(4, sn)] }
    }
}

export default basicHarmony