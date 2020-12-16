function randomInt(between) {
    return Math.floor(Math.random() * between)
}

function normalizeAndGetRandomFromMap(map) {
    let total = 0

    map.map((v) => total += v)

    let scale = 100 / total

    map = map.map((v) => v * scale)

    return getRandomFromMap(map)

}

function getRandomFromMap(map) {
    let val = randomInt(100)
    let ret = null
    let total = 0

    map.map((r, i) => {
        if (val >= total && val < (total + r)) { ret = i }
        total += r
    })

    if(ret === null) { ret = map.length - 1 }

    return ret
}

//random true or false
function rTF(weight = 50) {
    let weightMap = [100 - weight, weight]
    let ret = null
    getRandomFromMap(weightMap) === 1 ? ret = true : ret = false
    return ret
}