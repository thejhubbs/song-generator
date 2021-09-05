import Chord from '../javascript/components/music/chord.js'
import {scaleNotes, scaleChords} from '../javascript/settings/music.js'

export default () => {
    /* Tests */
    let chordTotalTests = 6

    // TEST 1
    // Create a chord, and check it's basic attributes and name.
    let cChord = new Chord({})

    console.log(`Checking Chord 1/${chordTotalTests}`)

    console.assert(cChord.root === 1, { expected: 1, actual: cChord.root, message: "Chord.Root is not as expected." })
    console.assert(cChord.bass === 1, { expected: 1, actual: cChord.bass, message: "Chord.Bass is not as expected." })

    console.assert(cChord.notes.includes(1), { expected: "Includes a 1.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(3), { expected: "Includes a 3.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(5), { expected: "Includes a 5.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.length === 3, { expected: "Length of 3.", actual: cChord.notes, message: "Chord.Notes.length is not as expected." })

    console.assert(cChord.func === 0, { expected: 0, actual: cChord.func, message: "Chord.Func is not as expected." })
    console.assert(cChord.flavor === 0, { expected: 0, actual: cChord.flavor, message: "Chord.Flavor is not as expected." })

    console.assert(cChord.printName(scaleNotes, scaleChords) === "C", { expected: "C", actual: cChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 1/${chordTotalTests}`)

    // TEST 2
    // Add a note and check
    console.log(`Checking Chord 2/${chordTotalTests}`)
    cChord.addNote(7)
    console.assert(cChord.notes.includes(1), { expected: "Includes a 1.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(3), { expected: "Includes a 3.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(5), { expected: "Includes a 5.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(7), { expected: "Includes a 7.", actual: cChord.notes, message: "Chord.Notes is not as expected." })

    //Add the same note in again to make sure it doesn't apply.
    cChord.addNote(7)
    console.assert(cChord.notes.length === 4, { expected: "Length of 4.", actual: cChord.notes, message: "Chord.Notes.length is not as expected." })
    console.assert(cChord.printName(scaleNotes, scaleChords) === "C7", { expected: "C7", actual: cChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 2/${chordTotalTests}`)

    // TEST 3
    // Test addOneNote & remove note
    console.log(`Checking Chord 3/${chordTotalTests}`)
    let chordTestNoteArray = [5, 7, 9, 11, 13]
    cChord.addOneNote(chordTestNoteArray)
    console.assert(cChord.notes.includes(1), { expected: "Includes a 1.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(3), { expected: "Includes a 3.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(5), { expected: "Includes a 5.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(7), { expected: "Includes a 7.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(9), { expected: "Includes a 9.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.length === 5, { expected: "Length of 5.", actual: cChord.notes, message: "Chord.Notes.length is not as expected." })
    console.assert(cChord.printName(scaleNotes, scaleChords) === "C9", { expected: "C9", actual: cChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    //Add in from the same array again.
    cChord.addOneNote(chordTestNoteArray)
    console.assert(cChord.notes.includes(11), { expected: "Includes an 11.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.length === 6, { expected: "Length of 6.", actual: cChord.notes, message: "Chord.Notes.length is not as expected." })
    console.assert(cChord.printName(scaleNotes, scaleChords) === "C11", { expected: "C11", actual: cChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    //Remove the 7 & 11 to test the remove function and the add9 Name
    cChord.removeNote(7)
    cChord.removeNote(11)
    console.assert(cChord.notes.includes(1), { expected: "Includes a 1.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(3), { expected: "Includes a 3.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(5), { expected: "Includes a 5.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(!cChord.notes.includes(7), { expected: "Does NOT include a 7.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.includes(9), { expected: "Includes a 9.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(!cChord.notes.includes(11), { expected: "Does NOT include an 11.", actual: cChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(cChord.notes.length === 4, { expected: "Length of 4.", actual: cChord.notes, message: "Chord.Notes.length is not as expected." })
    console.assert(cChord.printName(scaleNotes, scaleChords) === "Cadd9", { expected: "Cadd9", actual: cChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 3/${chordTotalTests}`)

    // TEST 4
    // Create an A minor chord using alterFuncFlavor
    console.log(`Checking Chord 4/${chordTotalTests}`)

    let amChord = new Chord({})
    amChord.alterFuncFlavor(0, 1)

    console.assert(amChord.root === 6, { expected: 1, actual: amChord.root, message: "Chord.Root is not as expected." })
    console.assert(amChord.bass === 1, { expected: 1, actual: amChord.bass, message: "Chord.Bass is not as expected." })

    console.assert(amChord.notes.includes(1), { expected: "Includes a 1.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(3), { expected: "Includes a 3.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(5), { expected: "Includes a 5.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.length === 3, { expected: "Length of 3.", actual: amChord.notes, message: "Chord.Notes.length is not as expected." })

    console.assert(amChord.func === 0, { expected: 0, actual: amChord.func, message: "Chord.Func is not as expected." })
    console.assert(amChord.flavor === 1, { expected: 1, actual: amChord.flavor, message: "Chord.Flavor is not as expected." })

    console.assert(amChord.printName(scaleNotes, scaleChords) === "Am", { expected: "Am", actual: amChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 4/${chordTotalTests}`)

    // TEST 5
    // Make it a sus chord using changeNote
    console.log(`Checking Chord 5/${chordTotalTests}`)
    amChord.changeNote(3, 4)

    console.assert(amChord.notes.includes(1), { expected: "Includes a 1.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(!amChord.notes.includes(3), { expected: "Does NOT include a 4.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(4), { expected: "Includes a 4.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(5), { expected: "Includes a 5.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.length === 3, { expected: "Length of 3.", actual: amChord.notes, message: "Chord.Notes.length is not as expected." })

    console.assert(amChord.printName(scaleNotes, scaleChords) === "Amsus4", { expected: "Amsus4", actual: amChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 5/${chordTotalTests}`)

    // TEST 6
    // Change the bass
    console.log(`Checking Chord 6/${chordTotalTests}`)
    amChord.changeBass(3)

    console.assert(amChord.root === 6, { expected: 1, actual: amChord.root, message: "Chord.Root is not as expected." })
    console.assert(amChord.bass === 3, { expected: 3, actual: amChord.bass, message: "Chord.Bass is not as expected." })

    console.assert(amChord.notes.includes(1), { expected: "Includes a 1.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(!amChord.notes.includes(3), { expected: "Does NOT include a 4.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(4), { expected: "Includes a 4.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.includes(5), { expected: "Includes a 5.", actual: amChord.notes, message: "Chord.Notes is not as expected." })
    console.assert(amChord.notes.length === 3, { expected: "Length of 3.", actual: amChord.notes, message: "Chord.Notes.length is not as expected." })

    console.assert(amChord.printName(scaleNotes, scaleChords) === "Amsus4/C", { expected: "Amsus4/C", actual: amChord.printName(scaleNotes, scaleChords), message: "Chord.PrintName is not as expected." })

    console.log(`Completed Chord 6/${chordTotalTests}`)
}