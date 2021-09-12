import rapBeatGenre from './rap.js'
import danceBalladGenre from './danceballad.js'
import danceJamGenre from './dancejam.js'
import spookyGenre from './spooky.js'
import dangerGenre from './danger.js'
import sleepyGenre from './sleepy.js'
import meadowGenre from './meadow.js'
import seaGenre from './sea.js'
import homeTownGenre from './hometown.js'
import bigTownGenre from './bigtown.js'
import rockGenre from './rock.js'
import upbeatVibeGenre from './upbeatvibe.js'

let genreList = [
    rapBeatGenre,
    danceBalladGenre,
    danceJamGenre,
    spookyGenre,
    dangerGenre,
    sleepyGenre,
    meadowGenre,
    seaGenre,
    homeTownGenre,
    bigTownGenre,
    rockGenre,
    upbeatVibeGenre
]


export let genre = getRandomGenreInstanceFromKind('rock')

export function getRandomGenreInstanceFromKind(kind) {
    let map = null
    genreList.map( (g) => g.name === kind ? map = g : '' )
    if(map) { return map.generateRandomInstance() }
    return map
}

export function printGenreButtons() {
    let genreElement = document.getElementById('genres')
    let sortedList = genreList.sort( (a, b) => a.category.localeCompare(b.category) )
    let lastCategory = "" 

    sortedList.map( (g) => {
        if(g.category !== lastCategory) {
            lastCategory = g.category
            genreElement.innerHTML += `<h3>${g.category}</h3>`
        }
        genreElement.innerHTML += `<button class="genre-button" data-genre="${g.name}">${g.name}</button>` 
    }) 
}

export default {
    genre,
    getRandomGenreInstanceFromKind,
    printGenreButtons
}


/*
Ideas:

Bands:
Tenacious D
Billie Eilish


*/