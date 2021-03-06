class BeatPattern {
    constructor(excitement, repetition, beat = null) {
        this.excitement = excitement <= 0 ? 1 : excitement
        this.repetition = repetition
        if(beat) { 
            this.mainBeat = beat 
            statusElement.innerHTML += `&nbsp;&nbsp;&nbsp;&nbsp;Cloning Beat Pattern<br />`
        }
        else { 
            statusElement.innerHTML += `&nbsp;&nbsp;Creating Beat Pattern<br />`
            this.randomizeBeat() 
        }
    }

    randomizeBeat() {
        this.mainBeat = []
        let randomMap = []
        for (let i = 0; i < 5; i++) {
            let val = 2**(i+1) 
            let subtotal = 0
            while(subtotal < 32) {
                randomMap.push(subtotal)
                subtotal+=val
            }
        }

        let weightKey = {}
        randomMap.map( (r) => weightKey[String(r)] ? weightKey[String(r)] += 1 : weightKey[String(r)] = 1)
        let val = Math.sqrt(this.repetition)-1
        Object.entries(weightKey).map( ([notePos, weight]) => weightKey[String(notePos)] = Math.round(weight**val) )

        let simpleWeightArray = Object.values(weightKey)
        let weightKeys = Object.keys(weightKey)

        let amount = (this.excitement+2)*2
        
        for (let i = 0; i < amount; i++) {
            let val = normalizeAndGetRandomFromMap(simpleWeightArray)
            let weight = simpleWeightArray[val] * (amount - i) * ((11 - this.excitement)**1,5)
            let position = weightKeys[val]
            let copy = false
            
            this.mainBeat.map( (b) => b.position === position ? copy = true : null) 
            
            if(!copy) {
                this.mainBeat.push({ position, weight }) 
            }
        }

    }

    cloneAlter(excitement) {
        let clone = new BeatPattern(excitement, this.repetition, this.mainBeat)

        let scaleContrast = excitement / this.excitement
        let differenceContrast = excitement - this.excitement

        let newBeat = clone.mainBeat.map( (beatItem) => {
            return { ...beatItem, weight: Math.round(beatItem.weight * scaleContrast) }
        })

        newBeat = newBeat.filter( (beatItem) => { return beatItem.weight > differenceContrast**2} )
        
        clone.mainBeat = newBeat

            
        return clone
    }

}