/* Tests */
let beatPatternTotalTests = 1

//songTestMoodChip, testSong

// TEST 1
// Check a beatPattern
console.log(`------------Checking BeatPattern 1/${beatPatternTotalTests}`)
let testBeatPattern = testSongPart.beatPattern

console.assert(
    testBeatPattern.moodChip.constructor.name === "MoodChip",
    {
        expected: "MoodChip",
        actual: testBeatPattern.moodChip.constructor.name,
        message: "Progression.MoodChip was not created correctly."
    }
)

console.assert(
    Array.isArray(testBeatPattern.mainBeat) ,
    {
        expected: "Progression",
        actual: typeof testBeatPattern.mainBeat,
        message: "BeatPattern.MainBeat was not created correctly."
    }
)

console.assert(
    testBeatPattern.mainBeat[0].position >= 0 && Number.parseInt(testBeatPattern.mainBeat[0].position) === testBeatPattern.mainBeat[0].position,
    {
        expected: "Number >= 0",
        actual: testBeatPattern.mainBeat[0].position,
        message: "BeatPattern.MainBeat was not created correctly."
    }
)

console.assert(
    testBeatPattern.mainBeat[0].weight >= 0 && Number.parseInt(testBeatPattern.mainBeat[0].weight) === testBeatPattern.mainBeat[0].weight,
    {
        expected: "Number >= 0",
        actual: testBeatPattern.mainBeat[0].weight,
        message: "BeatPattern.MainBeat was not created correctly."
    }
)


console.log(`------------Completed BeatPattern 1/${beatPatternTotalTests}`)
