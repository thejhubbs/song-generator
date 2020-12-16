//resonance, tension, repetition
let positionMap = [
    [90, 10, 0],
    [20, 20, 60],
    [40, 20, 40],
    [0, 80, 20]
]

class Progression {
    constructor(resonance, tension, repetition, chords=null) {
        this.chords = chords
        this.resonance = resonance > 10 ? 10 : (resonance < 0 ? 0 : resonance)
        this.tension  = tension > 10 ? 10 : (tension < 0 ? 0 : tension)
        this.repetition= repetition > 10 ? 10 : (repetition < 0 ? 0 : repetition)

        if(chords) { 
            statusElement.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;Cloning Chord Progression<br />`
            this.copyProgression() 
        }
        else { 
            statusElement.innerHTML += `&nbsp;&nbsp;Creating Chord Progression<br />`
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
        this.chords = this.chords.map( (c) => c.duplicateChord() )
    }

    generateChord(position) {
        statusElement.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Generating Chord<br />`
        let positionWeights = positionMap[position-1]
        let settings = [this.resonance, this.tension, this.repetition]
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

        choice = choice.chord.duplicateChord()

        return choice
    }

    //returns an integer 0, 1, or 2 weighted on resonance
    calculateResonanceFunction() {
        let resonanceMap = [85, 15, 0].map((v) => v ** ( (this.resonance-5) / 2 ))

        let ret = normalizeAndGetRandomFromMap(resonanceMap)
        return ret
    }

    calculateResonanceFlavor() {
        let resonanceMap = [85, 15, 0].map((v) => v ** ((this.resonance - 5) / 2) )

        let ret = normalizeAndGetRandomFromMap(resonanceMap) 
        return ret
    }

    //returns an integer 0, 1, or 2 weighted on tension for function
    calculateTensionFunction() {
        let tFuMap = [10, 30, 60].map((v) => v ** ((this.tension-5) / 2) )
        let ret = normalizeAndGetRandomFromMap(tFuMap)
        return ret
    }

    //returns an integer 0, 1, or 2 weighted on tension for flavor
    calculateTensionFlavor() {
        let tFlMap = [50, 30, 20].map((v) => v ** ((this.tension-5) / 2) )
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
        return new Progression(this.resonance, this.tension, this.repetition, this.chords)
    }

    regenerate(resonance = 0, tension = 0, repetition = 0, influence = 5) {
        statusElement.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Altering Chord Progression<br />`
        this.resonance += (1+(2*influence/10)) * resonance
        this.tension += (1+(2*influence/10)) * tension
        this.repetition += (1+(2*influence/10)) * repetition

        let totalSetting = this.resonance + this.tension + this.repetition

        //first chord
        if(this.resonance > this.tension) {
            this.chords[0].alterFuncFlavor(-1, -1)
        } else {
            this.chords[0].alterFuncFlavor(0, 1)
        }

        //second chord
        if( rTF( ( this.resonance / 10 ) * 100 )  ) {
            this.chords[1].alterFuncFlavor(-1, 0)
        }
        if( rTF( ( this.tension +  (5 - this.repetition) / 15 ) * 100 ) ) {
            this.chords[1].alterFuncFlavor(0, 1)
        }

        //third chord
        if( rTF( ( this.resonance / 10 ) * 100 ) ) {
            this.chords[2].alterFuncFlavor(0, -1)
        }
        if( rTF( ( this.tension +  (5 - this.repetition) / 15 ) * 100 ) ) {
            this.chords[2].alterFuncFlavor(-1, 1)
        }


        //fourth chord
        if( rTF( ( this.resonance / 10 ) * 100 ) ) {
            this.chords[3].alterFuncFlavor(0, -1)
        }
        if( rTF( ( this.tension + (5 - this.repetition) / 10 ) * 100 ) ) {
            this.chords[3].alterFuncFlavor(1, 1)
        }

    }

}