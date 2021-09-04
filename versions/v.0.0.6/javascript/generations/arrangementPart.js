const generateArrangementsFromBeatPatternAndInstrumentList = (beatPattern, instrumentList) => {
    let newArrangements = []

    let instruments = genre.instrumentList.instrumentSongParts

    instruments.map((song_part) => {
        song_part.parts.map((song_part_kind) => {
            if(!song_part_kind.name) { console.log("ERROR in generation.generateArrangements, no name on song_part_kind")}

            let i = findInstrumentByName(song_part_kind.name)
            if(!i) { console.log("ERROR in generation.generateArrangements, could not find instrument", song_part_kind.name) } 

            let weight = song_part.weight * song_part_kind.weight / 100

            let bp = generateNewBeatPatternFromBeatStyle(beatPattern, i.beatStyle, weight*10)

            let n = new ArrangementPart(song_part_kind.name, bp)
            newArrangements.push(n)
        })
    })
    return newArrangements
}

const getNoteChoicePosition = (beatIndex, repeatSectionPart, weightRatio) => {
    let res = Math.round(beatIndex * repeatSectionPart * weightRatio)
    if( res > 24 || res < 0) { console.log("WARNING in generation.getNoteChoicePosition, result was out of bounds, 0<=x<=24", res)}
    return res
}