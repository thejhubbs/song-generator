export default class InstrumentOption {
    constructor(settings) {
        this.name = settings.name
        this.part = settings.part
        this.kind = settings.kind

        this.outputInstrument = settings.instrument

        this.volume = 1
        this.filter = [0, 0, 0]
        this.fx = []

        this.noteStyle = settings.noteStyle
        this.chordStyle = settings.chordStyle
        this.beatStyle = settings.beatStyle

        this.shortcut = settings.shortcut

        this.noteArray = settings.noteArray
    }
}