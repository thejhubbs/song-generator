/*

    Chord
    =====
    Stores the information for the chord to be played.
    Does not store actual notes, but references to the notes on a scale.

    this.root- 1-7; represents which CHORD/NOTE POSITION on the SCALE.
    this.bass- 1-7; represents which NOTE of the CHORD is played for the bass.
    this.notes- CHORD NOTE LIST- an array of numbers representing the NOTE of the CHORD
    this.func/this.flav

    TERMINOLOGY & EXAMPLES
    ======
    -Key: C
    -Scale: Maj

    -Chord: Am
    Am.root = 6
    Am.base = 1
    Am.notes = [1, 3, 5]

    There are 4 types of "positions" that can be referenced

    -Absolute_Position is the position on the main key scale, index=0.
    Am.root.absolute_position = 5 (root of Am is A, which is at pos 5 in [C, D, E, F, G, A, B])
    Am.notes[1].absolute_position = 0 (3rd of Am is C, which is at pos 0 in [C, D, E, F, G, A, B])

    -Scale_Position is the position in the scale starting at the root of the chord
    Am.scale_position(1) = A
    Am.scale_position(3) = C
    Am.scale_position(11) = D

    -Chord_Position is the number x in the chord, looping through the actually added notes.
    Am.notes = [1, 3, 5]
    Am.chord_position(1) = A
    Am.chord_position(3) = E 
    Am.chord_position(4) = A

    -Bass_Position is almost the exact same as Chord_Position, but (1) returns the value in base.
    Am/G
    Am/G.bass = 7
    Am/G.notes = [1, 3, 5]
    Am/G.bass_position(1) = G
    Am/G.bass_position(3) = E
    Am/G.bass_position(4) = A


    FUNCTIONS
    =====
    --Base
    function clone()- creates a copy and returns it
    
    method addNote(number: int/scale_position)- adds a note to the chord note list
    method removeNote(number: int/scale_position)- removes a note from the chord note list
    method addOneNote([note: int/scale_position])- adds the first note in the array that's not in the chord; to the chord
    method changeNote(oldNote: int/scale_position, newNote: int/scale_position)- changes the oldNote to the newNote
    method changeBass(number: int/scale_position)- changes the bass

    --Helpers
    function scalePositionToAbsolutePosition(number: int/scale_position) => int/absolute_position
    function absolutePositionToScalePosition(number: int/absolute_position) => int/scale_position

    function scalePositionToNoteName(number: int/scale_position) => string/[A-G] - Returns the name of the note at the scale_position
    function chordPositionToNoteName(number: int/chord_position) => string/[A-G] - Returns the name of the note at the chord_position
    
    --Printing
    function printName()- "builds" and returns the name of the chord

    function printNoteFromScalePosition(number: int/scale_position) => string/[A-G][octave: int 1-8] - gives a note/octave string for the scale_position
    function printNotesFromScalePositions( [number: int/scale_position] ) => [ string/[A-G][octave: int 1-8] ]  - gives a note/octave array for the scale_position array
    function printNoteFromChordPosition(number: int/chord_position) => string/[A-G][octave: int 1-8] - gives a note/octave string for the chord_position

    function printBassNote(number: int/bass_position) =>  string/[A-G][octave: int 1-8] - gives a note/octave pair for the bass_position
    function printChord() => [ string/[A-G][octave: int 1[ string/[A-G][octave: int 1-8] ]  -8] ]  - gives a note/octave array for the CHORD NOTE LIST

    --Special Altering
    method alterFuncFlavor(alterFunc, alterFlav)- alter the func/flav and reset chord info w that
    method calculateWalkingBass(lastChord, nextChord) - set's it's own bass to the middle of the previous & next chords.


*/




class Chord {
    constructor({ root = 1, bass = 1, notes = [1, 3, 5], func = 0, flavor = 0 }) {
        //Use Number.parseInt(`${}`) to copy value instead of reference
        this.root = Number.parseInt(`${root}`)
        this.bass = Number.parseInt(`${bass}`)
        this.notes = [...notes]
        this.func = Number.parseInt(`${func}`)
        this.flavor = Number.parseInt(`${flavor}`)
    }

