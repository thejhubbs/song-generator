const basicSynthOutput = () => {
    let harmonyOptions = {
        oscillator: {
            type: 'fatsawtooth',
            spread: 60,
            count: 8
        },
        envelope: {
            attack: 1,
            release: 1
        }
    }

    let harmonyFilter = new Tone.EQ3(-100, -15, -25).connect(comp);
    let harmonySynth = new OutputInstrument(Tone.Synth, harmonyFilter, 2, harmonyOptions)
    return harmonySynth
}

const synthHarmony = () => {
    return {
        name: "synthHarmony",
        part: "harmony",
        kind: "harmony",
        instrument: basicHarmonyOutput(),
        volume: 8,
        filter: [0, 0, 0],
        fx1: ['', []],
        noteStyle: 'full',
        chordStyle: 'chord',
        beatStyle: "beat",
        shortcut: '6',
        noteArray: (chord, sn, x) => { return [chord.printChord(4, sn)] }
    }
}
