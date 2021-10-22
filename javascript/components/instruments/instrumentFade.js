import random from '../../settings/random.js'

export default class InstrumentFade {
    constructor(settings) {
        let instrumentWeight = settings.instrumentWeight

        this.instrumentSongPartOrderArray = []
        instrumentWeight.instrumentSongParts.map((i) => {
            this.instrumentSongPartOrderArray.push({ name: i.name, weight: i.weight * Math.random() })
        })
        this.instrumentSongPartOrderArray = this.instrumentSongPartOrderArray.sort((a, b) => b.weight - a.weight)


        this.instrumentSongPartOrderKindArray = []
        instrumentWeight.instrumentSongParts.map((i) => {

            i.parts.map((p) => {
                this.instrumentSongPartOrderKindArray.push({ part: i.name, name: p.name, weight: i.weight * p.weight })
            })
        })

        this.finalArray = []
        this.instrumentSongPartOrderArray.map((sp, i) => {

            let multiplier = 5 - 1

            this.instrumentSongPartOrderKindArray.map((spk) => {
                if (spk.part === sp.name) {
                    this.finalArray.push({ part: spk.part, name: spk.name, weight: Math.round(multiplier * spk.weight * Math.random()) })
                }
            })

        })
        this.finalArray = this.finalArray.sort((a, b) => b.weight - a.weight)

        //console.log(this.finalArray)
    }

    calculateExcitement = (e) => {

        let iN = this.generateInstrumentNumber(e)
        let pN = this.generatePartNumber(e)

        let totalInstruments = []
        let instruments = []

        while (totalInstruments.length < iN) {

            this.finalArray.map(({ part, name }) => {

                let alreadyPart = instruments.filter((i) => i.part === part).length > 0
                let alreadyInstrument = totalInstruments.filter((i) => i.name === name).length > 0

                if (!alreadyPart && !alreadyInstrument && instruments.length < pN ) {
                    instruments.push( {part, name} )
                }
            })

            if(totalInstruments.length + instruments.length < iN) {
                totalInstruments = totalInstruments.concat(instruments) 
            } else {
                instruments = instruments.slice(0, iN - totalInstruments.length)
                totalInstruments = totalInstruments.concat(instruments) 
            }

            instruments = []
        }

        return totalInstruments

    }

    generateInstrumentNumber = (e) => {
        /*
        excitement | returns how many instruments
        1   |   6
        2   |   7
        3   |   7
        4   |   7
        5   |   8
        6   |   8
        7   |   8
        8   |   9
        9   |   9
        10  |   9
        */
        return Math.floor( ((e - 2) / 3) + 7 )
    }

    generatePartNumber = (e) => {
        /*
        excitement | returns how many parts
        1   |   2
        2   |   2
        3   |   3
        4   |   3
        5   |   4
        6   |   4
        7   |   5
        8   |   5
        9   |   5
        10  |   5
        */
        return random.bound(Math.floor(((e - 1) / 2) + 2), 2, 5)
    }
}