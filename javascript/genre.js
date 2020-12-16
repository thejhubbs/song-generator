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
                spread: [4, 6],
                bpm: [85, 95],
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
        case 'danceballad':
            map = {
                mode: [1, 1, 1, 6],
                resonance: [8, 10],
                tension: [2, 4],
                repetition: [8, 9],
                excitement: [4, 7],
                spread: [4, 6],
                bpm: [50, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
        case 'dancejam':
            map = {
                mode: [1, 1, 2, 4, 5, 6],
                resonance: [8, 10],
                tension: [2, 4],
                repetition: [8, 9],
                excitement: [8, 10],
                spread: [4, 6],
                bpm: [110, 140],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
        case 'spooky':
            map = {
                mode: [3, 3, 6, 7],
                resonance: [8, 10],
                tension: [7, 10],
                repetition: [1, 4],
                excitement: [2, 5],
                spread: [4, 6],
                bpm: [60, 80],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
        case 'danger':
            map = {
                mode: [3, 3, 7],
                resonance: [1, 4],
                tension: [8, 10],
                repetition: [8, 10],
                excitement: [7, 9],
                spread: [4, 6],
                bpm: [120, 160],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
        case 'sleepy':
            map = {
                mode: [1, 1, 1],
                resonance: [8, 10],
                tension: [1, 2],
                repetition: [8, 10],
                excitement: [4, 7],
                spread: [4, 6],
                bpm: [40, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 100,
                    bass: 100,
                    harmony: 100,
                    melody: 100,
                    fx: 100,
                    vox: 100
                } 
            }
            break;
    }
     
    map = {
        mode: [1, 1, 2, 4, 5, 6],
        resonance: [4, 8],
        tension: [4, 8],
        repetition: [4, 8],
        excitement: [6, 8],
        spread: [4, 6],
        bpm: [85, 95],
        instrumentWeight: {
            kick: 100,
            hat: 100,
            bass: 100,
            harmony: 100,
            melody: 100,
            fx: 100,
            vox: 100
        } 
    }

    map.mode = randomValueFromArray(map.mode)
    map.resonance = randomValueFromRange(map.resonance)
    map.tension = randomValueFromRange(map.tension)
    map.repetition = randomValueFromRange(map.repetition)
    map.spread = randomValueFromRange(map.spread)
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