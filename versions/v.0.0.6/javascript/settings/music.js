let songKey = "C"

let scaleNotes = ['C', "D", "E", "F", "G", "A", "B"]

let scaleChords = [
    { name: "", note: 1 },
    { name: "m", note: 2 },
    { name: "m", note: 3 },
    { name: "", note: 4 },
    { name: "", note: 5 },
    { name: "m", note: 6 },
    { name: "dim", note: 7 },
]

let funcFlavorMap = [
    { root: 1, func: 0, flavor: 0, chord: new Chord({ root: 1, func: 0, flavor: 0 }) },
    { root: 2, func: 1, flavor: 1, chord: new Chord({ root: 2, func: 1, flavor: 1 }) },
    { root: 3, func: 2, flavor: 1, chord: new Chord({ root: 3, func: 2, flavor: 1 }) },
    { root: 4, func: 1, flavor: 0, chord: new Chord({ root: 4, func: 1, flavor: 0 }) },
    { root: 5, func: 2, flavor: 0, chord: new Chord({ root: 5, func: 2, flavor: 0 }) },
    { root: 6, func: 0, flavor: 1, chord: new Chord({ root: 6, func: 0, flavor: 1 }) },
    { root: 7, func: 2, flavor: 2, chord: new Chord({ root: 7, func: 2, flavor: 2 }) },
    { root: 4, func: 0, flavor: 2, chord: new Chord({ root: 4, bass: 5, notes: [1, 3, 5, 7], func: 0, flavor: 2 }) },
    { root: 7, func: 1, flavor: 2, chord: new Chord({ root: 7, bass: 5, notes: [1, 3, 5, 7], func: 1, flavor: 2 }) },
]

function findChordByFuncFlavor(func, flavor) {
    let ret = null
    funcFlavorMap.map((c) => c.func === func && c.flavor === flavor ? ret = c : null)
    if (ret === null) { console.log("CANNOT FIND:", func, flavor) }
    return ret
}