import BeatPattern from '../components/song/beatPattern.js'

const generateNewBeatPatternFromBeatStyle = (beatPattern, beatStyle, weight) => {

    if (beatPattern.constructor.name !== "BeatPattern") {
        console.log("ERROR in generation.beatPattern.generateNewBeatPatternFromBeatStyle- variable beatPattern should be of type BeatPatternv",
            beatPatternconstructor.name, beatPattern)
    }
    if (typeof weight !== 'number' || weight <= 0) {
        console.log("ERROR in generation.beatPattern.generateNewBeatPatternFromBeatStyle- variable weight should be a number >= 1", typeof weight, weight)
    }

    let bp = null
    switch (beatStyle) {
        case ('hardbeat'):
            bp = beatPattern.cloneAlter(weight)
            break;
        case ('beat'):
            bp = beatPattern.cloneRandomize(10).cloneAlter(weight)
        case ('beatmelody'):
        case ('offbeatmelody'):
            bp = beatPattern.cloneRandomize(4).cloneAlter(weight)
            break;
        case ('offbeat'):
        case ('melody'):
            bp = new BeatPattern(beatPattern.moodChip.clone(), beatStyle).cloneRandomize(beatPattern.moodChip.resonance).cloneAlter(weight)
            break;
        default:
            bp = beatPattern.clone()
            break;
    }
    bp.changeBeatStyle(beatStyle)
    return bp
}


const alterWeight = (original_excitement, incoming_excitement, weight) => {
    if (typeof incoming_excitement !== 'number' || incoming_excitement <= 0) {
        console.log("ERROR in generation.beatPattern.alterWeight- variable incoming_excitement should be a number >= 1", typeof incoming_excitement, incoming_excitement)
    }
    if (typeof original_excitement !== 'number' || original_excitement <= 0) {
        console.log("ERROR in generation.beatPattern.alterWeight- variable original_excitement should be a number >= 1", typeof original_excitement, original_excitement)
    }
    if (typeof weight !== 'number' || weight <= 0) {
        console.log("ERROR in generation.beatPattern.alterWeight- variable weight should be a number >= 1", typeof weight, weight)
    }

    let scaleContrast = incoming_excitement / original_excitement
    let newWeight = Math.round(weight * scaleContrast)

    if (typeof newWeight !== 'number' || newWeight < 0) {
        console.log("ERROR in generation.beatPattern.alterWeight- result newWeight should be a number >= 1", typeof newWeight, newWeight, { original_excitement, incoming_excitement, weight })
    }

    return newWeight
}
const generateBeatMap = (beatStyle) => {
    let randomMap = []

    switch (beatStyle) {
        case 'beat':
            for (let i = 2; i < 6; i++) {
                let val = 2 ** (i + 1)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push(subtotal)
                    subtotal += val
                }
            }
            break;
        case 'offbeat':
            for (let i = 1; i < 5; i++) {
                let val = 2 ** (i + 1)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push((subtotal + 24) % 32)
                    subtotal += val
                }
            }
            break;
        case 'melody':
            for (let i = 1; i < 4; i++) {
                let val = 2 ** (i)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push(subtotal)
                    subtotal += val
                }
            }

            break;
        case 'beatmelody':
            for (let i = 1; i < 7; i++) {
                let val = 2 ** (i)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push(subtotal)
                    subtotal += val
                }
            }
            break;
        case 'offbeatmelody':
            for (let i = 1; i < 5; i++) {
                let val = 2 ** (i)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push((subtotal + 24) % 32)
                    subtotal += val
                }
            }
            break;
        case 'hardbeat':
            for (let i = 3; i < 7; i++) {
                let val = 2 ** (i + 1)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push((subtotal))
                    subtotal += val
                }
            }
            break;
        default:
            for (let i = 1; i < 5; i++) {
                let val = 2 ** (i + 1)
                let subtotal = 0
                while (subtotal < 32) {
                    randomMap.push((subtotal + 24) % 32)
                    subtotal += val
                }
            }
            break;


    }

    return randomMap
}


export default {
    generateNewBeatPatternFromBeatStyle,
    alterWeight,
    generateBeatMap
}