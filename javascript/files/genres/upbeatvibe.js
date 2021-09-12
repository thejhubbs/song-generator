import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'

let danceJamInstrumentWeight = new InstrumentWeight()

let upbeatVibeGenre = new GenreParent({ 
    name: 'upbeatVibe',
    category: "background",
    
    modes:  [1, 1, 2, 4, 5, 6],  
    bpms: [60, 90],
    moodChipRanges: {
        resonance: [8, 10],
        tension: [4, 5],
        repetition: [8, 9],
        excitement: [3, 7],
        spread: [2, 4]
    },     
    instrumentList: danceJamInstrumentWeight
})


export default upbeatVibeGenre