import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'


let rapBeatInstrumentWeight = new InstrumentWeight()

rapBeatInstrumentWeight.changeWeight('drums', '', 6)
rapBeatInstrumentWeight.changeWeight('bass', '', 8)
// rapBeatInstrumentWeight.addInstrumentChoice('drums', 'kick', 'punchKick', 5, 6)

let rapBeatGenre = new GenreParent({ 
    name: 'rapbeat',
    category: "genre",
    
    modes: [6, 6],  
    bpms: [45, 65],
    moodChipRanges: {
        resonance: [7, 8],
        tension: [5, 7],
        repetition: [3, 4],
        excitement: [3, 5],
        spread: [4, 8]
    },     
    instrumentList: rapBeatInstrumentWeight
})


export default rapBeatGenre