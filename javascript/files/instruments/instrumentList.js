
import basicKick from "./basicKick.js"
import danceKick from "./punchKick.js"
import punchKick from "./danceKick.js"

import basicSnare from "./basicHat.js"
import basicToms from "./basicSnare.js"
import basicHat from "./basicToms.js"

import basicBass from "./basicBass.js"

import basicHarmony from "./basicHarmony.js"
import synthHarmony from "./synthHarmony.js"
import basicArpeggio from "./basicArpeggio.js"

import basicMelody from "./basicMelody.js"
import softMelody from "./softMelody.js"
import basicVox from "./basicVox.js"

import basicFx from "./basicFx.js"

import rockBass from "./rockBass.js"
import rockFx from "./rockFx.js"
import rockGtrL from "./rockGtrL.js"
import rockGtrR from "./rockGtrR.js"
import rockPiano from "./rockPiano.js"
import rockVox from "./rockVox.js"

import InstrumentOption from "../../components/instruments/instrumentOption.js"

export let instrumentList = [
    basicKick(),
    danceKick(),
    punchKick(),

    basicSnare(),
    basicToms(),
    basicHat(),

    basicBass(),

    basicHarmony(),
    synthHarmony(),
    basicArpeggio(),

    basicMelody(),
    softMelody(),
    basicVox(),

    basicFx(),

    rockBass(),
    rockGtrR(),
    rockPiano(),
    rockGtrL(),
    rockVox(),
    rockFx(),
]

export let totalInstrumentList = instrumentList.map((i) => new InstrumentOption(i))

export const findInstrumentByName = (instrument_name) => {
    let instrument = totalInstrumentList.filter((i) => i.name === instrument_name)[0]
    if (!instrument) { console.log("ERROR in instrumentList, no instrument", instrument_name) }
    return instrument
}

export default { totalInstrumentList, findInstrumentByName }


//BeatStyle-
//Beat- low spread with beatPattern
//Offbeat- low spread but shifted with beatPattern
//Melody- high spread, high randomness off beatPattern
//BeatMelody- high spread with beatPattern
//OffBeatMelody- beatMelody but shifted
//Spreadmelody- very high spread melody

//ChordStyle-
//Key- always on key
//Chord- always on chord
//Random- switch up

//NoteStyle-
//Full- hold until the next note
//Half- split the distance in two
//8n, 16n, 32n- always play that note
