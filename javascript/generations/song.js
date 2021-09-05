const chorusGeneration = (chorus, chorusSettings) => {
    chorusSettings.scale('resonance', 3, chorusSettings.resonance)
    chorusSettings.scale('repetition', 3, chorusSettings.resonance)
    chorus.regenerate(chorusSettings)
}

const verseGeneration = (verse, verseSettings) => {
    verseSettings.scale('tension', 2, verseSettings.tension)
    verseSettings.scale('excitement', -6, verseSettings.excitement)
    verse.regenerate(verseSettings)
}

const versePostGeneration = (v) => {
    fadeOutInstruments(v)
    return v
}

const bridgeGeneration = (bridge, bridgeSettings) => {
    bridgeSettings.scale('tension', 3, bridgeSettings.excitement)
    bridgeSettings.scale('excitement', -8, bridgeSettings.excitement)
    bridge.regenerate(bridgeSettings)
}


const bridegPostGeneration = (b) => {
    fadeOutInstruments(b)
    return b
}

const preChorusGeneration = (preChorus) => {
    preChorus.regenerate()
    return preChorus
}

const preChorusPostGeneration = (preChorus) => {
    fadeOutInstruments(preChorus)

    return preChorus
}

const secondChorusGeneration = (c) => {
    return c.cloneAlter(4)
}

const thirdChorusGeneration = (c) => {
    return c.cloneAlter(5)
}

const introVerseGeneration = (v) => {
    let v_intro = v.cloneAlter(-5)
    fadeOutInstruments(v_intro)

    return v_intro
}

const secondVerseGeneration = (v) => {
    let v2 = v.cloneAlter(2)
    fadeOutInstruments(v2)
    return v2
}

const thirdVerseGeneration = (v) => {
    return v.cloneAlter(4)
}

const fadeOutInstruments = (sp) => {

    let chance = sp.moodChip.excitement / 8

    let removeNames = []

    sp.arrangements.forEach((a) => {
        if (Math.random() > chance) {
            removeNames.push(a.name)
        }
    })


    let new_arrange = sp.arrangements.filter((ap) => {
        return !removeNames.includes(ap.instrument.name)
    })
    sp.arrangements = new_arrange

}

const songStructureVariation = (song) => {
    let has_prechorus = song.moodChip.weightFieldsRandomTrueFalse(['tension', 'repetition', 'resonance'])
    let has_chorus_intro = song.moodChip.compareFieldsRandomTrueFalse(['resonance', 'repetition', 'excitement'], ['tension', 'tension', 'tension'])
    let has_verse_intro = song.moodChip.compareFieldsRandomTrueFalse(['tension', 'repetition'], ['resonance', 'excitement'])
    let has_double_second_chorus = song.moodChip.compareFieldsRandomTrueFalse(['resonance', 'repetition'], ['tension', 'tension'])
    let has_bridge = song.moodChip.compareFieldsRandomTrueFalse(['resonance', 'excitement', 'tension'], ['repetition', 'repetition'])
    let has_double_last_chorus = song.moodChip.compareFieldsRandomTrueFalse(['resonance', 'repetition'], ['tension', 'tension'])

    return {
        has_prechorus,
        has_chorus_intro,
        has_verse_intro,
        has_double_second_chorus,
        has_bridge,
        has_double_last_chorus,
    }
}

const alterChorusForBridge = (chorusSecond) => {
    let lastChord = chorusSecond.getChord(1, 4)
    lastChord.alterFuncFlavor(1, 1)
}

export default {
    chorusGeneration,
    verseGeneration,
    versePostGeneration,
    bridgeGeneration,
    bridegPostGeneration,
    preChorusGeneration,
    preChorusPostGeneration,
    secondChorusGeneration,
    thirdChorusGeneration,
    introVerseGeneration,
    secondVerseGeneration,
    thirdVerseGeneration,
    fadeOutInstruments,
    songStructureVariation,
    alterChorusForBridge
}