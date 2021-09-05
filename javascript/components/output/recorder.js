import {comp} from './master.js'

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

document.querySelector('.pause-button').addEventListener('click', pause);
document.querySelector('.play-button').addEventListener('click', play);

export async function playSong(song) {
    console.log("Building Song")

    recorder.start()
    await song.play()
    console.log("Done building")
    Tone.Transport.start()
    Tone.Transport.bpm.value = song.genre.bpm

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
