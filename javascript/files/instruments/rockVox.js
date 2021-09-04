
const rockVoxOutput = () => {
    let voxOptions = {
        oscillator: {
            type: 'fatsawtooth',
            spread: 25,
            count: 4
        },
        envelope: {
            attack: .1,
            release: .5
        }
    }
    const voxFilter = new Tone.EQ3(-5, -15, -5).connect(comp);
    let voxSynth = new OutputInstrument(Tone.Synth, voxFilter, -5, voxOptions)
    
    return voxSynth
}

const rockVox = () => {
    return {
        name: "rockVox",
        part: "vox",
        kind: "melody",
        instrument: rockVoxOutput(),
        volume: 12,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'half',
        chordStyle: 'key',
        beatStyle: "beatmelody",
        shortcut: '3',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromScalePosition((x % 7) + 1, sn, 4)] }
    }
}