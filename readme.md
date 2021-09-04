Song- key, scale, and other information for the song
MusicSetting

    SongPart- chorus, verse, bridge, or prechorus
    MusicSetting
    BeatPattern

        Progressions- stores & generates chords
        MusicSetting
        Chords
        
        ArrangementParts- stores & generates melodies, beats, and instruments
        MusicSetting
        BeatPattern
        

Board
    Instrument


Music Classes
Chromatic Scale
Scales
ChordLibrary

Extra Classes
Genre Presets
Utility



/Generation- All the files for "generating"- meaning all the 'random-izing' & 'altering' logic is all in one place



=================
MoodChip
=================
Stores the information for the "mood" of the song/section- one of the primary ways to generate variety in songs.

Fields
=====
Resonance, tension, repetition, excitement, spread
    

Functions
=====
--Base
    function clone()- creates a copy and returns it
    method set(field_name, valid_amount), sets a field to a given amount
    method increase(field_name, valid_amount), increases a field to a set amount

--Special Altering
    method scale(field_name, value: int[-10-10], intensity=5: valid_amount, scale=10: int[1, 10, 100]) => Scales a field (up and/or down) based on the incoming value.

--Generation
    function weightFieldsRandomTrueFalse(field_array, average: valid_amount)- Takes in 1 array of fields, and returns a true/false based on itself
    function compareFieldsRandomTrueFalse(field_array, field_array)- Takes in 2 arrays of fields, and returns a true or false based on the weight of the settings.

--Printing
    function print() - a bad text printout of the settings




=================
Genre
=================
GenreParent- Stores the information for the "Genres"- types of music this thing can output, as ranges.
Fields
=====
Modes, bpms, moodChipRanges, InstrumentList

GenreInstance- Stores the information for an instance of a "Genre"- choose from the parent's ranges.
Fields
=====
Mode, bpm, moodChip, InstrumentList




=================
Chord
=================
Stores the information for the chord to be played.
Does not store actual notes, but references to the notes on a scale.

Fields
=====
Root, bass, notes, func, flav

Functions
=====
--Base
    function clone()- creates a copy and returns it
    
    method addNote(number: int/scale_position)- adds a note to the chord note list
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










=================
      TODO 
=================
Use to convert csv <-> midi, open midi in flp
http://www.fourmilab.ch/webtools/midicsv/

Use actual scales (not the current mode functionality) and do actual chord building (not chord map)

Change javascript to imports 