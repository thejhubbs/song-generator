/*

    ArrangementPart
    =====
    Has a name, instrument, and beatPattern. Ultimately tells when & how to play.

    this.name
    this.beatPattern 
    this.instrument

*/


class ArrangementPart {
    constructor(name, beatPattern) {
        this.name = name
        this.beatPattern = beatPattern.clone()
        instrumentList.map((i) => i.name === this.name ? this.instrument = i : null)
    }



    melody(chord, beatIndex, weightRatio, scalenotes, repeatSectionPart) {
        if (!scalenotes) { console.log("song.arrangementPart.melody- Scale notes not provided") }

        if( chord.constructor.name !== "Chord") { 
            console.log("ERROR in song.arrangementPart.melody- variable chord should be of type chord", chord.constructor.name, chord)
        }
        if( typeof weightRatio !== 'number' || weightRatio <= 0) { 
            console.log("ERROR in song.arrangementPart.melody- variable weightRatio should be a number >= 1", typeof weightRatio, weightRatio)
        }
        if( typeof repeatSectionPart !== 'number' || repeatSectionPart < 1 || repeatSectionPart > 8) { 
            console.log("ERROR in song.arrangementPart.melody- variable repeatSectionPart should be 1<=x<=8", typeof repeatSectionPart, repeatSectionPart)
        }
        if( typeof beatIndex !== 'number' || beatIndex < 0) { 
            console.log("ERROR in song.arrangementPart.melody- variable beatIndex should be a number >= 0", typeof weightRatio, weightRatio)
        }

        let noteChoicePosition = getNoteChoicePosition(beatIndex, repeatSectionPart, weightRatio) 

        //Gets an array of potential notes to play, of variable length.
        let noteArray = this.instrument.noteArray(chord, scalenotes, noteChoicePosition)

        let ret = null

        //A counter variable to compare weights to.
        let weightCounter = .5

        //If there's options to choose from, choose one
        if (noteArray.length > 1) {
            //Map through the array of notes, the first is most likely.
            noteArray.map((note) => {
                //If the incoming weightRatio is bigger than the weightCounter, and the return is not yet set, set it.
                if (weightRatio > weightCounter && ret === null) { ret = note }
                //Reduce the weightCounter
                weightCounter = weightCounter / 2
            })
            //If you get through them all and didn't find one, choose the last one.
            if(ret === null) { ret = noteArray[noteArray.length - 1] }

        } 
        //Otherwise return the only one
        else {
            ret = noteArray[0]
        }

        let isANote = isNote(ret)
        let isANoteArray = isNoteArray(ret)

        if( !isANote && !isANoteArray ){ 
            console.log("ERROR in song.arrangementPart.melody- melody.note should be a note", ret, isANote, isANoteArray)
            console.log({chord, beatIndex, weightRatio, scalenotes, repeatSectionPart})
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

        let highestWeight = beatPattern.highestWeight()

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

            let scalenotes = song.scaleNotes
            if (!scalenotes) { console.log("Scale notes not provided") }

            let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.moodChip.repetition * 2))]
            let repeatSectionPart = Math.round(((i + Math.round(Math.sqrt(e))) % repeat)) + 1

            let timing = (now + time + (p / spacing))

            let weightRatio = 0
            if( w && highestWeight) { weightRatio = w / highestWeight }
            //pretty sure this divides 0 by 0 sometimes

            let melody = this.melody(useChord, beatIndex, weightRatio, scalenotes, repeatSectionPart)
            let length = this.length(beatItem, beatIndex, beatPattern.mainBeat.sort((a, b) => a.position - b.position))
            
            if(!weightRatio) {
                console.log("ERROR in song.arrangementPart.playPart- weightRatio should be valid", weightRatio)
            }

            if (melody) {
                this.instrument.instrument.playNote(melody, timing, weightRatio, length)
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

        if( !isNoteTime(ret) ) {
            console.log("ERROR in song.arrangementPart- melody.note should be a note", ret)
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
