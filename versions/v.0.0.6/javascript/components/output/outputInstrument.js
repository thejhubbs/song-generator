class OutputInstrument {
    constructor(synthType, filter, volume, options = null, synth = null) {
        if (synth) {
            this.synth = synth
        } else {
            let s = new Tone.PolySynth(synthType)
            s.connect(filter)
            s.volume.value = volume
            if (options) { s.set(options) }
            this.synth = s
        }
    }

    playNote(note, timing, volume = 1, duration = '16n') {
        let synth = this.synth
        if (!note || !timing || !volume) { console.log("ERROR IN PLAYNOTE", "\nNote: ", note, "\nTiming: ", timing, "\nVolume: ", volume) }
        else {
            try {
                Tone.Transport.schedule(function (time) {
                    try {
                        synth.triggerAttackRelease(note, duration, time, volume)
                    } catch {
                        console.log("Error in OutputInstrument", note, duration, time, volume)
                    }
                }, `${timing}b`);
            } catch {
                console.log("Error in OutputInstrument")
            }
        }
    }
}


// function playHarmony(excitement, arrangementPart, chord, i, now, time, spacing, song) {
//     arrangementPart.beatPattern.mainBeat.map((beatItem) => {
//         let e = excitement
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)
//         let sn = song.scaleNotes

//         //console.log(songPart.excitement, e, i)
//         let timing = (now + time + (p / spacing))

//         let chordNotes = chord.printChord(e, sn)
//         let rootNote = chord.printChordNote(1, sn)

//         if (beatItem.weight >= 5 * e * (11 - e)) {
//             song.harmonySynth.playNote(chordNotes, timing, e / 6)
//         } else if (beatItem.weight >= 4 * e * (11 - e)) {
//             song.harmonySynth.playNote(chordNotes, timing, e / 8)
//         } else if (beatItem.weight >= 2 * e * (11 - e)) {
//             song.harmonySynth.playNote(rootNote, timing, e / 10)
//         } else if (beatItem.weight >= e * (11 - e)) {
//             song.harmonySynth.playNote(chord.printChordNote((w % 4) + 1, sn), timing, e / 12)
//         } else {
//             song.harmonySynth.playNote(chord.printChordNote((w % 4) + 1, sn), timing, e / 14)
//         }

//     })
// }



// function playMelody(excitement, beatPattern, chord, i, now, time, spacing, mainChord, song) {
//     let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0].weight

//     let useChord = [true, false]
//     [normalizeAndGetRandomFromMap([beatPattern.resonance, beatPattern.tension])] ?
//         chord :
//         mainChord

//     beatPattern.mainBeat.map((beatItem) => {
//         let e = excitement
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)
//         let sn = song.scaleNotes

//         let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.repetition * 2))]

//         let r = ((i + Math.round(Math.sqrt(e))) % repeat) * (e / 3)
//         console.log(repeat, r)

//         let timing = (now + time + (p / spacing))

//         let weightRatio = w / highestWeight

//         if (weightRatio >= 1) {
//             song.melodySynth.playNote(mainChord.printChordNote(1, sn, 5), timing, 1, '8n')
//         } else if (weightRatio >= .9) {
//             song.melodySynth.playNote(useChord.printChordNote(((w + r) % 6) + 1, sn, 5), timing, 1, '8n')
//         } else if (weightRatio >= .75) {
//             song.melodySynth.playNote(useChord.printScaleNote(((w) % 8) + 1, sn, 5), timing, 1, '8n')
//         } else if (weightRatio >= .5) {
//             song.melodySynth.playNote(useChord.printScaleNote(((w) % 8) + 1, sn, 5), timing, 1, '8n')
//         } else {
//             song.melodySynth.playNote(chord.printScaleNote((w % 8) + 1, sn, 5), timing, 1, '8n')
//         }

//     })
// }

// function playHookMelody(excitement, beatPattern, chord, i, now, time, spacing, mainChord, song) {
//     let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0].weight

//     beatPattern.mainBeat.map((beatItem) => {
//         let e = excitement
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)
//         let sn = song.scaleNotes

//         let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.repetition * 2))]

//         let r = ((i + Math.round(Math.sqrt(e))) % repeat) * (e / 3)
//         console.log(repeat, r)

//         let timing = (now + time + (p / spacing))

//         let weightRatio = w / highestWeight

//         if (weightRatio >= 1) {
//             song.fxSynth.playNote(mainChord.printChordNote(1, sn, 5), timing, 1, '16n')
//         } else if (weightRatio >= .9) {
//             song.fxSynth.playNote(chord.printChordNote(1, sn, 5), timing, 1, '16n')
//         } else if (weightRatio >= .75) {
//             song.fxSynth.playNote(mainChord.printChordNote(3, sn, 5), timing, .9, '16n')
//         } else if (weightRatio >= .5) {
//             song.fxSynth.playNote(chord.printChordNote(1, sn, 5), timing, .8, '16n')
//         } else {
//             song.fxSynth.playNote(mainChord.printChordNote(3, sn, 5), timing, .6, '16n')
//         }

