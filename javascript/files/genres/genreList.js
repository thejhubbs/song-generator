
let genre = getRandomGenreInstanceFromKind('rock')

function getRandomGenreInstanceFromKind(kind) {
    let map = null

    switch (kind) {
        case 'rapbeat':
            map = rapBeatGenre.generateRandomInstance()
            break;
        case 'danceballad':
            map = danceBalladGenre.generateRandomInstance()
            break;
        case 'dancejam':
            map = danceJamGenre.generateRandomInstance()
            break;
        case 'spooky':
            map = spookyGenre.generateRandomInstance()
            break;
        case 'danger':
            map = dangerGenre.generateRandomInstance()
            break;
        case 'sleepy':
            map = sleepyGenre.generateRandomInstance()
            break;
        case 'meadow':
            map = meadowGenre.generateRandomInstance()
            break;
        case 'sea':
            map = seaGenre.generateRandomInstance()
            break;
        case 'hometown':
            map = homeTownGenre.generateRandomInstance()
            break;
        case 'bigtown':
            map = bigTownGenre.generateRandomInstance()
            break;
        case 'rock':
            map = rockGenre.generateRandomInstance()
            break;
    }

    return map
}


/*
Ideas:

Genres:
Rock

Bands:
Tenacious D
Billie Eilish


*/