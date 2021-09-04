let statusElement = document.getElementById('generateStatus')
let boardElement = document.getElementById('board')
let board = new Board()

let audio = document.getElementById('audio')
let actx = Tone.context;

//start recording
const dest = actx.createMediaStreamDestination();
const recorder = new MediaRecorder(dest.stream);
comp.connect(dest)

const chunks = [];

recorder.ondataavailable = evt => chunks.push(evt.data);

recorder.onstop = evt => {
    let blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
    audio.src = URL.createObjectURL(blob);
};

song = null

function initSong(e) {
    document.getElementById('controls').style.display = 'block'
    document.getElementById('genres').style.display = 'none'

    console.log(e.getAttribute('data-genre'))

    genre = getRandomGenreInstanceFromKind(e.getAttribute('data-genre'))

    key = Math.round((Math.random() * 7) + 1)

    instrumentWeight = genre.instrumentList

    musicSettings = new MoodChip(genre.moodChip)
    delete song

    console.log(key, genre, musicSettings)

    song = new Song(key, genre.mode, musicSettings)
    board.updateAndPrint(boardElement, genre.instrumentList)

    //document.getElementById('progression').innerHTML = song.printSong()

    playSong(genre.bpm)

    return song
}

function changeTempo() {
    let bpmValue = Number.parseInt(document.getElementById('bpmControl').value)
    Tone.Transport.bpm.value = bpmValue
}

async function playSong(bpm) {
    console.log("Building Song")

    recorder.start()
    await song.play()
    console.log("Done building")
    Tone.Transport.start()
    Tone.Transport.bpm.value = bpm

    document.getElementById('test').innerHTML = song.print()
    
    await Tone.start()
}

function pause() {
    recorder.stop()
    Tone.Transport.pause()
}

function play() {
    recorder.start()
    Tone.Transport.start()
}

function restart() {
    recorder.stop()
    Tone.Transport.stop()
    Tone.Transport.seconds = 0

}

function downloadFile() {
    let songString = JSON.stringify(song.printSong())
    console.log(songString)
    location.href = "data:application/octet-stream," + encodeURIComponent(songString);
}
