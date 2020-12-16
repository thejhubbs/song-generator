class ArrangementPart {
    constructor(name, beatPattern) {
        this.name = name
        this.beatPattern = beatPattern
        this.instrument = null
        this.secondInstrument = null



        switch (name) {
            case "kick":
                this.instrument = kickDrum
                this.secondInstrument = snareDrum
                break;
            case "hat":
                this.instrument = hatDrum
                break;
            case "bass":
                this.instrument = bassSynth
                break;
            case "harmony":
                this.instrument = harmonySynth
                break;
            case "melody":
                this.instrument = melodySynth
                break;
            case "fx":
                this.instrument = fxSynth
                break;
            case "vox":
                this.instrument = voxSynth
                break;
        }
    }

    melody(chord, beatIndex, weightRatio, sn) {
        let chordChart = null

        switch (this.name) {
            case "kick":
                chordChart = [chord.printChordNote(1, sn, 2)]
                break;
            case "hat":
                chordChart = [chord.printChordNote(1, sn, 6)]
                break;
            case "bass":
                chordChart = [chord.printChordNote(Math.round((beatIndex * weightRatio) % 3) + 1, sn, 2)]
                break;
            case "harmony":
                if (weightRatio > .5) {
                    chordChart = [chord.printChord(4, sn)]
                } else {
                    chordChart = [chord.printChordNote(1, sn, 3)]
                }
                break;
            case "melody":
                chordChart = [chord.printScaleNote(Math.round((beatIndex * weightRatio) % 7) + 1, sn, 4)]
                break;
            case "fx":
                chordChart = [chord.printChordNote(Math.round((beatIndex * weightRatio) % 3) + 1, sn, 5)]
                break;
            case "vox":
                chordChart = [chord.printScaleNote(Math.round((beatIndex * weightRatio) % 7) + 1, sn, 4)]
                break;
        }
        return chordChart[beatIndex % (chordChart.length)]
    }

    clone() {
        return new ArrangementPart(this.name, this.beatPattern)
    }

    //function playMelody() {
    playPart(e, songPartIndex, chord, i, now, time, spacing, mainChord, song) {
        //Apply the instrument weight
        e = (instrumentWeight[this.name] / 100 * e) + songPartIndex
        e = bound(e, 1, 10)

        let beatPattern = this.beatPattern
        let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0]
        highestWeight = highestWeight ? highestWeight.weight : 1

        let useChord = null

        let mainChordChoice = ['hat', 'kick', 'fx', 'melody']
        let chordyChoice = ['harmony', 'bass', 'vox']

        if (chordyChoice.includes(this.name)) { useChord = chord }
        else if (mainChordChoice.includes(this.name)) { useChord = mainChord }
        else { useChord = [true, false]
            [normalizeAndGetRandomFromMap([beatPattern.resonance, beatPattern.tension])] ?
                chord :
                mainChord }

        beatPattern.mainBeat.map((beatItem, beatIndex) => {
            let p = Number.parseInt(beatItem.position)
            let w = Number.parseInt(beatItem.weight)
            let sn = song.scaleNotes

            let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.repetition * 2))]

            let r = Math.round(((i + Math.round(Math.sqrt(e))) % repeat) * (e / 3))

            let timing = (now + time + (p / spacing))

            let weightRatio = w / highestWeight

            let melody = this.melody(chord, beatIndex, weightRatio, sn)

            this.instrument.playNote(melody, timing, .5 + weightRatio / 2, '8n')

        })
    }

    print() {
        let ret = ""
        ret += "<h4>" + this.name + "</h4>"
        ret += this.beatPattern.print()
        return ret
    }
}