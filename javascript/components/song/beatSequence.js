import random from "../../settings/random.js"

export default class BeatSequence {
    constructor({ beatPattern }) {
        this.beats = this.generateBeats(beatPattern)
    }

    generateBeats = (beatPattern) => {

        let firstBeat = beatPattern.clone()

        let secondBeat = beatPattern.clone()
        secondBeat.randomizeBeat()

        let thirdBeat = beatPattern.clone()
        thirdBeat.randomizeBeat()

        let fourthBeat = beatPattern.clone()
        fourthBeat.randomizeBeat()

        let beatChoices = [firstBeat, secondBeat, thirdBeat, fourthBeat]

        let c1 = 0
        let c2 = 1
        let c3 = 2
        let c4 = 3

        switch (beatPattern.beatStyle) {
            case 'melody':
            case 'offbeatmelody':
                c2 = random.getRandomValueFromMap([c1, 1])
                c3 = random.getRandomValueFromMap([c1, c2, 1, 2])
                c4 = random.getRandomValueFromMap([c2, c3, 1, 2, 3])
                let c5 = random.getRandomValueFromMap([c4, 3])
                return [
                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c3],
                    beatChoices[c4],

                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c3],
                    beatChoices[c5],
                ]
            case 'beatmelody':
            case 'offbeatmelody':
                c2 = random.getRandomValueFromMap([c1, 1])
                c3 = random.getRandomValueFromMap([c1, c2, 1, 2])
                c4 = random.getRandomValueFromMap([c2, c3, 1, 2, 3])
                return [
                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c1],
                    beatChoices[c3],

                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c1],
                    beatChoices[c4],
                ]

            case "beat":
                c2 = random.getRandomValueFromMap([c1, c1, 1])
                c3 = random.getRandomValueFromMap([c2, c2, 0, 1, 2])
                c4 = random.getRandomValueFromMap([c3, c3, 1, 2, 3])
                return [
                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c1],
                    beatChoices[c3],

                    beatChoices[c1],
                    beatChoices[c2],
                    beatChoices[c1],
                    beatChoices[c4],
                ]
            case "hardbeat":
            default:
                return [
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                    beatChoices[c1],
                ]
        }


        // return [

        //     beatPattern.cloneAlter(2),
        //     secondBeat.cloneAlter(3), 
        //     thirdBeat.cloneAlter(4), 
        //     fourthBeat.cloneAlter(5),

        //     beatPattern.cloneAlter(3),
        //     secondBeat.cloneAlter(4), 
        //     thirdBeat.cloneAlter(5), 
        //     fourthBeat.cloneAlter(6),

        // ]
    }

}
