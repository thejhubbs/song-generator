class ArrangementPart {
    constructor(name, beatPattern) {
        this.name = name
        this.beatPattern = beatPattern
        this.instrument = null
        this.layer = null




        switch (name) {
            case "kick":
                this.instrument = kickDrum
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
                this.layer = melodyBSynth
                break;
            case "fx":
                this.instrument = fxSynth
                this.layer = fxBSynth
                break;
            case "vox":
                this.instrument = voxSynth
                this.layer = vox2Synth
                break;
        }
    }

    melody(chord, beatIndex, weightRatio, sn, r) {
        let chordChart = null

        if(!sn) { console.log("Scale notes not provided")}
        switch (this.name) {
            case "kick":
                chordChart = [chord.printChordNote(1, sn, 1)]
                break;
            case "hat":
                chordChart = [chord.printChordNote(1, sn, 6)]
                break;
            case "bass":
                if (weightRatio > .5) {
                    chordChart = [ chord.printChordNote(Math.round(1), sn, 1) ]
                } else if(weightRatio > .2) {
                    chordChart = [chord.printScaleNote(Math.round( (beatIndex * r * weightRatio* 100) % 7) + 1, sn, 1)]
                } else {
                    chordChart = [chord.printChordNote(Math.round( (beatIndex * r * weightRatio* 100) % 4) + 1, sn, 1)]
                }
                break;
            case "harmony":
                if (weightRatio > .5) {
                    chordChart = [chord.printChord(4, sn)]
                } else if(weightRatio > .2) {
                    chordChart = []
                } else {
                    chordChart = []
                }
                break;
            case "melody":
                
                if (weightRatio > .5) {
                    chordChart = [chord.printChordNote(Math.round((beatIndex * r * 100 *weightRatio) % 6) + 1, sn, 4)]
                } else if(weightRatio > .2) {
                    chordChart = [chord.printScaleNote(Math.round((beatIndex * r * 100*weightRatio) % 7) + 1, sn, 4)]
                } else {
                    chordChart = [chord.printChordNote(Math.round((beatIndex * r * 100 *weightRatio) % 3) + 1, sn, 4)]
                }

                
                break;
            case "fx":
                chordChart = [chord.printChordNote(Math.round((beatIndex * weightRatio) % 3) + 1, sn, 5)]
                break;
            case "vox":
                chordChart = [chord.printScaleNote(Math.round((beatIndex * r * weightRatio) % 7) + 1, sn, 4)]
                break;
        }
        return chordChart[beatIndex % (chordChart.length)]
    }

    clone() {
        return new ArrangementPart(this.name, this.beatPattern)
    }

    //function playMelody() {
    playPart(e, songPartIndex, chord, i, now, time, spacing, mainChord, song) {
        if(!song.scaleNotes) { console.log("Scale notes not provided")}
        //Apply the instrument weight
        //e = (instrumentWeight[this.name] / 100 * e) + songPartIndex
        e = bound(e, 1, 10)

        let beatPattern = this.beatPattern
        let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0]
        highestWeight = highestWeight ? highestWeight.weight : 1

        let useChord = null

        let mainChordChoice = ['hat', 'kick']
        let chordyChoice = ['harmony', 'bass', 'fx']

        if (chordyChoice.includes(this.name)) { useChord = chord }
        else if (mainChordChoice.includes(this.name)) { useChord = mainChord }
        else { useChord = [true, false]
            [normalizeAndGetRandomFromMap([beatPattern.resonance, beatPattern.tension])] ?
                chord :
                mainChord }

        beatPattern.mainBeat.map((beatItem, beatIndex) => {
            if(!song.scaleNotes) { console.log("Scale notes not provided")}
            let p = Number.parseInt(beatItem.position)
            let w = Number.parseInt(beatItem.weight)
            let sn = song.scaleNotes
            if(!sn) { console.log("Scale notes not provided")}

            let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.musicSettings.repetition * 2))]

            let r = Math.round(((i + Math.round(Math.sqrt(e))) % repeat)) + 1

            let timing = (now + time + (p / spacing))

            let weightRatio = w / highestWeight

            let melody = this.melody(useChord, beatIndex, weightRatio, sn, r)
            let length = this.length(beatItem, beatIndex, beatPattern.mainBeat)
            if(melody) {
                this.instrument.playNote(melody, timing, .33 + weightRatio / 1.5, length)
                if(this.layer) { this.layer.playNote(melody, timing, .33 + weightRatio / 1.5, length) }
            }
        })
    }

    length(beatItem, beatIndex, beat) {
        let lastBeatItem = beat[beat.length-1]
        let nextBeatItem = null
        let distanceToBeat = 0
        let pThis = Number.parseInt(beatItem.position)
        let pNext = null
        let pLast = Number.parseInt(lastBeatItem.position)

        if(pThis === pLast) {
            distanceToBeat = 32 - pThis
        } else {
            nextBeatItem = beat[beatIndex+1]
            pNext = Number.parseInt(nextBeatItem.position)
            distanceToBeat = pNext - pThis
        }

        if(['kick', 'fx', 'snare'].includes(this.name)) { return '32n' }

        if(distanceToBeat >= 32) {
            return '1n'
        } 
        else if(distanceToBeat >= 16) {
            return '4n'
        }
        else if(distanceToBeat >= 8) {
            return '4n'
        }
        else if(distanceToBeat >= 4) {
            return '32n'
        }
        else {
            return '32n'
        }
    }

    print() {
        let ret = ""
        ret += "<h4>" + this.name + "</h4>"
        ret += this.beatPattern.print()
        return ret
    }
}
