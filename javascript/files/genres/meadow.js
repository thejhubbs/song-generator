let meadowInstrumentWeight = new InstrumentWeight()

let meadowGenre = new GenreParent({ 
    modes:  [1, 1, 4, 5],  
    bpms: [50, 60],
    moodChipRanges: {                
        resonance: [6, 8],
        tension: [1, 3],
        repetition: [2, 6],
        excitement: [3, 5],
        spread: [4, 6],
    },     
    instrumentList: meadowInstrumentWeight
})


    //             instrumentWeight: {
    //                 kick: 40,
    //                 hat: 40,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 60,
    //                 harmony: 100,
    //                 arpeggio: 0,
    //                 melody: 100,
    //                 fx: 10,
    //                 vox: 200
    //             }
    //         }