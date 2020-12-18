class Song {
    constructor(key, mode, musicSettings) {
        this.key = key
        this.mode = mode
        this.musicSettings = musicSettings
        this.mainProgression = new Progression(musicSettings)
        this.songParts = []

        this.setModeAndKey()
        this.generateSong()
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
    }

    generateSong() {
        let chorus = this.mainProgression.clone()
        let verse = chorus.clone()

        let chorusSettings = this.musicSettings.clone()
        chorusSettings.scale('resonance', 1, chorusSettings.resonance)
        chorusSettings.scale('repetition', 1, chorusSettings.resonance)
        chorus.regenerate( chorusSettings )

        let verseSettings = this.musicSettings.clone()
        verseSettings.scale('tension', 1, chorusSettings.tension)
        verseSettings.scale('excitement', -4, chorusSettings.tension)
        verse.regenerate( verseSettings )

        let bridge = verse.clone()
        let bridgeSettings = this.musicSettings.clone()
        bridgeSettings.scale('tension', 1, chorusSettings.excitement)
        bridgeSettings.scale('excitement', -4, chorusSettings.excitement)
        bridge.regenerate( bridge.musicSettings, 'bridge' )

        let preChorus = chorus.clone()
        preChorus.regenerate( preChorus.musicSettings)

        let c1 = new SongPart(chorus, 'chorus')
        let c2 = c1.cloneAlter(2)
        let c3 = c1.cloneAlter(4, true)

        let v = new SongPart(verse, 'verse')
        let v1 = v.cloneAlter(-1)
        let v2 = v.cloneAlter(1)

        let b = new SongPart(bridge, 'bridge')

        let pc = new SongPart(preChorus, 'prechorus')
        let prechorus = this.musicSettings.weightedFieldsRTF(['tension', 'repetition', 'resonance'])

        let chorusIntro = this.musicSettings.compareFieldsRTF(['resonance', 'repetition', 'excitement'], ['tension', 'tension', 'tension'])
        if (chorusIntro) {
            this.songParts.push(c1)
        }
        else {
            let doubleFirstVerse = this.musicSettings.compareFieldsRTF(['tension', 'repetition'], ['resonance', 'excitement'])
            if (doubleFirstVerse) {
                
                let v1a = v.cloneAlter(-3)
                this.songParts.push(v1a)
            }
        }  
        this.songParts.push(v1)

        if (prechorus) { this.songParts.push(pc) }
        this.songParts.push(c1)

        this.songParts.push(v2)

        if (prechorus) { this.songParts.push(pc) }

        let doubleSecondChorus = this.musicSettings.compareFieldsRTF(['resonance', 'repetition'], ['tension', 'tension'])
        if (doubleSecondChorus) {
            this.songParts.push(c1)
        }

        let insertBridge = this.musicSettings.compareFieldsRTF(['resonance', 'excitement', 'tension'], ['repetition', 'repetition'])
        if (insertBridge) {
            let lastChord = c2.getChord(1, 4)
            lastChord.alterFuncFlavor(1, 1)
            this.songParts.push(c2)
            this.songParts.push(b)
        } else {
            this.songParts.push(c2)
            this.songParts.push(v2)
        }


        this.songParts.push(c3)


    }

    printSong() {
        let ret = ""
        ret += "<h2>Song Info</h2>"
        ret += `<p><b>Key:</b> ${['', 'C', 'D', 'E', 'F', 'G', 'A', 'B'][this.key]}</p>`
        ret += `<p><b>Mode:</b> ${this.key}</p>`
        
        ret += this.musicSettings.print()
        ret += this.mainProgression.print(this.scaleNotes, this.scaleChords)

        this.songParts.map((sp) => {
            ret += sp.print(this.scaleNotes, this.scaleChords)
        })
        return ret
    }

    songNoteArray() {
        let songArray = []
        this.songParts.map((sp) => songArray.push(
            [sp.retrieveChords()]
        ))
        return songArray
    }

    play() {
        let now = Tone.now()
        let time = 0
        let spacing = 16


        this.songParts.map(async (songPart, songPartIndex) => {
            time = songPart.playPart(now, time, spacing, songPartIndex, this)
        })

    }

}