    /* ============================

    BASIC ADD/EDIT

    ============================ */

    //Copies all values to a new chord object.
    clone() {
        let c = new Chord({
            root: Number.parseInt(`${this.root}`),
            bass: Number.parseInt(`${this.bass}`),
            notes: [...this.notes],
            func: Number.parseInt(`${this.func}`),
            flavor: Number.parseInt(`${this.flavor}`)
        })
        c.alterFuncFlavor(0, 0)
        return c
    }


    //takes in a relative number (sus4 => 4) to add to the chord
    addNote(number) {
        if (this.notes.indexOf(number) === -1) {
            this.notes.push(number)
            this.notes = this.notes.sort((a, b) => a - b)
        }
    }

    //Removes a note.
    removeNote(number) {
        this.notes = this.notes.filter((n) => n !== number)
    }


    //Takes in an array of relative numbers [7, 9, 11] to add the first missing one to the chord
    addOneNote(numberArray) {
        let addNote = null
        numberArray.map((n) => {
            if (!this.notes.includes(n) && !addNote) {
                addNote = n
            }
        })

        if (addNote) { this.notes.push(addNote) }
    }

    //Takes in two relative numbers and changes the first note, if found, and adds in the second.
    //ex. sus4 => (3, 4) [Change the 3rd to a 4th] 
    //ex. sus2 => (3, 2) [Change the 3rd to a 2nd]
    changeNote(oldNote, newNote) {
        this.removeNote(oldNote)
        this.addNote(newNote)
    }

    //Changes the bass to a relative number.
    // C/G => (5) 
    changeBass(number) {
        this.bass = number
    }



    /* ============================

    TRANSLATION HELPERS

    ============================ */

    //Given a relative note position, it returns the absolute position on the scale.
    //notePosition- int > 1; applies for 9ths, 11ths, etc.
    //returns- int < 8
    // If you have Am (root = 6 in CMaj) and want to get the 3rd (which is C, which is 0th on scale) 
    // => absoluteNoteValue(3) = 0
    scalePositionToAbsolutePosition(scalePosition) {
        if (scalePosition === 0) { console.log("Note Position must be > 1") }
        let ret = (scalePosition + this.root - 2) % 7
        if (ret < 0 || ret > 7) { console.log("Bug in Chord.absoluteNoteValue()", ret) }
        return ret
    }
    
    //Given an absolute position in the scale, it returns what it would be in this chord.
    //If you have a G chord in CMaj and want to add a C ( = 0 from scale ), translates to the right number.
    absolutePositionToScalePosition(absNumber) {
        return absNumber + 1 - (this.root - 1)
    }

    //Given a relative position (in the scale, from root), and the scale of notes, it returns the name of the note.
    // If you have Am (root = 6) in CMaj and want to get the 3rd (which is C) 
    // => noteName(3) = 'C'
    scalePositionToNoteName(scalePosition, scaleNotes) {
        if (!scaleNotes) { console.log("Chord.noteName() Error- Provide scaleNotes") }
        if (scalePosition === 0) { console.log("Note Position must be > 1") }
        return scaleNotes[this.scalePositionToAbsolutePosition(scalePosition)]
    }

    //Given a relative position in the chord notes, and the scale, returns the name of that note.
    // If you're arpeggiating and want the 5th note of a G7 ([1, 3, 5, 7]), which loops back around to G, returns 'G'
    // Similarly, the 5th note of C ([1, 3, 5]) would be E, after looping around.
    chordPositionToNoteName(chordPosition, scaleNotes) {
        if (!scaleNotes) { console.log("Chord.chordNoteName() Error- Provide scaleNotes") }
        let notesSize = this.notes.length
        let noteArrayPosition = ((chordPosition - 1) % (notesSize))
        return this.scalePositionToNoteName(this.notes[noteArrayPosition], scaleNotes)
    }




