class ArrangementPart {
    constructor(name, beatPattern) {
        this.name = name
        this.beatPattern = beatPattern
        instrumentList.map((i) => i.name === this.name ? this.instrument = i : null)

    }

    melody(chord, beatIndex, weightRatio, sn, r) {
        if (!sn) { console.log("Scale notes not provided") }

        let x = Math.round(beatIndex * r * weightRatio * 100)

        let noteArray = this.instrument.noteArray(chord, sn, x)

        let ret = null
        let iWeight = .5

        if (noteArray.length > 1) {
            noteArray.map((n) => {
                if (weightRatio > iWeight && ret === null) { ret = n }
                iWeight = iWeight / 2
            })
            if(ret === null) { ret = noteArray[noteArray.length - 1] }

        } else {
            ret = noteArray[0]
        }

        return ret
    }

    clone() {
        return new ArrangementPart(this.name, this.beatPattern)
    }

    //function playMelody() {
    playPart(e, songPartIndex, chord, i, now, time, spacing, mainChord, song) {

        if (!song.scaleNotes) { console.log("Scale notes not provided") }
        //Apply the instrument weight
        //e = (instrumentWeight[this.name] / 100 * e) + songPartIndex
        e = bound(e, 1, 10)

        let beatPattern = this.beatPattern
        let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0]
        highestWeight = highestWeight ? highestWeight.weight : 1

        let useChord = null

        if ( this.instrument.chordStyle === 'chord' ) { useChord = chord }
        else if (  this.instrument.chordStyle === 'key' ) { useChord = mainChord }
        else {
            useChord = [true, false]
            [normalizeAndGetRandomFromMap([beatPattern.resonance, beatPattern.tension])] ?
                chord :
                mainChord
        }

        beatPattern.mainBeat.sort((a, b) => a.position - b.position).map((beatItem, beatIndex) => {
            if (!song.scaleNotes) { console.log("Scale notes not provided") }
            let p = Number.parseInt(beatItem.position)
            let w = Number.parseInt(beatItem.weight)
            let sn = song.scaleNotes
            if (!sn) { console.log("Scale notes not provided") }

            let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.musicSettings.repetition * 2))]

            let r = Math.round(((i + Math.round(Math.sqrt(e))) % repeat)) + 1

            let timing = (now + time + (p / spacing))

            let weightRatio = w / highestWeight

            let melody = this.melody(useChord, beatIndex, weightRatio, sn, r)
            let length = this.length(beatItem, beatIndex, beatPattern.mainBeat.sort((a, b) => a.position - b.position))
            if (melody) {
                this.instrument.instrument.playNote(melody, timing, .33 + weightRatio / 1.5, length)
            }
        })
    }

    length(beatItem, beatIndex, beat) {
        let lastBeatItem = beat[beat.length - 1]
        let nextBeatItem = null
        let distanceToBeat = 0
        let pThis = Number.parseInt(beatItem.position)
        let pNext = null
        let pLast = Number.parseInt(lastBeatItem.position)

        if (pThis === pLast) {
            distanceToBeat = 32 - pThis
        } else {
            nextBeatItem = beat[beatIndex + 1]
            pNext = Number.parseInt(nextBeatItem.position)
            distanceToBeat = pNext - pThis
        }

        let ret = null

        let noteStyle = this.instrument.noteStyle

        if(distanceToBeat <= 0) { console.log(" NEGATE BEAT DISTANCE ERROR ")}

        if(noteStyle === 'full' || noteStyle === 'half') { 
            if (distanceToBeat >= 32) {
                ret = 1
            }
            else if (distanceToBeat >= 16) {
                ret = 2
            }
            else if (distanceToBeat >= 8) {
                ret = 4
            }
            else if (distanceToBeat >= 4) {
                ret = 8
            }
            else if (distanceToBeat >= 2) {
                ret = 16
            }
            else {
                ret = 32
            }

            if(noteStyle === 'half' && ret !== 32) { ret = 2 * ret }
            ret += "n"
        }
        else {
            ret = noteStyle
        }


        return ret
        
    }

    print() {
        let ret = ""
        ret += "<h4>" + this.name + "</h4>"
        ret += this.beatPattern.print()
        return ret
    }
}
