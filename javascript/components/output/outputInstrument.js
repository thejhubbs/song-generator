export default class OutputInstrument {
    constructor(synthType, filter, volume, options = null, synth = null) {
        if (synth) {
            this.synth = synth
        } else {
            let s = new Tone.PolySynth(synthType)
            s.connect(filter)
            s.volume.value = volume
            if (options) { s.set(options) }
            this.synth = s
        }
    }

    playNote(note, timing, volume = 1, duration = '16n') {
        let synth = this.synth
        if (!note || !timing || !volume) { console.log("ERROR IN PLAYNOTE", "\nNote: ", note, "\nTiming: ", timing, "\nVolume: ", volume) }
        else {
            try {
                Tone.Transport.schedule(function (time) {
                    try {
                        synth.triggerAttackRelease(note, duration, time, volume)
                    } catch {
                        console.log("Error in OutputInstrument", note, duration, time, volume)
                    }
                }, `${timing}b`);
            } catch {
                console.log("Error in OutputInstrument")
            }
        }
    }
}