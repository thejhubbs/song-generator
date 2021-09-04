let bigTownInstrumentWeight = new InstrumentWeight()

let bigTownGenre = new GenreParent({ 
    modes:  [5, 4, 5],  
    bpms: [70, 80],
    moodChipRanges: {
        resonance: [5, 7],
        tension:  [5, 7],
        repetition: [4, 6],
        excitement: [6, 8],
        spread: [4, 6]
    },     
    instrumentList: bigTownInstrumentWeight
})


    //             //drums, bass, harmony, melody, fx
    //             instrumentWeight: {
    //                 kick: 100,
    //                 hat: 40,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 100,
    //                 harmony: 100,
    //                 arpeggio: 0,
    //                 melody: 100,
    //                 fx: 40,
    //                 vox: 100
    //             }
    //         }