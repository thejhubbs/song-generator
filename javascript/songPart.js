class SongPart {
    constructor(progression, excitement, kind, progressions = null, beatPattern = null, patterns = null) {
        this.coreProgression = progression.clone()
        this.excitement = excitement < 1 ? 1 : (excitement > 10 ? 10 : excitement)
        this.kind = kind

        progressions ? this.cloneNew(progressions, beatPattern, patterns) : this.processNew()


    }

    processNew() {
        statusElement.innerHTML += `&nbsp;Creating Song Part- ${this.kind}<br />`
        if (this.kind !== "prechorus") {
            this.progressions = [this.coreProgression.clone(), this.coreProgression.clone()]
        } else {
            this.progressions = [this.coreProgression.clone()]
        }
        let aChord = null
        let bChord = null

        switch (this.kind) {
            case "verse":
            case "bridge":
                aChord = this.progressions[0].chords[3]
                bChord = this.progressions[1].chords[3]

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
            case "chorus":
                aChord = this.progressions[0].chords[3]
                bChord = this.progressions[1].chords[3]
                if (aChord.flavor === 2 && aChord.func === 2) {
                    aChord.alterFuncFlavor(0, -1)
                    bChord.alterFuncFlavor(0, -1)
                }
                aChord = this.progressions[0].chords[0]
                bChord = this.progressions[1].chords[0]
                aChord.alterFuncFlavor(-2, -1)
                if(aChord.flavor === 1) { aChord.changeBass(3) }
                bChord.alterFuncFlavor(-2, 0)
                if(aChord.flavor === 1) { aChord.changeBass(3) }
                if(aChord.flavor === 2) { aChord.changeBass(2) }
                break;
            case "prechorus":
                this.progressions[0].chords[0].alterFuncFlavor(-2, 1)
                this.progressions[0].chords[3].alterFuncFlavor(2, -1)
            default:
                break;
        }

        this.beatPattern = new BeatPattern(this.excitement, this.coreProgression.repetition)
        this.patterns = [
            { name: 'drums', pattern: this.beatPattern.cloneAlter(this.excitement+2).cloneRandomize(this.coreProgression.resonance) },
            { name: 'bass', pattern: this.beatPattern.cloneRandomize(this.coreProgression.resonance).cloneAlter(this.excitement-2) },
            { name: 'harmony', pattern: this.beatPattern.cloneRandomize(this.coreProgression.resonance) },
            { name: 'melody', pattern: new BeatPattern(8, 3) },
            { name: 'fx', pattern: new BeatPattern(5, 9) },
            { name: 'melody2', pattern: this.beatPattern.cloneRandomize(this.coreProgression.resonance).cloneAlter(this.excitement-2) },
        ]
    }

    cloneNew(progressions, beatPattern, patterns) {
        if (!progressions || !beatPattern || !patterns) { console.log("ERROR in new SongPart.clone()") }

        statusElement.innerHTML += `&nbsp;Cloning Song Part- ${this.kind}<br />`

        this.progressions = progressions.map((p) => p.clone())
        this.patterns = patterns.map((p) => ({ ...p, pattern: p.pattern.clone() }))
        this.beatPattern = beatPattern.clone()
    }

    clone() {
        this.cloneAlter(0)
    }

    cloneAlter(excitementChange = 0, repeat = false) {
        return new SongPart(this.coreProgression, this.excitement + excitementChange, this.kind,
            repeat ? [...this.progressions, ...this.progressions] : this.progressions,
            this.beatPattern, this.patterns, this.instruments)
    }

    processSecondChorus() {
        let aChord = this.progressions[0].chords[3]
        let bChord = this.progressions[1].chords[3]

        if (aChord.flavor < 2) {
            bChord.alterFuncFlavor(1, 1)
        }
        else if (aChord.func < 2) {
            bChord.alterFuncFlavor(1, 1)
        }
    }

    retrieveChords() {
        let chords = []
        this.progressions.map((p) => chords = [...chords, ...(p.chords)])
        return chords
    }

    secondChorus() {
        let newPart = this.cloneAlter(2)
        newPart.processSecondChorus()
        return newPart
    }
    thirdChorus() {
        let newPart = this.cloneAlter(4, true)
        return newPart
    }
    firstVerse() {
        let newPart = this.cloneAlter(-2)
        return newPart
    }
    firstVersePart2() {
        let newPart = this.cloneAlter()
        return newPart
    }
    secondVerse() {
        let newPart = this.cloneAlter(2)
        return newPart
    }

    playPart(now, time, spacing, songPartIndex, song) {

        let chords = this.retrieveChords()
        let progressionMainChord = this.coreProgression.chords[0]

        chords.map((chord, i) => {

            //let e = this.excitement + (Math.round(Math.sqrt(this.excitement)) + i - 1)
            //let e = this.excitement + (Math.round(Math.sqrt(this.excitement)) + i - 2)
            //let e = this.excitement + (Math.round(Math.sqrt(this.excitement)) + i - 3)
            let e = this.excitement + (Math.round(Math.sqrt(this.excitement)) + i - 5)

            //bound e to 10
            e <= 0 ? e = 1 : (e > 10 ? e = 10 : null)

            let drumWeight = Math.ceil( (instrumentWeight[0] * 2 * e ) / 1000 )
            let bassWeight = Math.ceil(  (instrumentWeight[1] * 2 * e * this.coreProgression.tension) / 1000  )
            let harmonyWeight = Math.ceil( (instrumentWeight[2] * 2 * e * this.coreProgression.resonance) / 1000 )
            let melodyWeight =  Math.ceil( (instrumentWeight[3] * 2 * e * e) / 1000 )
            let fxWeight =  Math.ceil( (instrumentWeight[4] * 2 * e * e) / 1000 )

            playDrums(drumWeight, this.patterns[0].pattern, chord, i, now, time, spacing, progressionMainChord, song)          
            playBass(bassWeight, this.patterns[1].pattern, chord, i, now, time, spacing, progressionMainChord, song)
            playHarmony(harmonyWeight, this.patterns[2].pattern, chord, i, now, time, spacing, song)
            playMelody(melodyWeight, this.patterns[3].pattern, chord, i, now, time, spacing, progressionMainChord, song)  
            playHookMelody(fxWeight, this.patterns[4].pattern, chord, i, now, time, spacing, progressionMainChord, song)  
            playVocalMelody(melodyWeight, this.patterns[5].pattern, chord, i, now, time, spacing, progressionMainChord, song)  

            time += 4
        })

        return time
    }


}