const defaultInstrumentWeightValues = () => {
    return [
        {
            name: 'drums',
            weight: 5,
            kinds: [
                {
                    kind: 'kick',
                    weight: 5,
                    name: 'danceKick',
                    choiceWeight: 10
                },
                {
                    kind: 'hat',
                    weight: 5,
                    name: 'basicHat',
                    choiceWeight: 10
                },
                {
                    kind: 'snare',
                    weight: 2,
                    name: 'basicSnare',
                    choiceWeight: 10
                },
                {
                    kind: 'toms',
                    weight: 1,
                    name: "basicToms",
                    choiceWeight: 10
                },
            ]
        },

        {
            name: 'bass',
            weight: 5,
            kinds: [
                {
                    kind: 'bass',
                    weight: 5,
                    name: "basicBass",
                    choiceWeight: 10
                },
            ]
        },

        {
            name: 'harmony',
            weight: 5,
            kinds: [
                {
                    kind: 'harmony',
                    weight: 5,
                    name: "basicHarmony",
                    choiceWeight: 10
                },
                {
                    kind: 'arpeggio',
                    weight: 1,
                    name: "basicArpeggio",
                    choiceWeight: 10
                },
            ]
        },

        {
            name: 'melody',
            weight: 5,
            kinds: [
                {
                    kind: 'melody',
                    weight: 5,
                    name: "basicMelody",
                    choiceWeight: 10
                },
                {
                    kind: 'vox',
                    weight: 5,
                    name: "basicVox",
                    choiceWeight: 10
                },
            ]
        },

        {
            name: 'fx',
            weight: 5,
            kinds: [
                {
                    kind: 'fx',
                    weight: 5,
                    name: "basicFx",
                    choiceWeight: 10
                },
            ]
        }
    ]
}

export default defaultInstrumentWeightValues