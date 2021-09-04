/*

    Song
    =====
    Stores the information for the song that is being created.
    this.key = key
    this.mode = mode

    this.moodChip = moodChip
    this.mainProgression = new Progression(moodChip)

    this.songParts = []
    
    this.scaleNotes = []
    this.scaleChords = []

    

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

class Song {
    constructor(key, mode, moodChip) {
        this.key = key
        this.mode = mode

        this.moodChip = moodChip
        this.mainProgression = new Progression(moodChip)

        this.songParts = []
        this.scaleNotes = []
        this.scaleChords = []

        this.setModeAndKey()
        this.generateSong()
    }

    //Calculates the scale notes based on key & mode
    setModeAndKey() {
        //Get the major key by comparing key to mode.
        let majorKeyPos = (this.key - 1) - (this.mode - 1)
        if (majorKeyPos < 0) { majorKeyPos += 7 }

        //Rearrange the chromatic notes based on the found position
        let majorKeyChromaticPos = CHROMATIC_NOTES.indexOf(scaleNotes[majorKeyPos])
        let cN = [...CHROMATIC_NOTES]
        let cTailNotes = []
        cTailNotes = cN.splice(majorKeyChromaticPos)

        //Chromatic notes starting at major key
        let cnmk = [...cTailNotes, ...cN]

        //Take out the major scale notes based
        let majorScaleNotes = [cnmk[0], cnmk[2], cnmk[4], cnmk[5], cnmk[7], cnmk[9], cnmk[11]]

        //Circle and loop around the scaleNotes & scaleChords
        let notes = majorScaleNotes
        let tailNotes = []
        if (this.mode !== 1) { tailNotes = notes.splice(this.mode - 1) }
        this.scaleNotes = [...tailNotes, ...notes]

        let chords = [...scaleChords]
        let tailChords = []
        if (this.mode !== 1) { tailChords = chords.splice(this.mode - 1) }
        this.scaleChords = [...tailChords, ...chords]
    }

    //All the generation for creating the song parts
    generateSong() {
        //Create the different progressions, and run the "generation" functions to specialize them accordingly
        let chorus = this.mainProgression.clone()
        let verse = this.mainProgression.clone()

        chorusGeneration(chorus, this.moodChip.clone())
        verseGeneration(verse, this.moodChip.clone())

        let bridge = verse.clone()
        bridgeGeneration(bridge, this.moodChip.clone())

        let preChorus = chorus.clone()
        preChorusGeneration(preChorus)
        let preChorusPart = new SongPart(preChorus, 'prechorus')
        preChorusPostGeneration(preChorusPart)

        //Create the actual song parts from the created progressions
        let chorusFirst = new SongPart(chorus, 'chorus')
        let chorusSecond = secondChorusGeneration(chorusFirst)
        let chorusThird = thirdChorusGeneration(chorusFirst)

        let verseFirst = new SongPart(verse, 'verse')
        let verseIntro = introVerseGeneration(verseFirst)
        let verseSecond = secondVerseGeneration(verseFirst)
        let verseThird = thirdVerseGeneration(verseFirst)

        versePostGeneration(verseFirst)

        let bridgePart = new SongPart(bridge, 'bridge')
        bridegPostGeneration(bridgePart)

        //These are the possible variations in the song structure
        let structure = songStructureVariation(this)

        //BEGIN constructing the song
        if (structure.has_chorus_intro) { this.songParts.push(chorusFirst) }
        if (structure.has_verse_intro) { this.songParts.push(verseIntro) }

        this.songParts.push(verseFirst)

        if (structure.has_prechorus) { this.songParts.push(preChorusPart) }

        this.songParts.push(chorusFirst)

        this.songParts.push(verseSecond)

        if (structure.has_prechorus) { this.songParts.push(preChorusPart) }
        if (structure.has_double_second_chorus) { this.songParts.push(chorusFirst) }

        if (structure.has_bridge) {
            alterChorusForBridge(chorusSecond)
            this.songParts.push(chorusSecond)
            this.songParts.push(bridgePart)
        } else {
            this.songParts.push(chorusSecond)
            this.songParts.push(verseThird)
            if (structure.has_prechorus) { this.songParts.push(preChorusPart) }
        }

        this.songParts.push(chorusThird)
        if (structure.has_double_last_chorus) { this.songParts.push(chorusThird) }

    }

    print() {
        let ret = ""
        ret += "<h2>Song Info</h2>"
        ret += `<p><b>Key:</b> ${['', 'C', 'D', 'E', 'F', 'G', 'A', 'B'][this.key]}</p>`
        ret += `<p><b>Mode:</b> ${this.mode}</p>`

        ret += this.moodChip.print()
        ret += this.mainProgression.print(this.scaleNotes, this.scaleChords)

        this.songParts.map((sp) => {
            ret += sp.print(this.scaleNotes, this.scaleChords)
        })
        return ret
    }

    songNoteArray() {
        let songArray = []
        this.songParts.map((sp) => songArray.push(
            [sp.retrieveChords()]
        ))
        return songArray
    }

    play() {
        let now = Tone.now()
        let time = 0
        let spacing = 16

        this.songParts.map(async (songPart, songPartIndex) => {
            time = songPart.playPart(now, time, spacing, songPartIndex, this)
        })
    }

}