class SongPart {
    constructor(progression, excitement, kind, progressions = null, beatPattern = null, melodyPattern = null) {
        this.coreProgression = progression.clone()
        this.excitement = excitement
        this.kind = kind

        progressions ? this.clone(progressions) : this.process()

        this.beatPattern = beatPattern ? beatPattern.cloneAlter(excitement) : new BeatPattern(excitement, progression.repetition)
        this.melodyPattern = melodyPattern ? melodyPattern.cloneAlter(excitement) : new BeatPattern(excitement, progression.repetition+4)

        this.drumPattern = this.beatPattern.cloneAlter(excitement)
        this.synthPattern = this.beatPattern.cloneAlter(excitement)


    }

    process() {
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
                if (aChord.flavor === 2 & aChord.func === 2) {
                    aChord.alterFuncFlavor(0, -1)
                    bChord.alterFuncFlavor(0, -1)
                }
                break;
            case "prechorus":
                this.progressions[0].chords[0].alterFuncFlavor(-2, 1)
                this.progressions[0].chords[3].alterFuncFlavor(2, -1)
            default:
                break;
        }
    }

    clone(progressions) {
        statusElement.innerHTML += `&nbsp;Cloning Song Part- ${this.kind}<br />`
        this.progressions = progressions.map((p) => p.clone())
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
        let newPart = new SongPart(this.coreProgression, this.excitement + 2, 'chorus', this.progressions, this.beatPattern)
        newPart.processSecondChorus()
        return newPart
    }
    thirdChorus() {
        let newPart = new SongPart(this.coreProgression, this.excitement + 5, 'chorus', [...this.progressions, ...this.progressions], this.beatPattern)
        return newPart
    }
    firstVerse() {
        let newPart = new SongPart(this.coreProgression, this.excitement - 3, 'verse', this.progressions, this.beatPattern)
        return newPart
    }
    firstVersePart2() {
        let newPart = new SongPart(this.coreProgression, this.excitement, 'verse', this.progressions, this.beatPattern)
        return newPart
    }
    secondVerse() {
        let newPart = new SongPart(this.coreProgression, this.excitement + 3, 'verse', this.progressions, this.beatPattern)
        return newPart
    }



}