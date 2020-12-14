function getGenreMap(kind) {
    let map = null
    switch (kind) {
        case 'rapbeat':
            map = {
                mode: [3, 6, 3],
                resonance: [8, 10],
                tension: [6, 8],
                repetition: [7, 9],
                excitement: [4, 8],
                bpm: [85, 95],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [40, 40, 25, 10, 40]
            }
            break;
        case 'danceballad':
            map = {
                mode: [1, 1, 1, 6],
                resonance: [8, 10],
                tension: [2, 4],
                repetition: [8, 9],
                excitement: [4, 7],
                bpm: [50, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [50, 15, 45, 20, 2]
            }
            break;
        case 'dancejam':
            map = {
                mode: [1, 1, 2, 4, 5, 6],
                resonance: [8, 10],
                tension: [2, 4],
                repetition: [8, 9],
                excitement: [8, 10],
                bpm: [110, 140],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [50, 25, 50, 50, 30]
            }
            break;
        case 'spooky':
            map = {
                mode: [3, 3, 6, 7],
                resonance: [8, 10],
                tension: [7, 10],
                repetition: [1, 4],
                excitement: [2, 5],
                bpm: [60, 80],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [50, 15, 25, 30, 20]
            }
            break;
        case 'danger':
            map = {
                mode: [3, 3, 7],
                resonance: [1, 4],
                tension: [8, 10],
                repetition: [8, 10],
                excitement: [7, 9],
                bpm: [120, 160],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [15, 25, 35, 10, 20]
            }
            break;
        case 'sleepy':
            map = {
                mode: [1, 1, 1],
                resonance: [8, 10],
                tension: [1, 2],
                repetition: [8, 10],
                excitement: [4, 7],
                bpm: [40, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: [5, 15, 30, 50, 20]
            }
            break;
    }

    map.mode = randomValueFromArray(map.mode)
    map.resonance = randomValueFromRange(map.resonance)
    map.tension = randomValueFromRange(map.tension)
    map.repetition = randomValueFromRange(map.repetition)
    map.excitement = randomValueFromRange(map.excitement)
    map.bpm = randomValueFromRange(map.bpm)

    return map
}

function randomValueFromRange(range) {
    return Math.floor((Math.random() * (range[1] - range[0]) + 1) + range[0])
}

function randomValueFromArray(array) {
    let choiceAmount = array.length
    console.log(choiceAmount, Math.floor((Math.random() * (choiceAmount - 1)) + 1))
    return array[Math.floor((Math.random() * (choiceAmount - 1))) + 1]
}