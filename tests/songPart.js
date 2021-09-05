
export default (testSong) => {
    /* Tests */
    let songPartTotalTests = 2

    //songTestMoodChip, testSong

    // TEST 1
    // Create a song
    console.log(`---Checking SongPart 1/${songPartTotalTests}`)
    let testSongPart = testSong.songParts[0]

    console.assert(['verse', 'chorus'].includes(testSongPart.kind), { expected: "Should be 'verse' or 'chorus'", actual: testSongPart.kind, message: "SongPart.Kind is not as expected." })

    console.assert(
        testSongPart.beatPattern.constructor.name === "BeatPattern",
        {
            expected: "BeatPattern",
            actual: testSongPart.beatPattern.constructor.name,
            message: "SongPart.BeatPattern was not created correctly."
        }
    )

    console.assert(
        testSongPart.coreProgression.constructor.name === "Progression",
        {
            expected: "Progression",
            actual: testSongPart.coreProgression.constructor.name,
            message: "SongPart.CoreProgression was not created correctly."
        }
    )

    console.assert(
        testSongPart.moodChip.constructor.name === "MoodChip",
        {
            expected: "MoodChip",
            actual: testSongPart.moodChip.constructor.name,
            message: "SongPart.MoodChip was not created correctly."
        }
    )

    console.assert(
        Array.isArray(testSongPart.arrangements) && testSongPart.arrangements[0].constructor.name === "ArrangementPart",
        {
            expected: "ArrangementPart",
            actual: testSongPart.arrangements[0].constructor.name,
            message: "SongPart.ArrangementParts was not created correctly."
        }
    )

    console.assert(
        Array.isArray(testSongPart.progressions) && testSongPart.progressions[0].constructor.name === "Progression",
        {
            expected: "Progression",
            actual: testSongPart.progressions[0].constructor.name,
            message: "SongPart.Progressions was not created correctly."
        }
    )

    console.log(`---Completed SongPart 1/${songPartTotalTests}`)
}
