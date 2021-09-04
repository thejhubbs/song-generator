let danceJamInstrumentWeight = new InstrumentWeight()

let danceJamGenre = new GenreParent({ 
    modes:  [1, 1, 2, 4, 5, 6],  
    bpms: [120, 140],
    moodChipRanges: {
        resonance: [8, 10],
        tension: [4, 5],
        repetition: [8, 9],
        excitement: [8, 10],
        spread: [4, 6]
    },     
    instrumentList: danceJamInstrumentWeight
})

    //             instrumentWeight: {
    //                 kick: 80,
    //                 hat: 100,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 60,
    //                 harmony: 60,
    //                 arpeggio: 60,
    //                 melody: 10,
    //                 fx: 10,
    //                 vox: 60
    //             }
    //         }