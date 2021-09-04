
const basicSnareOutput = () => {
    let snareFilter = new Tone.EQ3(1, 0, 0).connect(comp);
    let drumSettings = { envelope: { attack: .0001, release: .1 }}
    let snareDrum = new OutputInstrument(Tone.MembraneSynth, snareFilter, -10, drumSettings)
    return snareDrum
}

const basicSnare = () => {
    return {
        name: "basicSnare",
        part: "snare",
        kind: "drum",
        instrument: basicSnareOutput(),
        volume: -15,
        filter: [0, 0, 0],
        fx1: ['Distortion', [1]],
        noteStyle: '16n',
        chordStyle: 'key',
        beatStyle: "offbeat",
        shortcut: '8',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 3)] }
    }
}