//resonance, tension, repetition
let positionMap = [
    [90, 10, 0],
    [20, 20, 60],
    [40, 20, 40],
    [0, 80, 20]
]

class Progression {
    constructor(musicSettings, chords=null) {
        this.chords = chords
        this.musicSettings = musicSettings.clone()

        if(chords) { 
            this.copyProgression() 
        }
        else { 
            this.createProgression() 
        }
    }

    createProgression() {
        this.chords = []
        this.chords[0] = this.generateChord(1)
        this.chords[1] = this.generateChord(2)
        this.chords[2] = this.generateChord(3)
        this.chords[3] = this.generateChord(4) 
    }

    copyProgression() {
        this.chords = this.chords.map( (c) => c.clone() )
    }

    generateChord(position) {
        let positionWeights = positionMap[position-1]
        let settings = [this.musicSettings.resonance, this.musicSettings.tension, this.musicSettings.repetition]
        let temp = []
        let total = 0

        positionWeights.map((p, i) => {
            temp[i] = p * settings[i]
            total += temp[i]
        })

        positionWeights = temp.map((p, i) => {
            return Math.floor((p / total) * 100)
        })

        let choice = null

        let options = [
            findChordByFuncFlavor(this.calculateResonanceFunction(), this.calculateResonanceFlavor()),
            findChordByFuncFlavor(this.calculateTensionFunction(), this.calculateTensionFlavor()),
            findChordByFuncFlavor(this.calculateRepeat(position), this.calculateRepeat(position))
        ]

        choice = options[getRandomFromMap(positionWeights)]

        choice = choice.chord.clone()

        return choice
    }

    //returns an integer 0, 1, or 2 weighted on resonance
    calculateResonanceFunction() {
        let resonanceMap = [85, 15, 0].map((v) => v ** ( (this.musicSettings.resonance-5) / 2 ))

        let ret = normalizeAndGetRandomFromMap(resonanceMap)
        return ret
    }

    calculateResonanceFlavor() {
        let resonanceMap = [85, 15, 0].map((v) => v ** ((this.musicSettings.resonance - 5) / 2) )

        let ret = normalizeAndGetRandomFromMap(resonanceMap) 
        return ret
    }

    //returns an integer 0, 1, or 2 weighted on tension for function
    calculateTensionFunction() {
        let tFuMap = [10, 30, 60].map((v) => v ** ((this.musicSettings.tension-5) / 2) )
        let ret = normalizeAndGetRandomFromMap(tFuMap)
        return ret
    }

    //returns an integer 0, 1, or 2 weighted on tension for flavor
    calculateTensionFlavor() {
        let tFlMap = [50, 30, 20].map((v) => v ** ((this.musicSettings.tension-5) / 2) )
        let ret = normalizeAndGetRandomFromMap(tFlMap)
        return ret
    }

    calculateRepeat(position) {
        switch (position) {
            case 1:
                return 0
            case 2:
                return this.chords[0].func
            case 3:
                return rTF(85) ? this.chords[0].func : this.chords[1].func
            case 4:
                return this.chords[1].func
        }
    }

    printChordNames(scaleNotes, scaleChords) {
        return [this.chords[0].printName(scaleNotes, scaleChords), 
        this.chords[1].printName(scaleNotes, scaleChords),
        this.chords[2].printName(scaleNotes, scaleChords),
        this.chords[3].printName(scaleNotes, scaleChords)].join(' ')
    }

    getChordNotes(scaleNotes, scaleChords) {
        return [ this.chords[0].printNotes(scaleNotes, scaleChords),
        this.chords[1].printNotes(scaleNotes, scaleChords),
        this.chords[2].printNotes(scaleNotes, scaleChords),
        this.chords[3].printNotes(scaleNotes, scaleChords) ]
    }

    clone() {
        return new Progression(this.musicSettings, this.chords)
    }

    regenerate(musicSettings) {
        this.musicSettings = musicSettings.clone()

        //first chord
        if(this.musicSettings.resonance > this.musicSettings.tension) {
            this.chords[0].alterFuncFlavor(-1, -1)
        } else {
            this.chords[0].alterFuncFlavor(0, 1)
        }

        //second chord
        if( rTF( ( this.musicSettings.resonance / 12 ) * 100 )  ) {
            this.chords[1].alterFuncFlavor(-1, 0)
        }
        if( rTF( ( this.musicSettings.tension +  (5 - this.musicSettings.repetition) / 15 ) * 10 ) ) {
            this.chords[1].alterFuncFlavor(0, 1)
        }

        //third chord
        if( rTF( ( this.musicSettings.resonance / 12 ) * 100 ) ) {
            this.chords[2].alterFuncFlavor(0, -1)
        }
        if( rTF( ( this.musicSettings.tension +  (5 - this.musicSettings.repetition) / 15 ) * 10 ) ) {
            this.chords[2].alterFuncFlavor(-1, 1)
        }

        //fourth chord
        if( rTF( ( this.musicSettings.resonance / 12 ) * 100 ) ) {
            this.chords[3].alterFuncFlavor(0, -1)
        }
        if( rTF( ( this.musicSettings.tension + (5 - this.repetition) / 10 ) * 10 ) ) {
            this.chords[3].alterFuncFlavor(1, 1)
        }
        console.log(( this.musicSettings.tension*this.musicSettings.tension / 125 ) * 100)
        if( rTF( ( this.musicSettings.tension*this.musicSettings.tension / 125 ) * 100 ) ) {
            this.chords[3].addOneNote([7, 9, 11, 13])
        }
        if( rTF( ( this.musicSettings.tension*this.musicSettings.tension / 150 ) * 100 ) ) {
            this.chords[3].addOneNote([7, 9, 11, 13])
        }

        //bass & repeat stuff
        if(chordIsEqual(this.chords[0], this.chords[1])){
            this.chords[1].changeNote(3, 4)
        }
        if(chordIsEqual(this.chords[0], this.chords[2])){
            this.chords[2].changeBass( this.chords[2].notes[1] )
        }
        if(chordIsEqual(this.chords[0], this.chords[3])){
            this.chords[3].addOneNote([7, 9, 11, 13])
        }
        if(chordIsEqual(this.chords[1], this.chords[2])){
            this.chords[2].changeBass( this.chords[2].bass + 1 )
        }
        if(chordIsEqual(this.chords[1], this.chords[3])){
            this.chords[3].addOneNote([7, 9, 11, 13])
            this.chords[3].changeBass( this.chords[3].notes[1] )
        }
        if(chordIsEqual(this.chords[2], this.chords[3])){
            this.chords[3].changeNote(3, 4)
        }
    }

    print(scaleNotes, scaleChords) {
        let ret = "<div>"
        ret += "<b>Progression</b> "
        ret += this.printChordNames(scaleNotes, scaleChords)
        ret += "</div>"
        return ret
    }

}

function chordIsEqual(c1, c2) {
    return c1.func === c2.func && c1.flavor === c2.flavor
}