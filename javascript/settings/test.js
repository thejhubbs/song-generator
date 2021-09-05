export function compareArray(arr1, arr2) {
    let check = true
    if (arr1.length !== arr2.length) { check = false }
    arr1.map((a1, i) => {
        if (a1 !== arr2[i]) { check = false }
        return a1
    })
    return check
}

export function compareArrayOfObjects(arr1, arr2) {
    let check = true
    if (arr1.length !== arr2.length) { check = false }
    else {
        arr1.map((a1, i) => {
            let a2 = arr2[i]

            Object.entries(a1).map((o1) => {
                if (o1[1] !== a2[o1[0]]) { check = false }
            })

            return a1
        })
    }
    return check
}

export function isNote(input) {
    if(typeof input !== 'string') { 
        //console.log("ERROR- isNote- Note is not a string.", input, typeof input); 
        return false 
    } 

    if( !(input.length !== 2 || input.length !== 3) ) { console.log("ERROR- isNote- Note should be 2 or 3 chars.", input, input.length); return false }

    let notePart = input.slice(0, -1)
    let octavePart = input.slice(-1)

    let noteCheck = ['C', "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"].includes(notePart)
    if ( !noteCheck ) { console.log("ERROR- isNote- NotePart is not accurate,", "\ninput: ", input, "\nnotePart: ", notePart); return false; }

    let octaveCheck = ['1', "2", "3", "4", "5", "6", "7", "8", "9"].includes(octavePart)
    if ( !octaveCheck ) { console.log("ERROR- isNote- OctavePart is not accurate,", "input: ", input,  "octavePart: ", octavePart); return false; }

    return true
}

export function isNoteArray(input) {
    if(!Array.isArray(input)) { 
        //console.log("ERROR- isNote- Input is not an array of notes.", input, typeof input); 
        return false 
    } 

    let checkNotes = input.map( (i) => {
        if(!isNote(i)) {
            console.log("ERROR- isNoteArray- element is not a Note,", input, notePart)
            return false;
        } 
        return true
    })

    checkNotes = checkNotes.filter( (n) => !n)

    if(checkNotes.length > 0){
        return false
    }

    return true
}

export function isNoteTime(input) {
    if(typeof input !== 'string') { console.log("ERROR- isNoteTime- Note is not a string.", input, typeof input); return false } 

    let noteCheck = ["2n", "4n", "8n", "16n", "32n"].includes(input)
    if ( !noteCheck ) { console.log("ERROR- isNoteTime- time is not accurate,", input); return false; }

    return true
}

export default {
    compareArray,
    compareArrayOfObjects,
    isNote,
    isNoteArray,
    isNoteTime
}