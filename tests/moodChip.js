export default (testSong) => {
    /* Tests */
    let moodChipTotalTests = 1

    // TEST 1
    // Check a moodChip
    console.log(`Checking MoodChip 1/${moodChipTotalTests}`)
    let testMoodChip = testSong.moodChip

    console.assert(
        testMoodChip.resonance >= 0 && Number.parseInt(testMoodChip.resonance) === testMoodChip.resonance,
        {
            expected: "Number >= 0",
            actual: testMoodChip.resonance,
            message: "MoodChip.resonance was not created correctly."
        }
    )
    console.assert(
        testMoodChip.tension >= 0 && Number.parseInt(testMoodChip.tension) === testMoodChip.tension,
        {
            expected: "Number >= 0",
            actual: testMoodChip.tension,
            message: "MoodChip.tension was not created correctly."
        }
    )
    console.assert(
        testMoodChip.repetition >= 0 && Number.parseInt(testMoodChip.repetition) === testMoodChip.repetition,
        {
            expected: "Number >= 0",
            actual: testMoodChip.repetition,
            message: "MoodChip.repetition was not created correctly."
        }
    )
    console.assert(
        testMoodChip.spread >= 0 && Number.parseInt(testMoodChip.spread) === testMoodChip.spread,
        {
            expected: "Number >= 0",
            actual: testMoodChip.spread,
            message: "MoodChip.spread was not created correctly."
        }
    )
    console.assert(
        testMoodChip.excitement >= 0 && Number.parseInt(testMoodChip.excitement) === testMoodChip.excitement,
        {
            expected: "Number >= 0",
            actual: testMoodChip.excitement,
            message: "MoodChip.excitement was not created correctly."
        }
    )

    console.log(`Completed MoodChip 1/${moodChipTotalTests}`)
}