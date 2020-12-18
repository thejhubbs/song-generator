class BeatPattern {
    constructor(musicSettings, beat = null) {
        this.musicSettings = musicSettings.clone()
        this.excitement = musicSettings.excitement
        this.repetition = musicSettings.repetition
        if(beat) { 
            this.mainBeat = beat 
        }
        else { 
            this.randomizeBeat() 
        }
    }

    randomizeBeat() {
        this.mainBeat = []
        let randomMap = []
        for (let i = 1; i < 5; i++) {
            let val = 2**(i+1) 
            let subtotal = 0
            while(subtotal < 32) {
                randomMap.push(subtotal)
                subtotal+=val
            }
        }

        let weightKey = {}
        randomMap.map( (r) => weightKey[String(r)] ? weightKey[String(r)] += 1 : weightKey[String(r)] = 1)
        let val = Math.sqrt(this.repetition) / 3
        Object.entries(weightKey).map( ([notePos, weight]) => weightKey[String(notePos)] = Math.round(weight**val) )

        let simpleWeightArray = Object.values(weightKey)
        let weightKeys = Object.keys(weightKey)
        

        let amount = (this.excitement*2)
        
        for (let i = 0; i < amount; i++) {
            let val = normalizeAndGetRandomFromMap(simpleWeightArray)
            let weight = simpleWeightArray[val] //* (amount - i) * ((11 - this.excitement)**1.5)
            let position = weightKeys[val]
            let copy = false
            
            this.mainBeat.map( (b) => b.position === position ? copy = true : null) 
            
            if(!copy) {
                this.mainBeat.push({ position, weight }) 
            }
        }

    }

    cloneAlter(excitement) {
        let clone = new BeatPattern(this.musicSettings, this.mainBeat)

        let scaleContrast = excitement / this.excitement
        let differenceContrast = excitement - this.excitement

        let newBeat = clone.mainBeat.map( (beatItem) => {
            return { ...beatItem, weight: Math.round(beatItem.weight * scaleContrast) }
        })

        //newBeat = newBeat.filter( (beatItem) => { return beatItem.weight > differenceContrast**2} )

        clone.mainBeat = newBeat

        

        return clone
    }

    cloneRandomize(resonance) {
        let influence = new BeatPattern(this.musicSettings)


        let similarity = resonance / 12
        let newAmount = Math.round( (influence.mainBeat.length + this.mainBeat.length) / 2)

        let amountToTakeFromOld = Math.round(similarity * newAmount)
        let amountFromNew = newAmount - amountToTakeFromOld

        let newBeat = [ ...this.mainBeat.sort((a,b) => b.weight - a.weight) ]
        newBeat.splice(amountToTakeFromOld)

        let influenceBeat = influence.mainBeat.sort((a,b) => a.weight - b.weight)
        influenceBeat = influenceBeat.splice(0, amountFromNew)

        influence.mainBeat = [...newBeat, ...influenceBeat] 

        return influence
    }

    clone() {
        return new BeatPattern(this.musicSettings, this.mainBeat)
    }

    print(){
        let ret = "<span>"
        ret += this.musicSettings.print()

        //ret += "[" + this.mainBeat.map((b) => b.position + "/" + b.weight).join(", ") + "]"
        let arr = []
        this.mainBeat.map((b) => arr[b.position] = b.weight)

        ret += "["
        for(var i = 0; i < 32; i++) {
            if(arr[i]) { ret += arr[i] }
            else { ret += '-'}
        }
        ret += "]"

        ret += "</span>"
        return ret
    }

}