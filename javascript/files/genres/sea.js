import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'


let seaInstrumentWeight = new InstrumentWeight()

let seaGenre = new GenreParent({ 
    name: 'sea',
    category: "videogame",
    
    modes:  [1, 1, 5],  
    bpms: [60, 70],
    moodChipRanges: {                
        resonance: [6, 8],
        tension: [1, 3],
        repetition: [6, 6],
        excitement: [5, 7],
        spread: [4, 6],
    },     
    instrumentList: seaInstrumentWeight
})


export default seaGenre