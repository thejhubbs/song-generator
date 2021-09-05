import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'

let dangerInstrumentWeight = new InstrumentWeight()

let dangerGenre = new GenreParent({ 
    name: 'danger',
    category: "videogame",
    
    modes:  [3, 3, 7],  
    bpms: [120, 140],
    moodChipRanges: {                
        resonance: [3, 5],
        tension: [6, 8],
        repetition: [8, 10],
        excitement: [7, 9],
        spread: [4, 6],
    },     
    instrumentList: dangerInstrumentWeight
})


export default dangerGenre
    //             instrumentWeight: {
    //                 kick: 80,
    //                 hat: 100,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 80,
    //                 harmony: 50,
    //                 arpeggio: 0,
    //                 melody: 140,
    //                 fx: 10,
    //                 vox: 100
    //             }
    //         }