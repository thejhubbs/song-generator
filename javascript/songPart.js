class SongPart {
    constructor(progression, kind, progressions = null, beatPattern = null, patterns = null) {
        this.coreProgression = progression.clone()
        this.musicSettings = progression.musicSettings.clone()
        this.kind = kind

        progressions ? this.cloneNew(progressions, beatPattern, patterns) : this.processNew()


    }

    processNew() {
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

        this.beatPattern = new BeatPattern(this.musicSettings)
        
        let p1 = this.beatPattern.cloneRandomize(this.musicSettings.resonance)
        let p2 = this.beatPattern.cloneRandomize(this.musicSettings.resonance)
        let p3 = this.beatPattern.cloneRandomize(this.musicSettings.resonance)
        let p4 = this.beatPattern.cloneRandomize(this.musicSettings.resonance)
        let p5 = this.beatPattern.cloneRandomize(this.musicSettings.resonance)

        this.patterns = [
            new ArrangementPart('kick', p1 ),
            //new ArrangementPart('hat', p2 ),
            new ArrangementPart('bass', p3 ),
            new ArrangementPart('harmony',  p4),
            new ArrangementPart('melody', new BeatPattern( this.musicSettings) ),
            new ArrangementPart('fx',  new BeatPattern( this.musicSettings ) ),
            new ArrangementPart('vox',  p5),
        ]
    }

    cloneNew(progressions, beatPattern, patterns) {
        if (!progressions || !beatPattern || !patterns) { console.log("ERROR in new SongPart.clone()") }

        this.progressions = progressions.map((p) => p.clone())
        this.patterns = patterns.map((p) => p.clone())
        this.beatPattern = beatPattern.clone()
    }

    clone() {
        this.cloneAlter(0)
    }

    cloneAlter(excitementChange = 0, repeat = false) {
        //account for excitementChange
        return new SongPart(this.coreProgression, this.kind,
            repeat ? [...this.progressions, ...this.progressions] : this.progressions,
            this.beatPattern, this.patterns)
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
            //let e = this.musicSettings.excitement
            let e = this.musicSettings.excitement + (Math.round(Math.sqrt(this.musicSettings.excitement)) * (i/2-4) )
            e = bound(e, 1, 10)

            this.patterns.map( (p) => p.playPart(e, songPartIndex, chord, i, now, time, spacing, progressionMainChord, song) )
            
            time += 4
        })

        return time
    }

    print(scaleNotes, scaleChords) {
        let ret = "<div>"
        
        ret += "<h2>" + this.kind + "</h2>"
        
        ret += this.musicSettings.print()
        ret += this.coreProgression.print(scaleNotes, scaleChords)

        ret += "<h3>Main Pattern</h3>"
        ret += this.beatPattern.print()

        ret += "<h3>Arrangements</h3>"
        this.patterns.map ((p) => ret += "<div>" + p.name + ": " + p.beatPattern.print() + "</div>")


        ret += "</div>"
        return ret
    }


}