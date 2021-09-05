import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'

let spookyInstrumentWeight = new InstrumentWeight()

let spookyGenre = new GenreParent({
    name: 'spooky',
    category: "videogame",
    
    modes: [3, 3, 6, 7],
    bpms: [60, 80],
    moodChipRanges: {
        resonance: [8, 10],
        tension: [7, 10],
        repetition: [1, 4],
        excitement: [2, 5],
        spread: [4, 6],
    },
    instrumentList: spookyInstrumentWeight
})


export default spookyGenre
    //             instrumentWeight: {
    //                 kick: 80,
    //                 hat: 100,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 200,
    //                 harmony: 20,
    //                 arpeggio: 0,
    //                 melody: 50,
    //                 fx: 10,
    //                 vox: 10
    //             }
    //         }