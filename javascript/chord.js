class Chord {
    constructor({root = 1, bass = 1, notes = [1, 3, 5], func=0, flavor=0}){
        this.root = Number.parseInt(`${root}`)
        this.bass = Number.parseInt(`${bass}`)
        this.notes = [...notes]
        this.func = Number.parseInt(`${func}`)
        this.flavor = Number.parseInt(`${flavor}`)
    }

    addNote(number){
        this.notes.push(number)
    }

    addOneNote(numberArray) {
        let addNote = null
        numberArray.map( (n) => {
            if(!this.notes.includes(n) && !addNote) {
                addNote = n
            }
        })
        
        if(addNote) { this.notes.push(addNote) }
    }

    changeNote(oldNote, newNote) {
        this.notes = this.notes.filter((n) => n !== oldNote)
        this.addNote(newNote)
    }

    changeBass(number) {
        this.bass = number
    }

    alterFuncFlavor(func, flavor) {
        func = this.func + func
        if(func > 2) { func = 2 }
        if(func < 0) { func = 0 }
        this.func = func

        flavor = this.flavor + flavor
        if(flavor > 2) { flavor = 2 }
        if(flavor < 0) { flavor = 0 }
        this.flavor = flavor

        let baseChord = findChordByFuncFlavor(func, flavor).chord
        this.root = Number.parseInt(`${baseChord.root}`)
        this.bass = Number.parseInt(`${baseChord.bass}`)
        this.notes = [...baseChord.notes]
    }

    //Given a note position, it returns the absolute position on the scale.
    //notePosition- int > 1
    //returns- int < 8
    absoluteNoteValue(notePosition) {
        if(notePosition === 0) { console.log("Note Position must be > 1")}
        let ret = (notePosition + this.root - 2) % 7
        if(ret < 0 || ret > 7) { console.log("Bug in Chord.absoluteNoteValue()", ret)}
        return ret
    }

    //Given a position in the chord, it returns the name of the note.
    noteName(notePosition, scaleNotes) {
        if(!scaleNotes) { console.log("Chord.noteName() Error- Provide scaleNotes") }
        if(notePosition === 0) { console.log("Note Position must be > 1")}
        return scaleNotes[ this.absoluteNoteValue(notePosition) ]
    }

    chordNoteName(chordPosition, scaleNotes){
        if(!scaleNotes) { console.log("Chord.chordNoteName() Error- Provide scaleNotes") }
        let notesSize = this.notes.length
        let noteArrayPosition = ( (chordPosition-1) % (notesSize) ) 
        return this.noteName( this.notes[noteArrayPosition], scaleNotes )
    }

    //Given an absolute position in the scale, it returns what it would be in this chord.
    absoluteToNoteValue(absNumber) {
        return absNumber + 1 - (this.root - 1) 
    }

    //Given a position in the scale, and the base octave, it returns the appropriate note/octave string.
    printScaleNote(notePosition, scaleNotes, baseOctave = 3) {
        if(!scaleNotes) { console.log("Error") }
        let noteName = this.noteName(notePosition, scaleNotes)
        let octave = baseOctave + Math.floor( notePosition / 8 )
        return noteName + octave
    }

    printChordNote(notePosition, scaleNotes, baseOctave = 3) {
        if(!scaleNotes) { console.log("Error") }
        let notesSize = this.notes.length
        let note = this.chordNoteName(notePosition, scaleNotes) 
        let octave = baseOctave + Math.floor( notePosition / notesSize )
        return note + octave
    }

    printScaleNotes(numberArray, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        return numberArray.map((n) => this.printScaleNote(n, scaleNotes))
    }

    printScaleNoteOctave(number, octave, scaleNotes) {
        if(!scaleNotes || !number || !octave) { console.log("Error") }
        let note = this.noteName(number, scaleNotes)
        return note+octave
    }

    printScaleNotesOctave(numberArray, octave, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        return numberArray.map((n) => this.printScaleNoteOctave(n, octave, scaleNotes))
    }

    printBassNote(number, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        let note = null
        let octave = 2 + Math.floor( number/4 )
        number = (number % 4) + 1

        if(number === 1) {
            note = this.bass
        } else {
            note = this.notes.sort( (a, b) => a-b )[number - 1]
        }
        return this.noteName(note, scaleNotes) + octave
    }

    printChord(octave, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        let harmonyNotes = this.printScaleNotesOctave( [...this.notes], octave, scaleNotes)

        return harmonyNotes
    }


    calculateBass(prevChord, nextChord){
        let prevBassNote = prevChord.absoluteNoteValue(prevChord.bass)
        let nextBassNote = nextChord.absoluteNoteValue(nextChord.bass)
        
        //calculate the midpoint and return
        let newBass = this.absoluteToNoteValue( Math.ceil( (prevBassNote + nextBassNote) / 2) ) 

        this.changeBass(newBass)
    }

    clone() {
        let c = new Chord({root: Number.parseInt(`${this.root}`),
            bass: Number.parseInt(`${this.bass}`), 
            notes: [...this.notes], 
            func: Number.parseInt(`${this.func}`), 
            flavor:  Number.parseInt(`${this.flavor}`)
        })
        c.alterFuncFlavor(0, 0)
        return c
    }

    printName(scaleNotes, scaleChords){
        if(!scaleNotes || !scaleChords) { console.log("Error") }

        let baseName = `${scaleNotes[this.root-1]}${scaleChords[this.root-1].name}`

        if( !this.notes.includes(3) ) {
            if( this.notes.includes(2) ) {
                baseName += 'sus2'
            } else if( this.notes.includes(4) ) {
                baseName += 'sus4'
            }
        } else if (this.notes.includes(7) ) {
            if (this.notes.includes(9) ) {
                if (this.notes.includes(11) ) {
                    if (this.notes.includes(13) ) {
                        baseName += '13'
                    } else {
                        baseName += '11'
                    }
                } else {
                    baseName += '9'
                }
            } else {
                baseName += '7'
            }
        }
        else if (this.notes.includes(6) ) {
            baseName += '6'
        }
        else if (this.notes.includes(9) ) {
            baseName += 'add9'
        }

        if (this.bass != 1) {
            baseName += `/${this.noteName(this.bass, scaleNotes)}`
        }

        return baseName

    }

}