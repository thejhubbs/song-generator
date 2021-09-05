import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'

let homeTownInstrumentWeight = new InstrumentWeight()

let homeTownGenre = new GenreParent({ 
    name: 'hometown',
    category: "videogame",
    
    modes:  [1, 1, 1, 4],  
    bpms: [60, 80],
    moodChipRanges: {                
        resonance: [8, 10],
        tension: [2, 4],
        repetition: [2, 6],
        excitement: [4, 7],
        spread: [4, 6],
    },     
    instrumentList: homeTownInstrumentWeight
})

export default homeTownGenre

    //             instrumentWeight: {
    //                 kick: 40,
    //                 hat: 40,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 60,
    //                 harmony: 100,
    //                 arpeggio: 0,
    //                 melody: 200,
    //                 fx: 10,
    //                 vox: 200
    //             }
    //         }