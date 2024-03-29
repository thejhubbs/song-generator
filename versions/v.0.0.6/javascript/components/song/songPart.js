/*

    SongPart
    =====
    SongPart stores a progression, along with arrangments (which hold the instruments & beatPatterns).
    It also stores a "core" beatPattern, progression, and moodChip, and alters those. 
    It takes the progressions and makes them more resemble the part of the song they are.

    this.coreProgression
    this.moodChip 

    this.kind = kind //Possible Kinds- chorus, verse, brige, prechorus

    this.progressions = array of progressions. Most song parts at least play the progression twice.
    this.beatPattern = the "core" beatPatter
    this.arrangements = null

*/

class SongPart {
    constructor(progression, kind, progressions = null, beatPattern = null, arrangements = null) {
        this.coreProgression = progression.clone()
        this.moodChip = progression.moodChip.clone()

        //Possible Kinds- chorus, verse, brige, prechorus
        this.kind = kind

        //Setting progressions, beatPattern, and arrangements to null for clarity, they are set in the next line.
        this.progressions = null
        this.beatPattern = null
        this.arrangements = null

        //if AT least the full progressions array is provided, that means it's a clone, and beatPattern & arrangements must be provided
        if(progressions) {
            this.progressions = progressions.map((p) => p.clone())
            this.beatPattern = beatPattern.clone()
        } else {
            //Figure out whether or not & how many times to repeat the progression.
            this.progressions = songPartProgressionRepeat(this)
            this.beatPattern = new BeatPattern(this.moodChip)

            //This is a function that looks at the chords & progressions and does a little bit of processing.
            processSongPartProgressions(this)
        }

        if(arrangements) {
            this.arrangements = arrangements.map((p) => p.clone())
        } else {
            this.arrangements = generateArrangementsFromBeatPatternAndInstrumentList(this.beatPattern, instrumentList)
        }
    }

    clone() {
        return new SongPart(this.coreProgression, this.kind,
            this.progressions, this.beatPattern, this.arrangements)
    }

    cloneAlter(excitementChange = 0, repeat = false) {
        let p = this.coreProgression.clone()
        excitementChange = excitementChange * Math.abs( excitementChange / 10 )
        p.moodChip.increase('excitement', excitementChange)

        let b = this.beatPattern.clone()
        b.moodChip = p.moodChip.clone()

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
            let e = this.moodChip.excitement + (Math.round(Math.sqrt(this.moodChip.excitement)) * (i / 2 - 4))
            e = bound(e, 1, 10)

            this.arrangements.map((p) => {
                
                    p.playPart(e, songPartIndex, chord, i, now, time, spacing, progressionMainChord, song)
                 
            })

            time += 2
        })

        return time
    }

    print(scaleNotes, scaleChords) {
        let ret = "<div class='song-part'>"

        ret += "<h2>" + this.kind + "</h2>"

        ret += this.moodChip.print()
        ret += this.coreProgression.print(scaleNotes, scaleChords)

        ret += "<h3>Main Pattern</h3>"
        ret += this.beatPattern.print()

        ret += "<h3>Arrangements</h3>"
        ret += "<div class='arrangements'>"
        this.arrangements.map((p) => ret += "<div class='arrangement'>" + p.name + "<br />" + p.beatPattern.print() + "</div>")


        ret += "</div>"
        ret += "</div>"
        return ret
    }


}