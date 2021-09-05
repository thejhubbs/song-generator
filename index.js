import genreList from './javascript/files/genres/genreList.js'

import Song from './javascript/components/song/song.js'
import MoodChip from './javascript/components/moodChip.js'
import Board from './javascript/components/output/board.js'

import {playSong} from './javascript/components/output/recorder.js'


let {genre, getRandomGenreInstanceFromKind, printGenreButtons} = genreList

let boardElement = document.getElementById('board')
let board = new Board()
let song = null

function initSong(e) {
    document.getElementById('controls').style.display = 'block'
    document.getElementById('genres').style.display = 'none'

    genre = getRandomGenreInstanceFromKind(e.target.getAttribute('data-genre'))

    let key = Math.round((Math.random() * 7) + 1)

    let instrumentWeight = genre.instrumentList

    let musicSettings = new MoodChip(genre.moodChip)

    console.log(key, genre, musicSettings)

    song = new Song(key, genre, musicSettings)
    board.updateAndPrint(boardElement, genre.instrumentList)

    playSong(song)

    return song
}

printGenreButtons()
document.querySelectorAll('.genre-button').forEach( (gb) => gb.addEventListener('click', initSong) );


// function changeTempo() {
//     let bpmValue = Number.parseInt(document.getElementById('bpmControl').value)
//     Tone.Transport.bpm.value = bpmValue
// }

// function downloadFile() {
//     let songString = JSON.stringify(song.printSong())
//     console.log(songString)
//     location.href = "data:application/octet-stream," + encodeURIComponent(songString);
// }
