import test from '../javascript/settings/test.js'

import Song from '../javascript/components/song/song.js'
import MoodChip from '../javascript/components/moodChip.js'

import {getRandomGenreInstanceFromKind} from '../javascript/files/genres/genreList.js'

export default () => {
    /* Tests */
    let songTotalTests = 2

    // TEST 1
    // Create a song
    console.log(`Checking Song 1/${songTotalTests}`)

    let songTestgGenre = getRandomGenreInstanceFromKind('rapbeat')

    let songTestMoodChip = new MoodChip()
    let testSong = new Song(1, songTestgGenre, songTestMoodChip)

    console.assert(testSong.key === 1, { expected: 1, actual: testSong.key, message: "Song.Key is not as expected." })
    console.assert(testSong.mode === 3, { expected: 3, actual: testSong.mode, message: "Song.Mode is not as expected." })

    console.assert(
        test.compareArray(testSong.scaleNotes, ["C#", "D", "E", "F#", "G#", "A", "B"]),
        {
            expected: ["C#", "D", "E", "F#", "G#", "A", "B"], actual: testSong.scaleNotes,
            message: "Song.ScaleNotes is not as expected."
        }
    )

    console.assert(
        test.compareArrayOfObjects(testSong.scaleChords, [
            { name: "m", note: 3 },
            { name: "", note: 4 },
            { name: "", note: 5 },
            { name: "m", note: 6 },
            { name: "dim", note: 7 },
            { name: "", note: 1 },
            { name: "m", note: 2 },
        ]),
        {
            expected: [
                { name: "m", note: 3 },
                { name: "", note: 4 },
                { name: "", note: 5 },
                { name: "m", note: 6 },
                { name: "dim", note: 7 },
                { name: "", note: 1 },
                { name: "m", note: 2 },
            ], actual: testSong.scaleChords,
            message: "Song.ScaleChords is not as expected."
        }
    )

    console.log(`Completed Song 1/${songTotalTests}`)

    // TEST 2
    // Create a song with different key/mode
    console.log(`Checking Song 2/${songTotalTests}`)

    testSong = new Song(4, songTestgGenre, songTestMoodChip)

    console.assert(testSong.key === 4, { expected: 1, actual: testSong.key, message: "Song.Key is not as expected." })
    console.assert(testSong.mode === 3, { expected: 1, actual: testSong.mode, message: "Song.Mode is not as expected." })

    console.assert(
        test.compareArray(testSong.scaleNotes, ["F#", "G", "A", "B", "C#", "D", "E"]),
        {
            expected: ["F#", "G", "A", "B", "C#", "D", "E"], actual: testSong.scaleNotes,
            message: "Song.ScaleNotes is not as expected."
        }
    )

    console.assert(
        test.compareArrayOfObjects(testSong.scaleChords, [
            { name: "m", note: 3 },
            { name: "", note: 4 },
            { name: "", note: 5 },
            { name: "m", note: 6 },
            { name: "dim", note: 7 },
            { name: "", note: 1 },
            { name: "m", note: 2 },
        ]),
        {
            expected: [
                { name: "m", note: 3 },
                { name: "", note: 4 },
                { name: "", note: 5 },
                { name: "m", note: 6 },
                { name: "dim", note: 7 },
                { name: "", note: 1 },
                { name: "m", note: 2 },
            ], actual: testSong.scaleChords,
            message: "Song.ScaleChords is not as expected."
        }
    )

    console.log(`Completed Song 2/${songTotalTests}`)

    // document.getElementById('test').innerHTML = testSong.print()
    testSong.play()

    return testSong

}