class SongPart {
    constructor(progression, kind, progressions = null, beatPattern = null, arrangements = null) {
        this.coreProgression = progression.clone()
        this.musicSettings = progression.musicSettings.clone()

        //Accepted Kinds- chorus, verse, brige, prechorus
        this.kind = kind

        //Setting progressions, beatPattern, and arrangements to null for clarity, they are set in the next line.
        this.progressions = null
        this.beatPattern = null
        this.arrangements = null

        //if AT least progressions is provided, that means it's a clone, and beatPattern & arrangements must be provided
        progressions ? this.cloneNew(progressions, beatPattern) : this.processNew()
        arrangements ? this.cloneArrangements(arrangements) : this.generateArrangements() 


    }

    processNew() {
        //Unless it's a prechorus, we double the progression.
        if (this.kind !== "prechorus") {
            this.progressions = [this.coreProgression.clone(), this.coreProgression.clone()]
        } else {
            this.progressions = [this.coreProgression.clone()]
        }

        //This is a function that looks at the chords & progressions and does a little bit of processing.
        this.processProgressions()

        //Set up a new beat pattern that's "default" for the song part
        this.beatPattern = new BeatPattern(this.musicSettings)
    }

    processProgressions() {
        let aChord = null
        let bChord = null

        switch (this.kind) {
            //If it's the verse of the bridge, we increase the tension on the very last chord,
            //Or, if it's already (function 2, flavor 2), we decrease the tension of the (progresssion 1, position 4) chord.
            case "verse":
            case "bridge":
                aChord = this.getChord(1, 4)
                bChord = this.getChord(2, 4)

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
                aChord = this.getChord(1, 4)
                bChord = this.getChord(2, 4)
                //We only decrease if the (progression all, position 4) chord is (function 2, flavor 2)
                if (aChord.flavor === 2 && aChord.func === 2) {
                    aChord.alterFuncFlavor(0, -1)
                    bChord.alterFuncFlavor(0, -1)
                }

                aChord = this.getChord(1, 1)
                bChord = this.getChord(2, 1)
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
                this.getChord(1, 1).alterFuncFlavor(-2, 1)
                this.getChord(1, 4).alterFuncFlavor(2, -1)
            default:
                break;
        }
    }

    generateArrangements() {
        let p1 = this.beatPattern.cloneRandomize(this.musicSettings.resonance).cloneAlter(instrumentWeight['kick'] / 10)
        let p2 = this.beatPattern.cloneRandomize(this.musicSettings.resonance).cloneAlter(instrumentWeight['hat'] / 10)
        let p3 = this.beatPattern.cloneRandomize(this.musicSettings.resonance).cloneAlter(instrumentWeight['bass'] / 10)
        let p4 = this.beatPattern.cloneRandomize(this.musicSettings.resonance).cloneAlter(instrumentWeight['harmony'] / 10)
        let p5 = this.beatPattern.cloneRandomize(this.musicSettings.resonance).cloneAlter(instrumentWeight['vox'] / 10)

        let melodySettings = this.musicSettings.clone()

        this.arrangements = [
            //new ArrangementPart('kick', p1),
            //new ArrangementPart('hat', p2),
            //new ArrangementPart('bass', p3),
            new ArrangementPart('harmony', p4),
            new ArrangementPart('melody', new BeatPattern(melodySettings).cloneAlter( instrumentWeight['melody'] / 10 )),
            new ArrangementPart('fx', new BeatPattern(melodySettings).cloneAlter(instrumentWeight['fx'] / 10)),
            new ArrangementPart('vox', p5),
        ]
    }

    cloneArrangements(arrangements) {
        this.arrangements = arrangements.map((p) => p.clone())
    }

    cloneNew(progressions, beatPattern, arrangements) {
        if (!progressions || !beatPattern || !arrangements) { console.log("ERROR in new SongPart.clone()- correct items not provided.") }

        this.progressions = progressions.map((p) => p.clone())
        this.beatPattern = beatPattern.clone()
    }

    clone() {
        return new SongPart(this.coreProgression, this.kind,
            this.progressions, this.beatPattern, this.arrangements)
    }

    cloneAlter(excitementChange = 0, repeat = false) {
        let p = this.coreProgression.clone()
        p.musicSettings.increase('excitement', excitementChange)

        let b = this.beatPattern.clone()
        b.musicSettings = p.musicSettings.clone()

        return new SongPart(p, this.kind,
            repeat ? [...this.progressions, ...this.progressions] : this.progressions,
            b)
    }

    //Takes in indexed-1 progression & chord to return
    getChord(progression, chord) {
        let p = this.progressions[progression - 1]
        if (p) {
            let c = p.chords[chord - 1]
            if (c) {
                return c
            } else {
                console.log("SongPart.getChord()- Tried to get unavailable chord.")
            }
        } else {
            console.log("SongPart.getChord()- Tried to get unavailable chord.")
        }
    }

    retrieveChords() {
        let chords = []
        this.progressions.map((p) => chords = [...chords, ...(p.chords)])
        return chords
    }

    playPart(now, time, spacing, songPartIndex, song) {

        let chords = this.retrieveChords()
        let progressionMainChord = this.coreProgression.chords[0]

        chords.map((chord, i) => {
            let e = this.musicSettings.excitement + (Math.round(Math.sqrt(this.musicSettings.excitement)) * (i / 2 - 4))
            e = bound(e, 1, 10)

            this.arrangements.map((p) => p.playPart(e, songPartIndex, chord, i, now, time, spacing, progressionMainChord, song))

            time += 2
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
        this.arrangements.map((p) => ret += "<div>" + p.name + ": " + p.beatPattern.print() + "</div>")


        ret += "</div>"
        return ret
    }


}