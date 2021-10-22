import defaultInstrumentWeightValues from '../../settings/defaultInstrumentWeight.js'

export default class InstrumentWeight {
    constructor() {
        this.instrumentSongParts = []

        defaultInstrumentWeightValues().map((song_part) => {
            this.instrumentSongParts.push(new InstrumentWeightSongPart(song_part))
        })

    }

    //changes the right field
    changeWeight(song_part, song_part_name, newValue) {
        this.instrumentSongParts.map((sp) => {
            if (sp.name === song_part) {
                if (song_part_name) {
                    let spk = sp.findKindByName(song_part_name)
                    if (spk.name) {
                        spk.changeWeight(newValue)
                    }
                } else {
                    sp.changeWeight(newValue)
                }
            }
        })
    }

    replaceInstrument(song_part, song_part_name, newValue) {
        this.instrumentSongParts.map((sp) => {
            if (sp.name === song_part) {
                if (song_part_name) {
                    let spk = sp.findKindByName(song_part_name)
                    if (spk.name) {
                        spk.changeName(newValue)
                    }
                } 
            }
        })
    }

    removeInstrument(song_part, song_part_name) {
        this.instrumentSongParts.map((sp) => {
            if (sp.name === song_part) {
                if (song_part_name) {
                    let spk = sp.findKindByName(song_part_name)
                    if (spk.name) {
                        sp.remove(spk)
                    }
                } else {
                    this.instrumentSongParts = this.instrumentSongParts.filter( (isp) => isp.name != sp.name)
                }
            }
        })
    }

    addInstrumentChoice = (song_part, song_part_kind, name, weight, choiceWeight) => {
        let songPart = {}

        this.instrumentSongParts.map((sp) => sp.name === song_part ? songPart = sp : "")

        if (songPart.name) {
            songPart.addInstrumentChoice(song_part_kind, name, weight, choiceWeight)

        } else {
            console.log("ERROR in instrumentWeight- no songPart.name", song_part)
        }
    }

    getInstruments = () => {
        let ret = []
        this.instrumentSongParts.map( (isp) => 
            isp.parts.map( (spk) => 
                ret.push(spk)
            ) 
        ) 
        return ret
    }

    getInstrumentNames = () => {
        let ret = []
        this.instrumentSongParts.map( (isp) => 
            isp.parts.map( (spk) => 
                ret.push(spk.name)
            ) 
        ) 
        return ret
    }

    //An instrument list can have InstrumentWeightSongPartKinds of the same kind. If there is, narrow them down to one of each.
    chooseInstrumentList = () => {
        this.instrumentSongParts.map((song_part) => {

            let uniqueSongPartNames = song_part.parts.filter((x, i, a) => a.indexOf(x) == i).map((i) => i.kind)

            uniqueSongPartNames.map((unique_song_part) => {
                let song_part_options = song_part.parts.filter((spk) => spk.kind === unique_song_part)

                let song_part_option = {}
                if (song_part_options.length > 1) {
                    //randomize which one is picked
                    let random = Math.floor(Math.random() * song_part_options.length)
                    random = normalizeAndGetRandomFromMap(song_part_options.map((spo) => spo.weight))
                    song_part_option = song_part_options[random]
                    song_part.parts = song_part.parts.filter((sp) => (sp.kind !== song_part_option.kind) || (sp.kind === song_part_option.kind && sp.name !== song_part_option.name))
                } else {
                    song_part_option = song_part_options[0]
                }
            })
        })
    }
}

class InstrumentWeightSongPart {
    constructor(song_part) {
        if (typeof song_part.weight !== 'number' || song_part.weight <= 0) {
            console.log("ERROR in component.instrumentWeight.InstrumentWeightSongPart- variable song_part.weight should be a number >= 1", typeof song_part.weight, song_part.weight)
            song_part.weight = 1
        }

        this.weight = song_part.weight,
        this.name = song_part.name
        this.parts = []

        song_part.kinds.map((kind) => {
            this.parts.push(new InstrumentWeightSongPartKind(kind))
        })

    }

    findKindByName = (song_part_name) => {
        let res = {}
        this.parts.map((spk) => {
            if (spk.name === song_part_name) {
                res = spk
            }
        })
        return res
    }

    remove = (spk) => {
        this.parts = this.parts.filter( (p) => p.kind !== spk.kind)
    }

    changeWeight = (weight) => {
        this.weight = weight
    }

    addInstrumentChoice = (kind, name, weight, choiceWeight) => {
        this.parts.push(new InstrumentWeightSongPartKind({ kind, name, weight, choiceWeight }))
    }
}

class InstrumentWeightSongPartKind {
    constructor(info) {
        if (typeof info.weight !== 'number' || info.weight <= 0) {
            console.log("ERROR in component.instrumentWeight.InstrumentWeightSongPartKind- variable info.weight should be a number >= 1", typeof info.weight, info.weight, info)
            info.weight = 1
        }

        this.weight = info.weight
        this.kind = info.kind
        this.name = info.name
        this.choiceWeight = info.choiceWeight
    }

    changeWeight = (weight) => {
        this.weight = weight
    }
    
    changeName = (name) => {
        this.name = name
    }

}