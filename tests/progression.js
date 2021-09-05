export default (testSong) => {
    /* Tests */
    let progressionTotalTests = 1

    // TEST 1
    // Check the progresssion
    console.log(`---------Checking Progression 1/${progressionTotalTests}`)
    let testProgression = testSong.songParts[0].coreProgression

    console.assert(
        testProgression.moodChip.constructor.name === "MoodChip",
        {
            expected: "MoodChip",
            actual: testProgression.moodChip.constructor.name,
            message: "Progression.MoodChip was not created correctly."
        }
    )

    console.assert(
        Array.isArray(testProgression.chords) && testProgression.chords[0].constructor.name === "Chord",
        {
            expected: "Chord",
            actual: testProgression.chords.constructor.name,
            message: "Progression.Chords was not created correctly."
        }
    )



    console.log(`---------Completed Progression 1/${progressionTotalTests}`)
}
