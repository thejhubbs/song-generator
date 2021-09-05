import songTest from './song.js'
import songPartTest from './songPart.js'
import arrangementTest from './arrangementPart.js'
import beatPatternTest from './beatPattern.js'
import progressionTest from './progression.js'

import chordTest from './chord.js'
import moodChipTest from './moodChip.js'

let song = songTest()
songPartTest(song)
arrangementTest(song)
beatPatternTest(song)
progressionTest(song)

chordTest()
moodChipTest(song)