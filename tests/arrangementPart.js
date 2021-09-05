
export default (testSong) => {
    /* Tests */
    let arrangementPartTotalTests = 1

    // TEST 1
    // Check an arrangementPart
    console.log(`------Checking ArrangementPart 1/${arrangementPartTotalTests}`)
    let testArrangementPart = testSong.songParts[0].arrangements[0]

    console.assert(
        testArrangementPart.beatPattern.constructor.name === "BeatPattern",
        {
            expected: "BeatPattern",
            actual: testArrangementPart.beatPattern.constructor.name,
            message: "ArrangementPart.BeatPattern was not created correctly."
        }
    )

    console.assert(
        testArrangementPart.instrument.constructor.name === "Instrument",
        {
            expected: "Instrument",
            actual: testArrangementPart.instrument.constructor.name,
            message: "ArrangementPart.Instrument was not created correctly."
        }
    )


    console.log(`------Completed ArrangementPart 1/${arrangementPartTotalTests}`)
}