    /* ============================

    PRINTING

    ============================ */

    //Logic to see what the name of the chord is
    printName(scaleNotes, scaleChords) {
        if (!scaleNotes || !scaleChords) { console.log("Error in Chord.printName()- please provide scaleNotes & scaleChords.") }

        let baseName = `${scaleNotes[this.root - 1]}${scaleChords[this.root - 1].name}`

        if (!this.notes.includes(3)) {
            if (this.notes.includes(2)) {
                baseName += 'sus2'
            } else if (this.notes.includes(4)) {
                baseName += 'sus4'
            }
        } else if (this.notes.includes(7)) {
            if (this.notes.includes(9)) {
                if (this.notes.includes(11)) {
                    if (this.notes.includes(13)) {
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
        else if (this.notes.includes(6)) {
            baseName += '6'
        }
        else if (this.notes.includes(9)) {
            baseName += 'add9'
        }

        if (this.bass != 1) {
            baseName += `/${this.scalePositionToNoteName(this.bass, scaleNotes)}`
        }

        return baseName

    }

    //Given a relative position in the scale, the scale, and the lowest octave, it returns the appropriate note/octave string.
    // You have a chord and want to get the 13th note, with lowest octave possible of 3
    // Returns the 6th note on scale in the 4th octave
    printNoteFromScalePosition(notePosition, scaleNotes, baseOctave = 3) {
        if (!scaleNotes) { console.log("Error") }
        let noteName = this.scalePositionToNoteName(notePosition, scaleNotes)
        let octave = baseOctave + Math.floor(notePosition / 8)
        return noteName + octave
    }
    printNotesFromScalePositions(numberArray, scaleNotes, baseOctave) {
        if (!scaleNotes) { console.log("Error") }
        return numberArray.map((n) => this.printNoteFromScalePosition(n, scaleNotes, baseOctave))
    }

    //Given a number of the chord, prints the note. 
    //If you want to arpeggiate the 6th note of 
    printNoteFromChordPosition(notePosition, scaleNotes, baseOctave = 3) {
        if (!scaleNotes) { console.log("Error") }
        let notesSize = this.notes.length
        let note = this.chordPositionToNoteName(notePosition, scaleNotes)
        let octave = baseOctave + Math.floor(notePosition / notesSize)
        return note + octave
    }

    //Takes in a bass_position, and, starting at octave 2, returns a note/octave string
    printBassNote(number, scaleNotes) {
        if (!scaleNotes) { console.log("Error") }
        let note = null
        let octave = 2 + Math.floor(number / 4)
        number = (number % 4) + 1

        if (number === 1) {
            note = this.bass
        } else {
            note = this.notes[number - 1]
        }
        return this.scalePositionToNoteName(note, scaleNotes) + octave
    }

    //Loops over the notes to return an array of x note/octave pairs
    printChord(octave, scaleNotes, amount = 6) {
        if (!scaleNotes) { console.log("Error") }

        let chordNotes = [...this.notes]
        let i = 1;

        //Make sure there's enough notes to get the right amount
        while( chordNotes.length < amount) {
            chordNotes = [...chordNotes, ...this.notes.map((n) => n + (7 * i)) ]
            i++;
        }

        chordNotes = chordNotes.splice(0, amount)
        let harmonyNotes = this.printNotesFromScalePositions(chordNotes, scaleNotes, octave)

        return harmonyNotes
    }

    
    /* ============================

    SPECIAL ALTERING

    ============================ */

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


    //Takes in the previous chord & the next chord and changes it's own bass to that
    calculateWalkingBass(prevChord, nextChord) {
        let prevBassNote = prevChord.absoluteNoteValue(prevChord.bass)
        let nextBassNote = nextChord.absoluteNoteValue(nextChord.bass)

        //calculate the midpoint and return
        let newBass = this.absoluteToNoteValue(Math.ceil((prevBassNote + nextBassNote) / 2))

        this.changeBass(newBass)
    }

}