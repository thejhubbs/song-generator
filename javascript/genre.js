function getGenreMap(kind) {
    let map = null

    ///MusicSetting ranges, a bpm range, and instrumentWeight

    switch (kind) {
        case 'rapbeat':
            map = {
                mode: [3, 6, 3],
                resonance: [3, 5],
                tension: [5, 7],
                repetition: [3, 4],
                excitement: [3, 6],
                spread: [4, 6],
                bpm: [85, 95],
                instrumentWeight: {
                    kick: 30,
                    hat: 30,
                    snare: 30,
                    toms: 100,
                    bass: 100,
                    harmony: 30,
                    arpeggio: 100,
                    melody: 70,
                    fx: 50,
                    vox: 30
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
                    kick: 20,
                    hat: 40,
                    snare: 25,
                    toms: 40,
                    bass: 60,
                    harmony: 100,
                    arpeggio: 0,
                    melody: 200,
                    fx: 100,
                    vox: 200
                }
            }
            break;
        case 'dancejam':
            map = {
                mode: [1, 1, 2, 4, 5, 6],
                resonance: [8, 10],
                tension: [4, 5],
                repetition: [8, 9],
                excitement: [8, 10],
                spread: [4, 6],
                bpm: [120, 140],
                instrumentWeight: {
                    kick: 80,
                    hat: 100,
                    snare: 25,
                    toms: 40,
                    bass: 60,
                    harmony: 60,
                    arpeggio: 60,
                    melody: 10,
                    fx: 10,
                    vox: 60
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
                    kick: 80,
                    hat: 100,
                    snare: 25,
                    toms: 40,
                    bass: 200,
                    harmony: 20,
                    arpeggio: 0,
                    melody: 50,
                    fx: 10,
                    vox: 10
                }
            }
            break;
        case 'danger':
            map = {
                mode: [3, 3, 7],
                resonance: [3, 5],
                tension: [6, 8],
                repetition: [8, 10],
                excitement: [7, 9],
                spread: [4, 6],
                bpm: [120, 140],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 80,
                    hat: 100,
                    snare: 25,
                    toms: 40,
                    bass: 80,
                    harmony: 50,
                    arpeggio: 0,
                    melody: 140,
                    fx: 10,
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
                excitement: [4, 6],
                spread: [4, 6],
                bpm: [40, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 20,
                    hat: 100,
                    snare: 25,
                    toms: 40,
                    bass: 100,
                    harmony: 20,
                    arpeggio: 0,
                    melody: 200,
                    fx: 0,
                    vox: 200
                }
            }
            break;
        case 'meadow':
            map = {
                mode: [1, 1, 4, 5],
                resonance: [6, 8],
                tension: [1, 3],
                repetition: [2, 6],
                excitement: [3, 5],
                spread: [4, 6],
                bpm: [50, 60],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 40,
                    hat: 40,
                    snare: 25,
                    toms: 40,
                    bass: 60,
                    harmony: 100,
                    arpeggio: 0,
                    melody: 100,
                    fx: 10,
                    vox: 200
                }
            }
            break;
            case 'sea':
                map = {
                    mode: [1, 1, 5],
                    resonance: [6, 8],
                    tension: [1, 3],
                    repetition: [6, 6],
                    excitement: [5, 7],
                    spread: [4, 6],
                    bpm: [60, 70],
                    //drums, bass, harmony, melody, fx
                    instrumentWeight: {
                        kick: 70,
                        hat: 40,
                        snare: 25,
                        toms: 40,
                        bass: 70,
                        harmony: 50,
                        arpeggio: 0,
                        melody: 100,
                        fx: 50,
                        vox: 100
                    }
                }
                break;
        case 'hometown':
            map = {
                mode: [1, 1, 1, 4],
                resonance: [8, 10],
                tension: [2, 4],
                repetition: [2, 6],
                excitement: [4, 7],
                spread: [4, 6],
                bpm: [60, 80],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 40,
                    hat: 40,
                    snare: 25,
                    toms: 40,
                    bass: 60,
                    harmony: 100,
                    arpeggio: 0,
                    melody: 200,
                    fx: 10,
                    vox: 200
                }
            }
            break;

        case 'bigtown':
            map = {
                mode: [5, 4, 5],
                resonance: [5, 7],
                tension: [5, 7],
                repetition: [4, 6],
                excitement: [6, 8],
                spread: [4, 6],
                bpm: [70, 80],
                //drums, bass, harmony, melody, fx
                instrumentWeight: {
                    kick: 100,
                    hat: 40,
                    snare: 25,
                    toms: 40,
                    bass: 100,
                    harmony: 100,
                    arpeggio: 0,
                    melody: 100,
                    fx: 40,
                    vox: 100
                }
            }
            break;
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