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

import progressionGeneration from '../../generations/progression.js'
import {findChordByFuncFlavor} from '../../settings/music.js'
import random from '../../settings/random.js'


export default class Progression {
    constructor(moodChip, chords=null) {
        this.chords = chords
        this.moodChip = moodChip.clone()

        if(chords) { 
            this.copyProgression() 
        }
        else { 
            this.createProgression() 
        }
    }

    clone() {
        return new Progression(this.moodChip, this.chords)
    }

    createProgression() {
        this.chords = []
        this.chords[0] = this.generateChord(1)
        this.chords[1] = this.generateChord(2)
        this.chords[2] = this.generateChord(3)
        this.chords[3] = this.generateChord(4) 
    }

    copyProgression() {
        this.chords = this.chords.map( (c) => c.clone() )
    }

    generateChord(position) {
        //Create an array of options- each option is chord that would be chosen IF that chord would choose the next one
        let choice = null

        let options = [
            findChordByFuncFlavor(progressionGeneration.generateResonance(this), progressionGeneration.generateResonance(this)),
            findChordByFuncFlavor(progressionGeneration.generateTensionFunction(this), progressionGeneration.generateTensionFlavor(this)),
            findChordByFuncFlavor(progressionGeneration.generateRepeat(this, 'func', position), progressionGeneration.generateRepeat(this, 'flavor', position))
        ]

        //Then, get a doubly-weighted array of 3 numbers for the weight of the choice. Weigh against position & moodChip.
        let positionWeights = progressionGeneration.generatePositionWeights(position, this)

        //Make the actual choice & clone it
        choice = options[random.getRandomFromMap(positionWeights)]
        choice = choice.chord.clone()

        return choice
    }



    getChordNotes(scaleNotes, scaleChords) {
        return [ this.chords[0].printNotes(scaleNotes, scaleChords),
        this.chords[1].printNotes(scaleNotes, scaleChords),
        this.chords[2].printNotes(scaleNotes, scaleChords),
        this.chords[3].printNotes(scaleNotes, scaleChords) ]
    }

    printChordNames(scaleNotes, scaleChords) {
        return [this.chords[0].printName(scaleNotes, scaleChords), 
        this.chords[1].printName(scaleNotes, scaleChords),
        this.chords[2].printName(scaleNotes, scaleChords),
        this.chords[3].printName(scaleNotes, scaleChords)].join(' ')
    }

    print(scaleNotes, scaleChords) {
        let ret = "<div>"
        ret += "<b>Progression</b><br />"
        ret += this.printChordNames(scaleNotes, scaleChords)
        ret += "<br />"
        this.chords.map( (c) => {
            ret += ` (${c.root})` 
        })
        ret += "</div>"
        return ret
    }

    //Takes in a moodChip & changes up the chords
    regenerate(moodChip = this.moodChip) {
        this.moodChip = moodChip.clone()

        //first chord
        progressionGeneration.regenerateFirstChord(this)
        progressionGeneration.regenerateSecondChord(this)
        progressionGeneration.regenerateThirdChord(this)
        progressionGeneration.regenerateFourthChord(this)

        progressionGeneration.regenerateAllChords(this)
    }

}
