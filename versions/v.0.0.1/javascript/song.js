class Song {
    constructor(key, mode, resonance, tension, repetition, excitement) {
        statusElement.innerHTML += "Creating song<br />"

        this.key = key
        this.mode = mode
        this.resonance = resonance
        this.tension = tension
        this.repetition = repetition
        this.excitement = excitement

        this.mainProgression = new Progression(resonance, repetition, tension)

        this.songParts = []

        this.setModeAndKey()
        this.generateSong()
        
        statusElement.innerHTML += "Finished song<br />"
    }

    setModeAndKey() {
        let majorKeyPos = (this.key - 1) - (this.mode - 1)
        if (majorKeyPos < 0) { majorKeyPos += 7 }

        let majorKeyChromaticPos = chromaticNotes.indexOf(scaleNotes[majorKeyPos])

        let cN = [...chromaticNotes]
        let cTailNotes = []
        cTailNotes = cN.splice(majorKeyChromaticPos)
        //Chromatic notes starting at major key
        let cnmk = [...cTailNotes, ...cN]

        let majorScaleNotes = [cnmk[0], cnmk[2], cnmk[4], cnmk[5], cnmk[7], cnmk[9], cnmk[11]]

        let notes = majorScaleNotes
        let tailNotes = []
        if (this.mode !== 1) { tailNotes = notes.splice(this.mode - 1) }
        this.scaleNotes = [...tailNotes, ...notes]

        let chords = [...scaleChords]
        let tailChords = []
        if (this.mode !== 1) { tailChords = chords.splice(this.mode - 1) }
        this.scaleChords = [...tailChords, ...chords]
        
        //console.log(this.scaleNotes, this.scaleChords)
    }

    generateSong() {
        let chorus = this.mainProgression.clone()
        let verse = chorus.clone()

        chorus.regenerate(this.resonance, -1 * this.resonance, 4, this.excitement)
        verse.regenerate()

        let bridge = verse.clone()
        bridge.regenerate(-1 * this.tension, this.tension, 0, this.excitement)

        let preChorus = chorus.clone()
        preChorus.regenerate(4, 0, 4, this.excitement)

        let c1 = new SongPart(chorus, this.excitement+2, 'chorus')
        let c2 = c1.secondChorus()
        let c3 = c1.thirdChorus()

        let v = new SongPart(verse, this.excitement, 'verse')
        let v1 = v.firstVerse()
        let v1a = v.firstVersePart2()
        let v2 = v.secondVerse()

        let b = new SongPart(bridge, this.excitement-2, 'bridge')

        let pc = new SongPart(preChorus, this.excitement+4, 'prechorus')
        let prechorus = [true, false][normalizeAndGetRandomFromMap([ this.repetition + this.tension + this.resonance, 30 - (this.repetition + this.tension + this.resonance)])]
        

        console.log(v1, c1, v2, c2, b, c3)

        let chorusIntro = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.resonance , this.tension * 2])]
        if(chorusIntro) {
            this.songParts.push(c1)
        }
        
        this.songParts.push(v1)

        let doubleFirstVerse = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.tension , this.resonance * 2])]
        if(doubleFirstVerse) {
            this.songParts.push(v1a)
        }

        if(prechorus) { this.songParts.push(pc) }
        this.songParts.push(c1)
        
        this.songParts.push(v2)
        
        if(prechorus) { this.songParts.push(pc) }

        let doubleSecondChorus = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.resonance , this.tension * 2])]
        if(doubleSecondChorus) {
            this.songParts.push(c1)
        }

        let insertBridge = [true, false][normalizeAndGetRandomFromMap([this.tension + this.resonance, this.repetition * 2])]
        if(insertBridge) {
            this.songParts.push(c2)
            this.songParts.push(b)
        } else {
            this.songParts.push(c1)
            this.songParts.push(v2)
        }
        
        this.songParts.push(c3)

    }

    printSong() {
        return this.songParts.map((sp) => {
            let chordString = sp.retrieveChords().map( (c) => c.printName(this.scaleNotes, this.scaleChords) ).join(' ')
            return `${sp.kind}<br />${chordString}<br />`
        })
    }

    songNoteArray() {
        let songArray = []
        this.songParts.map( (sp) => songArray.push(
            [ sp.retrieveChords() ]
        ))
        return songArray
    }

}

function postProcessChorus(chorus) {
    let c1flavor = chorus[3].flavor
    let c2flavor = chorus[3].flavor
    let c1func = chorus[3].func
    let c2func = chorus[3].func

    let c1 = [...chorus]
    let c2 = [...chorus]

    if (chorus[3].flavor < 2) {
        c2flavor += 1
    }
    else if (chorus[3].func < 2) {
        c2func += 1
    }
    else {
        c1flavor -= 1
    }

    c1[3] = findChordByFuncFlavor(c1func, c1flavor)
    c2[3] = findChordByFuncFlavor(c2func, c2flavor)

    c1 = handleBassProgression(c1)
    c2 = handleBassProgression(c2)

    return { c1, c2 }
}

function postProcessVerse(verse) {
    let v1flavor = verse[3].flavor
    let v2flavor = verse[3].flavor
    let v1func = verse[3].func
    let v2func = verse[3].func

    let v1 = [...verse]
    let v2 = [...verse]

    if (verse[3].flavor < 2) {
        v2flavor += 1
    }
    else if (verse[3].func < 2) {
        v2func += 1
    }
    else {
        v1flavor -= 1
    }

    v1[3] = findChordByFuncFlavor(v1func, v1flavor)
    v2[3] = findChordByFuncFlavor(v2func, v2flavor)

    v1 = handleBassProgression(v1)
    v2 = handleBassProgression(v2)


    return { v1, v2 }
}

function handleBassProgression(progression) {
    return progression.map((p, i) => {
        p = { ...p }
        switch (i) {
            case 0:
                if (p.flavor !== 0 || p.func !== 0) {
                    // p.name = p.name.split('/')[0];
                    // p.name += `/${scaleNotes[0]}`
                }
                break;
            case 1:
                if (p.flavor === progression[0].flavor && p.func === progression[0].func) {
                    // p.name = p.name.split('/')[0];
                    // p.name += ['sus2', 'sus4'][rTF() ? 1 : 0]
                }
                break;
            case 2:
                if (p.flavor === progression[1].flavor && p.func === progression[1].func) {
                    // p.name = p.name.split('/')[0];
                    // p.name += `/${scaleNotes[(scaleNotes.indexOf(p.name[0]) + 4) % 7]}`
                }
                break;
            case 3:
                if (p.flavor === progression[2].flavor && p.func === progression[2].func) {
                    // p.name = p.name.split('/')[0];
                    // p.name += `7/${scaleNotes[(scaleNotes.indexOf(p.name[0]) + 2) % 7]}`
                }
                break;
            default:
                break;
        }
        return p
    })
}