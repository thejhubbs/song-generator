
const danceKickOutput = () => {
    let kickFilter = new Tone.EQ3(1, -10, -100).connect(comp);
    let drumSettings = { envelope: { attack: .0001, release: .1 }}
    let kickDrum = new OutputInstrument(Tone.MembraneSynth, kickFilter, -3, drumSettings)
    return kickDrum
}

const danceKick = () => {
    return {
        name: "danceKick",
        part: "kick",
        kind: "drum",
        instrument: danceKickOutput(),
        volume: -12,
        filter: [0, 0, 0],
        fx1: ['Distortion', [1]],
        noteStyle: '32n',
        chordStyle: 'key',
        beatStyle: "hardbeat",
        shortcut: '7',
        noteArray: (chord, sn, x) => { return [chord.printNoteFromChordPosition(1, sn, 1)] }
    }
}