//     })
// }


// function playVocalMelody(excitement, beatPattern, chord, i, now, time, spacing, mainChord, song) {
//     let highestWeight = beatPattern.mainBeat.sort((a, b) => b.weight - a.weight)[0]
//     highestWeight ? heighestWeight = highestWeight.weight : null

//     let e = excitement
//     let sn = song.scaleNotes

//     let useChord = [true, false]
//     [normalizeAndGetRandomFromMap([beatPattern.resonance, beatPattern.tension])] ?
//         chord :
//         mainChord

//     let repeat = [1, 2, 4, 8][4 - Math.floor(Math.sqrt(beatPattern.repetition * 2))]
//     let r = ((i + Math.round(Math.sqrt(e))) % repeat) * (e / 3)

//     beatPattern.mainBeat.map((beatItem) => {
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)

//         let timing = (now + time + (p / spacing))

//         let weightRatio = w / highestWeight



//         if (weightRatio >= 1) {
//             song.voxSynth.playNote(useChord.printChordNote(1, sn, 5), timing, 1, '4n')
//         } else if (weightRatio >= .9) {
//             song.voxSynth.playNote(useChord.printScaleNote((w % 8) + 1, sn, 4), timing, 1, '4n')
//         } else if (weightRatio >= .75) {
//             song.voxSynth.playNote(useChord.printScaleNote((w % 8) + 1, sn, 4), timing, 1, '4n')
//         } else if (weightRatio >= .5) {
//             song.voxSynth.playNote(useChord.printScaleNote((w % 8) + 1, sn, 4), timing, 1, '4n')
//         } else {
//             song.voxSynth.playNote(useChord.printScaleNote((w % 8) + 1, sn, 4), timing, 1, '4n')
//         }

//     })
// }


// function playBass(excitement, beatPattern, chord, i, now, time, spacing, mainChord, song) {
//     beatPattern.mainBeat.map((beatItem) => {
//         let e = excitement
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)
//         let sn = song.scaleNotes

//         let timing = (now + time + (p / spacing))

//         if (beatItem.weight >= 5 * e * (11 - e)) {
//             song.bassSynth.playNote(chord.printBassNote(1, sn), timing, 1)
//         } else if (beatItem.weight >= 4 * e * (11 - e)) {
//             song.bassSynth.playNote(chord.printBassNote(4, sn), timing, 1)
//         } else if (beatItem.weight >= 2 * e * (11 - e)) {
//             song.bassSynth.playNote(chord.printScaleNote((w % 8) + 1, sn, 3), timing, 1)
//         } else if (beatItem.weight >= e * (11 - e)) {
//             song.bassSynth.playNote(chord.printChordNote((w % 3) + 1, sn, 2), timing, 1)
//         } else {
//             song.bassSynth.playNote(chord.printBassNote(1, sn), timing, 1)
//         }

//     })
// }

// function playDrums(excitement, beatPattern, chord, i, now, time, spacing, mainChord, song) {
//     beatPattern.mainBeat.map((beatItem) => {
//         let e = excitement
//         let p = Number.parseInt(beatItem.position)
//         let w = Number.parseInt(beatItem.weight)
//         let sn = song.scaleNotes

//         let timing = (now + time + (p / spacing))

//         let kickNote = mainChord.noteName(mainChord.bass, song.scaleNotes) + "2"
//         let snareNote = mainChord.noteName(mainChord.root, song.scaleNotes) + "3"
//         let hatNote = mainChord.noteName(mainChord.root, song.scaleNotes) + "6"

//         console.log(beatPattern, excitement, e)

//         if (beatItem.weight >= 5 * e * (11 - e)) {
//             let kickVol = w / 1000
//             kickVol > 1 ? kickVol = 1 : null
//             song.kickDrum.playNote(kickNote, timing, kickVol)
//             //song.hatDrum.playNote(hatNote, timing, 1)
//         } else if (beatItem.weight >= 4 * e * (11 - e)) {
//             song.kickDrum.playNote(kickNote, timing, 1)
//             //song.snareDrum.playNote(snareNote, timing, 1)
//         } else if (beatItem.weight >= 2 * e * (11 - e)) {
//             song.snareDrum.playNote(snareNote, timing, 1)
//             //song.hatDrum.playNote(hatNote, timing, 1)
//         } else if (beatItem.weight >= e * (11 - e)) {
//             song.hatDrum.playNote(hatNote, timing, 1)
//         } else {
//             song.hatDrum.playNote(hatNote, timing, 1)
//         }

//     })
// }

