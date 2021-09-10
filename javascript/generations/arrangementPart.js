import ArrangementPart from '../components/song/arrangementPart.js'
import beatPatternGeneration from './beatPattern.js'
import {findInstrumentByName} from '../files/instruments/instrumentList.js'

const generateArrangementsFromBeatPatternAndInstrumentList = (genre, beatPattern) => {
    let newArrangements = []

    let instruments = genre.instrumentList.instrumentSongParts

    instruments.map((song_part) => {
        song_part.parts.map((song_part_kind) => {
            if(!song_part_kind.name) { console.log("ERROR in generation.generateArrangements, no name on song_part_kind")}

            let i = findInstrumentByName(song_part_kind.name)
            if(!i) { console.log("ERROR in generation.generateArrangements, could not find instrument", song_part_kind.name) } 

            let weight = (song_part.weight * song_part_kind.weight ) / (20 * beatPattern.excitement)

            let bp = beatPatternGeneration.generateNewBeatPatternFromBeatStyle(beatPattern, i.beatStyle, weight*10)

            let n = new ArrangementPart(song_part_kind.name, bp, i)
            newArrangements.push(n)
        })
    })
    return newArrangements
}

const getNoteChoicePosition = (beatIndex, weightRatio) => {
    let res = Math.round(beatIndex * weightRatio)
    if( res > 24 || res < 0) { console.log("WARNING in generation.getNoteChoicePosition, result was out of bounds, 0<=x<=24", res)}
    if( typeof res !== 'number') { console.log("WARNING in generation.getNoteChoicePosition, result was not a number", res)}
    return res
}

export default {
    generateArrangementsFromBeatPatternAndInstrumentList,
    getNoteChoicePosition
}