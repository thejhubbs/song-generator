export function randomInt(between) {
    return Math.floor(Math.random() * between)
}

export function normalizeAndGetRandomFromMap(map) {
    let total = 0

    map.map((v) => total += v)

    let scale = 100 / total

    map = map.map((v) => v * scale)

    return getRandomFromMap(map)
}

export function getRandomFromMap(map) {
    let val = randomInt(100)
    let ret = null
    let total = 0

    map.map((r, i) => {
        if (val >= total && val < (total + r)) { ret = i }
        total += r
    })

    if (ret === null) { ret = map.length - 1 }

    return ret
}

export function getRandomValueFromMap(map) {
    let val = Math.floor( Math.random() * map.length )

    return map[val]
}

//random true or false
export function randomTrueFalse(weight = 50) {
    let weightMap = [100 - weight, weight]
    let ret = null
    getRandomFromMap(weightMap) === 1 ? ret = true : ret = false
    return ret
}

//Put in two values. the first is the true weight, the second is the false weight
export function weightedTrueFalse(trueWeight, falseWeight) {
    return [true, false][normalizeAndGetRandomFromMap([trueWeight, falseWeight])]
}

export function bound(value, low, high) {
    let ret = value || 0
    if (ret < low) { ret = low }
    if (ret > high) { ret = high }
    return ret
}

export default {
    randomInt,
    normalizeAndGetRandomFromMap,
    getRandomFromMap,
    getRandomValueFromMap,
    randomTrueFalse,
    weightedTrueFalse,
    bound
}