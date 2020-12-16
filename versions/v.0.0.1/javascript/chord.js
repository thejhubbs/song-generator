class Chord {
    constructor({root = 1, bass = 1, notes = [1, 3, 5], func=0, flavor=0}){
        this.root = root 
        this.bass = bass
        this.notes = notes
        this.func = func
        this.flavor = flavor
    }

    addNote(number){
        this.notes.push(number)
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
        this.root = baseChord.root
        this.bass = baseChord.bass
        this.notes = baseChord.notes
    }

    noteValue(number) {
        return (number + this.root - 2) % 7
    }

    noteName(number, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        return scaleNotes[ this.noteValue(number) ]
    }

    absoluteToNoteValue(absNumber) {
        return absNumber + 1 - (this.root - 1) 
    }

    printScaleNote(number, scaleNotes) {
        let noteName = this.noteName(number, scaleNotes)
        let octave = 3 + Math.floor(number/8)
        return noteName + octave
    }

    printNote(number, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        let notesSize = this.notes.length
        let octave = 4 + Math.floor( (number-1)/notesSize )
        let note = ( (number-1) % (notesSize) ) 

        return this.noteName( this.notes[note], scaleNotes ) + octave
    }

    printNotes(numberArray, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        return numberArray.map((n) => this.printNote(n, scaleNotes))
    }

    printNoteOctave(number, octave, scaleNotes) {
        if(!scaleNotes || !number || !octave) { console.log("Error") }
        let note = this.printNote(number, scaleNotes)
        note = note.substr(0, note.length - 1)
        return note+octave
    }

    printNotesOctave(numberArray, octave, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        return numberArray.map((n) => this.printNoteOctave(n, octave, scaleNotes))
    }

    printBassNote(number, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        let note = null
        let octave = 1 + Math.floor( number/4 )
        number = (number % 4) + 1

        if(number === 1) {
            note = this.bass
        } else {
            note = this.notes.sort( (a, b) => a-b )[number - 1]
        }
        return this.noteName(this.bass, scaleNotes) + octave
    }

    printChord(excitement, scaleNotes) {
        if(!scaleNotes) { console.log("Error") }
        let octave = Math.round(excitement/4) + 3
        if( octave >= 5 ){ octave = 4 }
        let harmonyNotes = this.printNotesOctave([1, 2, 3], octave, scaleNotes)

        return harmonyNotes
    }


    calculateBass(prevChord, nextChord){
        let prevBassNote = prevChord.noteValue(prevChord.bass)
        let nextBassNote = nextChord.noteValue(nextChord.bass)
        
        //calculate the midpoint and return
        let newBass = this.absoluteToNoteValue( Math.ceil( (prevBassNote + nextBassNote) / 2) ) 

        this.changeBass(newBass)
    }

    duplicateChord() {
        return new Chord({root: this.root, 
            bass: this.bass, 
            notes: this.notes, 
            name: this.name, 
            func: this.func, 
            flavor: this.flavor
        })
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
            baseName += '7'
        }

        if (this.bass != 1) {
            baseName += `/${this.noteName(this.bass, scaleNotes)}`
        }

        return baseName

    }

}