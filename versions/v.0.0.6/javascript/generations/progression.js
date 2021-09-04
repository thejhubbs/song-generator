const progressionGenerationMap = [
    { resonance: 90, tension: 10, repetition: 0 },
    { resonance: 30, tension: 20, repetition: 50 },
    { resonance: 40, tension: 20, repetition: 40 },
    { resonance: 0, tension: 80, repetition: 20 },
]

const generatePositionWeights = (position, progression) => {
    let settings = [progression.moodChip.resonance, progression.moodChip.tension, progression.moodChip.repetition]
    let positionWeights = progressionGenerationMap[position - 1]
    let temp = []
    let total = 0

    Object.values(positionWeights).map((p, i) => {
        temp[i] = p * settings[i]
        total += temp[i]
    })

    return temp.map((p, i) => {
        return Math.floor((p / total) * 100)
    })
}


//These next 3 are all pretty much the same except for the "initial arrays."
//The numbers represent a likelyhood that that position's number will be chosen.
// ex. [85, 15, 0] => 85% of 0, 15% of 1, 0% of 2.
//That number is futher weighted by the expression in the map- 
//Any values above 5 will increase the chance of higher numbers, while values below 5 will favor smaller numbers.
const generateResonance = (progression) => {
    let resonanceMap = [95, 5, 0].map((v) => v ** ((progression.moodChip.resonance - 5) / 2))
    return normalizeAndGetRandomFromMap(resonanceMap)
}

const generateTensionFunction = (progression) => {
    let map = [10, 30, 60].map((v) => v ** ((progression.moodChip.tension - 5) / 2))
    return normalizeAndGetRandomFromMap(map)
}

const generateTensionFlavor = (progression) => {
    let map = [50, 30, 20].map((v) => v ** ((progression.moodChip.tension - 5) / 2))
    return normalizeAndGetRandomFromMap(map)
}

const generateRepeat = (progression, funcFlav, position) => {
    switch (position) {
        case 1:
            return 0
        case 2:
            return progression.chords[0][funcFlav]
        case 3:
            return randomTrueFalse(85) ? progression.chords[0][funcFlav] : progression.chords[1][funcFlav]
        case 4:
            return progression.chords[1][funcFlav]
    }
}

const regenerateFirstChord = (progression) => {
    if (progression.moodChip.resonance > progression.moodChip.tension) {
        progression.chords[0].alterFuncFlavor(-1, -1)
    } else {
        progression.chords[0].alterFuncFlavor(0, 1)
    }
}

const regenerateSecondChord = (progression) => {
    if (randomTrueFalse((progression.moodChip.resonance / 12) * 100)) {
        progression.chords[1].alterFuncFlavor(-1, 0)
    }
    if (randomTrueFalse((progression.moodChip.tension + (5 - progression.moodChip.repetition) / 15) * 10)) {
        progression.chords[1].alterFuncFlavor(0, 1)
    }
}

const regenerateThirdChord = (progression) => {
    if (randomTrueFalse((progression.moodChip.resonance / 12) * 100)) {
        progression.chords[2].alterFuncFlavor(0, -1)
    }
    if (randomTrueFalse((progression.moodChip.tension + (5 - progression.moodChip.repetition) / 15) * 10)) {
        progression.chords[2].alterFuncFlavor(-1, 1)
    }
}

const regenerateFourthChord = (progression) => {
    if (randomTrueFalse((progression.moodChip.resonance / 12) * 100)) {
        progression.chords[3].alterFuncFlavor(0, -1)
    }
    if (randomTrueFalse((progression.moodChip.tension + (5 - progression.repetition) / 10) * 10)) {
        progression.chords[3].alterFuncFlavor(1, 1)
    }
    if (randomTrueFalse((progression.moodChip.tension * progression.moodChip.tension / 125) * 100)) {
        progression.chords[3].addOneNote([7, 9, 11, 13])
    }
    if (randomTrueFalse((progression.moodChip.tension * progression.moodChip.tension / 150) * 100)) {
        progression.chords[3].addOneNote([7, 9, 11, 13])
    }
}

const regenerateAllChords = (progression) => {
    if (chordIsEqual(progression.chords[0], progression.chords[1])) {
        progression.chords[1].changeNote(3, 4)
    }
    if (chordIsEqual(progression.chords[0], progression.chords[2])) {
        progression.chords[2].changeBass(progression.chords[2].notes[1])
    }
    if (chordIsEqual(progression.chords[0], progression.chords[3])) {
        progression.chords[3].addOneNote([7, 9, 11, 13])
    }
    if (chordIsEqual(progression.chords[1], progression.chords[2])) {
        progression.chords[2].changeBass(progression.chords[2].bass + 1)
    }
    if (chordIsEqual(progression.chords[1], progression.chords[3])) {
        progression.chords[3].addOneNote([7, 9, 11, 13])
        progression.chords[3].changeBass(progression.chords[3].notes[1])
    }
    if (chordIsEqual(progression.chords[2], progression.chords[3])) {
        progression.chords[3].changeNote(3, 4)
    }
}

function chordIsEqual(c1, c2) {
    return c1.func === c2.func && c1.flavor === c2.flavor
}