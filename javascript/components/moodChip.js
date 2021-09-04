/*

    MoodChip
    =====
    Stores the information for the "mood" of the song- one of the primary ways to generate variety in songs.
    
    this.resonance- affects how close to root the notes are, how "clean" the song is
    this.tension- affects the ups/downs in tension
    this.repetition- how similar the whole song is to itself
    this.excitement- affects how many notes & how powerful they are
    this.spread- affects how close to the beat notes are
    

    TERMINOLOGY & EXAMPLES
    ======
    field_name is one of the above; resonance, tension, repetition, etc.
    valid_amount is int[1-10]
    field_array is an array of field_names

    FUNCTIONS
    =====
    --Base
    function clone()- creates a copy and returns it
    method set(field_name, valid_amount)
    method increase(field_name, valid_amount)

    --Special Altering
    method scale(field_name, value: int[-10-10], intensity=5: valid_amount, scale=10: int[1, 10, 100]) => Scales a field (up and/or down) based on the incoming value.

    --Generation
    function weightFieldsRandomTrueFalse(field_array, average: valid_amount)- Takes in 1 array of fields, and returns a true/false based on itself
    function compareFieldsRandomTrueFalse(field_array, field_array)- Takes in 2 arrays of fields, and returns a true or false based on the weight of the settings.

    --Printing
    function print() - a bad text printout of the settings


*/

class MoodChip {
    constructor(settings = {}) {
        this.resonance = settings.resonance || 5
        this.tension = settings.tension || 5
        this.repetition = settings.repetition || 5
        this.excitement = settings.excitement || 5
        this.spread = settings.spread || 5
    }

    clone() {
        return new MoodChip({
            resonance: this.resonance,
            tension: this.tension,
            repetition: this.repetition,
            excitement: this.excitement,
            spread: this.spread,
        })
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
    // scale('resonance', 5)- should increase by a fair amount
    // scale('resonance', 10, 10)- should increase by a lot
    
    // NEEDS BETTER DEFINING- BAD ALGORITHM
    scale(field, value, intensity = 5, scale = 10) {
        value = bound(value, -1 * scale, scale)
        //Normalizes value between 0-2. Anything less than half will decrease, more will increase
        value = (value / scale) + 1
        intensity = (intensity / 10) + 1

        let newValue = this[field] * value * intensity

        this.set(field, newValue)
    }

    //Takes in an array of fields, and returns a true or false based on the weight of the settings.
    //Example- ['resonance', 'tension'] - average 5
    //               8           2            
    //                      10                           
    //                                 10:10 => 50/50 chance true or false  
    //
    //Example- ['resonance', 'tension'] - average 8
    //               8           2            
    //                      10                           
    //                                 10:16 => 38/62 chance true or false  
    weightFieldsRandomTrueFalse(fieldArray, average = 5) {
        let total1 = 0
        let total2 = 0

        fieldArray.map((field) => {
            total1 += this[field]
            total2 += average
        })
        return weightedTrueFalse( total1, total2 )
    }

    //Takes in 2 arrays of fields, and returns a true or false based on the weight of the settings.
    //Example- ['resonance', 'tension'], ['excitement', 'excitement']
    //               8           4             6              6
    //                      12                         12   
    //                                 12:12 => 50/50 chance true or false  
    compareFieldsRandomTrueFalse(fieldArray1, fieldArray2) {
        let total1 = 0
        let total2 = 0

        fieldArray1.map((field) => total1 += this[field])
        fieldArray2.map((field) => total2 += this[field])

        return weightedTrueFalse(total1, total2)
    }

    print() {
        let ret = "<span class='mood-chip'>"
        ret += "<i class='mood-chip-name'>C</i>"
        ret += "<span class='mood-chip-info'>"
        ret += `<span>[Res: ${this.resonance}]</span><br />`
        ret += `<span>[Ten: ${this.tension}]</span><br />`
        ret += `<span>[Rep: ${this.repetition}]</span><br />`
        ret += `<span>[Exi: ${this.excitement}]</span><br />`
        ret += `<span>[Spr: ${this.spread}]</span><br />`
        ret += "</span>"
        ret += "</span>"
        return ret
    }

}