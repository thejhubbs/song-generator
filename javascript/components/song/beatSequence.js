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
                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c3].clone(),
                    beatChoices[c4].clone(),

                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c3].clone(),
                    beatChoices[c5].clone(),
                ]
            case 'beatmelody':
            case 'offbeatmelody':
                c2 = random.getRandomValueFromMap([c1, 1])
                c3 = random.getRandomValueFromMap([c1, c2, 1, 2])
                c4 = random.getRandomValueFromMap([c2, c3, 1, 2, 3])
                return [
                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c3].clone(),

                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c4].clone(),
                ]

            case "beat":
                c2 = random.getRandomValueFromMap([c1, c1, 1])
                c3 = random.getRandomValueFromMap([c2, c2, 0, 1, 2])
                c4 = random.getRandomValueFromMap([c3, c3, 1, 2, 3])
                return [
                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c3].clone(),

                    beatChoices[c1].clone(),
                    beatChoices[c2].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c4].clone(),
                ]
            case "hardbeat":
            default:
                return [
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                    beatChoices[c1].clone(),
                ]
        }

    }

}
