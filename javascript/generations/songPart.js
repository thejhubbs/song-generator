const songPartProgressionRepeat = (songPart) => {
    let progressions = []
    if (songPart.kind !== "prechorus") {
        progressions = [songPart.coreProgression.clone(), songPart.coreProgression.clone()]
    } else {
        progressions = [songPart.coreProgression.clone()]
    }
    return progressions
}

const processSongPartProgressions = (songPart) => {
    let aChord = null
    let bChord = null

    switch (songPart.kind) {
        //If it's the verse of the bridge, we increase the tension on the very last chord,
        //Or, if it's already (function 2, flavor 2), we decrease the tension of the (progresssion 1, position 4) chord.
        case "verse":
        case "bridge":
            aChord = songPart.getChord(1, 4)
            bChord = songPart.getChord(2, 4)

            if (aChord.flavor < 2) {
                bChord.alterFuncFlavor(0, 1)
            }
            else if (aChord.func < 2) {
                bChord.alterFuncFlavor(1, 0)
            }
            else {
                aChord.alterFuncFlavor(-1, -1)
            }

            break;
        //In the case of the chorus, we decrease the tension of the (progression all, position 4) chord,
        //And make sure the (progression all, position 1) chords are resonant.
        case "chorus":
            aChord = songPart.getChord(1, 4)
            bChord = songPart.getChord(2, 4)
            //We only decrease if the (progression all, position 4) chord is (function 2, flavor 2)
            if (aChord.flavor === 2 && aChord.func === 2) {
                aChord.alterFuncFlavor(0, -1)
                bChord.alterFuncFlavor(0, -1)
            }

            aChord = songPart.getChord(1, 1)
            bChord = songPart.getChord(2, 1)
            //Automatically make the very first chord more resonant.
            aChord.alterFuncFlavor(-2, -1)
            //If it's not (flavor 0), at least make the bass note the root of the key.
            if (aChord.flavor === 1) { aChord.changeBass(3) }
            //Automatically make the (progression 2, position 1) chord more resonant, but not quite as much.
            bChord.alterFuncFlavor(-2, 0)
            //If it's not (flavor 0), at least make the bass note the root of the key.
            if (bChord.flavor === 1) { bChord.changeBass(3) }
            if (bChord.flavor === 2) { bChord.changeBass(2) }
            break;
        //In the case of the prechorus, we alter the first and last chords to be more & less resonant.
        case "prechorus":
            songPart.getChord(1, 1).alterFuncFlavor(-2, 1)
            songPart.getChord(1, 4).alterFuncFlavor(2, -1)
        default:
            break;
    }
}
