const comp = new Tone.Compressor(-30, 1).toDestination()

instrumentList = [
    //basicKick(),
    danceKick(),
    //punchKick(),

    basicSnare(),
    basicToms(),
    basicHat(),

    basicBass(),

    basicHarmony(),
    //synthHarmony(),
    basicArpeggio(),

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

let totalInstrumentList = instrumentList.map( (i) => new InstrumentOption(i) )

const findInstrumentByName = (instrument_name) => {
    let instrument = totalInstrumentList.filter( (i) => i.name === instrument_name)[0]
    if(!instrument) { console.log("ERROR in instrumentList, no instrument", instrument_name)} 
    return instrument
}

//console.log(totalInstrumentList)


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
