import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'

let danceBalladInstrumentWeight = new InstrumentWeight()

let danceBalladGenre = new GenreParent({
    name: 'danceballad',
    category: "genre",
    
    modes: [1, 1, 1, 6],
    bpms: [50, 60],
    moodChipRanges: {
        resonance: [8, 10],
        tension: [2, 4],
        repetition: [8, 9],
        excitement: [4, 7],
        spread: [4, 6],
    },
    instrumentList: danceBalladInstrumentWeight
})

export default danceBalladGenre

    //             instrumentWeight: {
    //                 kick: 20,
    //                 hat: 40,
    //                 snare: 25,
    //                 toms: 40,
    //                 bass: 60,
    //                 harmony: 100,
    //                 arpeggio: 0,
    //                 melody: 200,
    //                 fx: 100,
    //                 vox: 200
    //             }