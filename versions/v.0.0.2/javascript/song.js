
const comp = new Tone.Compressor(-30, 5).toDestination()

const highFilter = new Tone.EQ3(-100, -50, -10).connect(comp);
const midFilter = new Tone.EQ3(-1, -2, -10).connect(comp);
const lowFilter = new Tone.EQ3(2, -40, -100).connect(comp);
const hatFilter = new Tone.EQ3(-100, -100, 2).connect(comp);
const snareFilter = new Tone.EQ3(2, 0, -100).connect(comp);

const voxFilter = new Tone.EQ3(5, 2, 5).connect(comp);
const vibratoFx = new Tone.Vibrato(5, .1).connect(voxFilter);
const chorusFx = new Tone.Chorus(4, 2.5, 0.5).connect(vibratoFx);

const hChFx = new Tone.Chorus(4, 2.5, 0.5).connect(midFilter);

const fxFilter = new Tone.EQ3(-100, -20, 2).connect(comp);
const reverbFx = new Tone.Reverb(1.5).connect(fxFilter);

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


        this.harmonySynth = new Instrument(Tone.Synth, hChFx, 0)
        this.melodySynth = new Instrument(Tone.Synth, highFilter, 0)
        this.bassSynth = new Instrument(Tone.Synth, lowFilter, 2)
        this.voxSynth = new Instrument(Tone.Synth, chorusFx, -5)
        this.fxSynth = new Instrument(Tone.Synth, reverbFx, 0)
        
        this.kickDrum = new Instrument(Tone.MembraneSynth, lowFilter, -8)
        this.snareDrum = new Instrument(Tone.MembraneSynth, snareFilter, -10)
        this.hatDrum = new Instrument(Tone.MetalSynth, hatFilter, -25)

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

        chorus.regenerate( this.resonance/3 , -1/3 * this.resonance, 2, this.excitement)
        verse.regenerate( 0, -1/3 * this.repetition, -1/3 * this.tension, this.excitement)

        let bridge = verse.clone()
        bridge.regenerate(-1/3 * this.tension, this.tension/3, 0, this.excitement)

        let preChorus = chorus.clone()
        preChorus.regenerate(2, 0, 2, this.excitement)

        let c1 = new SongPart(chorus, this.excitement + 2, 'chorus')
        let c2 = c1.secondChorus()
        let c3 = c1.thirdChorus()

        let v = new SongPart(verse, this.excitement, 'verse')
        let v1 = v.firstVerse()
        let v1a = v.firstVersePart2()
        let v2 = v.secondVerse()

        let b = new SongPart(bridge, this.excitement - 2, 'bridge')

        let pc = new SongPart(preChorus, this.excitement + 4, 'prechorus')
        let prechorus = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.tension + this.resonance, 30 - (this.repetition + this.tension + this.resonance)])]

        let chorusIntro = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.resonance, this.tension * 2])]
        if (chorusIntro) {
            this.songParts.push(c1)
        }


        let doubleFirstVerse = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.tension, this.resonance * 2])]
        if (doubleFirstVerse) {
            this.songParts.push(v1)
        }
        this.songParts.push(v1a)

        if (prechorus) { this.songParts.push(pc) }
        this.songParts.push(c1)

        this.songParts.push(v2)

        if (prechorus) { this.songParts.push(pc) }

        let doubleSecondChorus = [true, false][normalizeAndGetRandomFromMap([this.repetition + this.resonance, this.tension * 2])]
        if (doubleSecondChorus) {
            this.songParts.push(c1)
        }

        let insertBridge = [true, false][normalizeAndGetRandomFromMap([this.tension + this.resonance, this.repetition])]
        if (insertBridge) {
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
            let chordString = sp.retrieveChords().map((c) => c.printName(this.scaleNotes, this.scaleChords)).join(' ')
            return `${sp.kind}<br />${chordString}<br />`
        })
    }

    songNoteArray() {
        let songArray = []
        this.songParts.map((sp) => songArray.push(
            [sp.retrieveChords()]
        ))
        return songArray
    }

    play() {
        const now = Tone.now()
        let time = 0
        let spacing = 8

        this.songParts.map(async (songPart, songPartIndex) => {

            time = songPart.playPart(now, time, spacing, songPartIndex, this)
        })

    }

}