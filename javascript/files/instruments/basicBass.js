import {comp} from '../../components/output/master.js'
import OutputInstrument from '../../components/output/outputInstrument.js'

const basicBassOutput = () => {
    let bassOptions = {
        oscillator: {
            type: 'sawtooth'
        },
        envelope: {
            attack: .00001,
            release: .1
        }
    }
    
    let bassFilter = new Tone.EQ3(-5, -30, -1000).connect(comp);
    let bassFx = new Tone.Distortion(10).connect(bassFilter)
    let bassSynth = new OutputInstrument(Tone.Synth, bassFx, 0, bassOptions)
    return bassSynth
}

const basicBass = () => {
    return {
        name: "basicBass",
        part: "bass",
        kind: "bass",
        instrument: basicBassOutput(),
        volume: -13,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'chord',
        beatStyle: "beatmelody",
        shortcut: '5',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 1), chord.printNoteFromScalePosition((x % 7) + 1, sn, 1), chord.printNoteFromScalePosition((x % 7) + 1, sn, 1)] }
    }
}

export default basicBass