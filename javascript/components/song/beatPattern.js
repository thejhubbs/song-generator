import beatPatternGeneration from '../../generations/beatPattern.js'
import random from '../../settings/random.js'

export default class BeatPattern {
    constructor(moodChip, beatStyle='beatmelody', beat = null) {
        this.moodChip = moodChip.clone()
        this.beatStyle = beatStyle
        this.excitement = moodChip.excitement
        this.repetition = moodChip.repetition
        if (beat) {
            this.mainBeat = beat.sort((a, b) => a.position - b.position)
        }
        else {
            this.randomizeBeat()
        }
    }

    randomizeBeat() {
        this.mainBeat = []
        let randomMap = beatPatternGeneration.generateBeatMap(this.beatStyle)

        let weightKey = {}
        randomMap.map((r) => weightKey[String(r)] ? weightKey[String(r)] += 1 : weightKey[String(r)] = 1)
        let val = Math.sqrt(this.repetition) / 3
        Object.entries(weightKey).map(([notePos, weight]) => weightKey[String(notePos)] = Math.round(weight ** val))

        let simpleWeightArray = Object.values(weightKey)
        let weightKeys = Object.keys(weightKey)



        let amount = 2 + (( this.moodChip.excitement + 1) / 2 )

        for (let i = 0; i < amount; i++) {
            let val = random.normalizeAndGetRandomFromMap(simpleWeightArray)
            let weight = Math.ceil( simpleWeightArray[val] * (amount - i) * ((11 - this.excitement)**1.5) / 10 )
            let position = weightKeys[val]
            let copy = false

            this.mainBeat.map((b) => b.position === Number.parseInt(position) ? copy = true : null)

            if (!copy) {
                this.mainBeat.push({ position: Number.parseInt(position), weight })
            }
        }

        this.mainBeat = this.mainBeat.sort((a, b) => a.position - b.position)
        if( !this.testBeat() ) { console.log("ERROR in song.beatPattern.randomizeBeat- invalid beat", this)}
    }

    changeBeatStyle(beatStyle) {
        if(this.beatStyle !== beatStyle) {
            switch(beatStyle) {

            }
        }
    }

    cloneAlter(excitement) {
        if( !this.testBeat() ) { console.log("ERROR in song.beatPattern.cloneAlter- invalid beat", this)}

        if(typeof excitement !== 'number' || excitement < -10 || excitement > 10) {
            console.log('ERROR in song.beatPattern.cloneAlter- invalid excitement- ', typeof excitement, excitement)
        }
        let clone = new BeatPattern(this.moodChip, this.beatStyle, this.mainBeat)

        let newBeat = clone.mainBeat.map((beatItem) => {
            let newWeight = beatPatternGeneration.alterWeight(this.excitement, excitement, beatItem.weight)
            if(newWeight === 0) { return null }
            else { return { ...beatItem, weight: newWeight } }
        })

        //newBeat = newBeat.filter( (beatItem) => { return beatItem.weight > differenceContrast**2} )

        clone.mainBeat = newBeat.filter( (i) => !!i).sort((a, b) => a.position - b.position)
        
        if ( !clone.testBeat() ) { console.log("ERROR in song.beatPattern.cloneAlter- invalid beat", clone)}

        return clone
    }

    cloneRandomize(resonance) {
        if( !this.testBeat() ) { console.log("ERROR in song.beatPattern.cloneRandomize- invalid beat", this)}
        let influence = new BeatPattern(this.moodChip, this.beatStyle)

        let similarity = resonance / 12
        let newAmount = Math.round((influence.mainBeat.length + this.mainBeat.length) / 2)

        let amountToTakeFromOld = Math.round(similarity * newAmount)
        let amountFromNew = newAmount - amountToTakeFromOld

        let newBeat = [...this.mainBeat.sort((a, b) => b.weight - a.weight)]
        newBeat.splice(amountToTakeFromOld)

        let influenceBeat = influence.mainBeat.sort((a, b) => a.weight - b.weight)
        influenceBeat = influenceBeat.splice(0, amountFromNew)


        influenceBeat.map((iB) => {
            let copy = false

            newBeat.map((b) => b.position === iB.position ? copy = true : null)

            if (!copy) {
                newBeat.push(iB)
            }
        })

        influence.mainBeat = newBeat.sort((a, b) => a.position - b.position)

        if ( !influence.testBeat() ) { console.log("ERROR in song.beatPattern.cloneRandomize- invalid beat", influence)}

        return influence
    }

    clone() {
        if( !this.testBeat() ) { console.log("ERROR in song.beatPattern.clone- invalid beat", this)}

        let newBeat = new BeatPattern(this.moodChip, this.beatStyle, this.mainBeat)
        if ( !newBeat.testBeat() ) { console.log("ERROR in song.beatPattern.clone- invalid beat", newBeat)}

        return newBeat
    }

    print = () => {

        let ret = '<span>'
        ret += this.moodChip.print()

        ret += " / <span class='beat-pattern'>"
        ret += "<i class='beat-pattern-name'>B</i>"
        ret += "<span class='beat-pattern-info' style='font-family: courier;'>"
       
        ret += this.printMainBeat()

        ret += "<br />"
        ret += "["
        for (var i = 0; i < 32; i++) {
            let char = " "

            if (i % 2 === 0) { char = "." }
            if (i % 4 === 0) { char = "-" }
            if (i % 8 === 0) { char = "x" }
            if (i % 16 === 0) { char = "0" }
            if (i === 0) { char = "!" }

            ret += char
        }
        ret += "]"

        ret += "</span>"
        ret += "</span>"
        ret += "</span>"

        return ret
    }

    printMainBeat = () => {
        let arr = []
        this.mainBeat.map((b) => arr[b.position] = b.weight)
        let ret = "["
        for (var i = 0; i < 32; i++) {
            if (arr[i]) { 
                let v = arr[i]
                if (v >= 10) {
                    ret+= `<span style='text-decoration:underline'>${v%10}</span>`
                } else {
                    ret += arr[i] 
                }
            }
            else { ret += '-' }
        }
        ret += "]"
        
        return ret
    }

    highestWeight () {
        let highestWeight = this.mainBeat.sort((a, b) => b.weight - a.weight)[0]
        highestWeight = highestWeight ? highestWeight.weight : 1

        if(typeof highestWeight !== 'number' || highestWeight <= 0) {
            console.log("ERROR in song.beatPattern- invalid weight, should be number >= 1", 
            "\nhighestWeight: ", typeof highestWeight, highestWeight, 
            "\nMain Beat:", this.mainBeat)
        }

        return highestWeight
    }


    testBeat() {
        //this.moodChip.testChip()

        let checks = this.mainBeat.map( (beatItem) => {
            if(typeof beatItem.position !== 'number' || beatItem.position < 0){
                console.log("ERROR in song.testBeat- invalid position, should be number >= 0", 
                "\nhighestWeight: ", typeof beatItem.position, beatItem.position, 
                "\nMain Beat:", this.mainBeat)
                return false
            }
            
            if(typeof beatItem.weight !== 'number' || beatItem.weight <= 0){
                console.log("ERROR in song.testBeat- invalid weight, should be number >= 1", 
                "\nhighestWeight: ", typeof beatItem.weight, beatItem.weight, 
                "\nMain Beat:", this.mainBeat)
                return false
            }
            return true
        })
        
        if(checks.filter( (i) => !i).length > 0) { return false }

        return true
    }



}