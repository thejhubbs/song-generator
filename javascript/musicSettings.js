class MusicSetting {
    /*
        Resonance- affects how close to root the notes are
        Tension- 
        Repetition- how similar the whole song is to itself
        Excitement- affects how many notes & how powerful they are
        Spread- affects how close to the beat notes are


    */
    constructor(settings) {
        this.resonance = settings.resonance
        this.tension = settings.tension
        this.repetition = settings.repetition
        this.excitement = settings.excitement
        this.spread = settings.spread
    }

    //Bounds a field to 1<=10 and sets it.
    set(field, value) {
        value = bound(value, 1, 10)
        this[field] = value
    }

    //Increases (or decreases for negative) a field and bounds it.
    increase(field, value) {
        this.set(field, this[field] + value)
    }

    //Scales a field (up and/or down) based on the incoming value.
    //field is modified by value
    //Intensity determines how much so
    //Scale tells how to interpret the value [1 (0-1), 10(0-10), 100(0-100)]
    scale(field, value, intensity = 5, scale = 10) {
        value = bound(value, -1 * scale, scale)
        //Normalizes value between 0-2. Anything less than half will decrease, more will increase
        value = (value / scale) + 1
        intensity = (intensity / 10) + 1

        let newValue = this[field] * value * intensity

        this.set(field, newValue)
    }

    //Takes in 2 arrays of fields, and returns a true or false based on the weight of the settings.
    //Example- ['resonance', 'tension'], ['excitement', 'excitement']
    //               8           4             6              6
    //                      12                         12   
    //                                 12:12 => 50/50 chance true or false  
    compareFieldsRTF(fieldArray1, fieldArray2) {
        let total1 = 0
        let total2 = 0

        fieldArray1.map((field) => total1 += this[field])
        fieldArray2.map((field) => total2 += this[field])

        return rTFScale(total1, total2)
    }

    weightedFieldsRTF(fieldArray) {
        let total1 = 0
        let total2 = 0

        fieldArray.map((field) => {
            total1 += this[field]
            total2 += 10
        })
        rTFScale(total1, total2)
    }

    clone() {
        return new MusicSetting({
            resonance: this.resonance,
            tension: this.tension,
            repetition: this.repetition,
            excitement: this.excitement,
            spread: this.spread,
        })
    }

    print() {
        let ret = "<div><b>Music Settings</b> "
        ret += `<span>[Res: ${this.resonance}]</span>`
        ret += `<span>[Ten: ${this.tension}]</span>`
        ret += `<span>[Rep: ${this.repetition}]</span>`
        ret += `<span>[Exi: ${this.excitement}]</span>`
        ret += `<span>[Spr: ${this.spread}]</span>`
        ret += "</div>"
        return ret
    }

}