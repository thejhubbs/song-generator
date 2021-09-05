import InstrumentWeight from '../../components/instruments/instrumentWeight.js'
import GenreParent from '../../components/genre.js'


let rockInstrumentWeight = new InstrumentWeight()

rockInstrumentWeight.replaceInstrument('bass', 'bass', 'rockBass')
rockInstrumentWeight.replaceInstrument('fx', 'basicFx', 'rockFx')
rockInstrumentWeight.replaceInstrument('melody', 'softMelody', 'rockGtrL')
rockInstrumentWeight.replaceInstrument('melody', 'basicVox', 'rockVox')
rockInstrumentWeight.replaceInstrument('harmony', 'basicHarmony', 'rockGtrR')
rockInstrumentWeight.replaceInstrument('harmony', 'basicArpeggio', 'rockPiano')

rockInstrumentWeight.changeWeight('harmony', 'rockGtrR', 8)
rockInstrumentWeight.changeWeight('melody', 'rockGtrL', 4)
rockInstrumentWeight.changeWeight('drums', '', 8)
rockInstrumentWeight.changeWeight('harmony', 'rockPiano', 4)


rockInstrumentWeight.removeInstrument('drums')
rockInstrumentWeight.removeInstrument('bass')
rockInstrumentWeight.removeInstrument('harmony')
// rockInstrumentWeight.removeInstrument('melody')
// rockInstrumentWeight.removeInstrument('fx')

// rockInstrumentWeight.addInstrumentChoice('drums', 'kick', 'punchKick', 5, 6)

let rockGenre = new GenreParent({ 
    name: 'rock',
    category: "genre",
    
    modes: [1, 2, 3, 4, 5, 6],  
    bpms: [75, 95],
    moodChipRanges: {
        resonance: [6, 8],
        tension: [4, 6],
        repetition: [5, 6],
        excitement: [5, 9],
        spread: [4, 6]
    },     
    instrumentList: rockInstrumentWeight
})


export default rockGenre