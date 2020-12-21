class Board {
    constructor() {
        this.instruments = {}

        instrumentList.map( (i) => {
            this.instruments[i.name] = new BoardControl(i) 
            
        })

        document.onkeypress = function(evt) {
            evt = evt || window.event;
            var charCode = evt.keyCode || evt.which;
            var charStr = String.fromCharCode(charCode) 

            let instrument = null
            instrumentList.map( (i) =>  i.shortcut === charStr ? instrument = i : null)

            if( instrument ) {
                board.toggleInstrumentVolume( instrument.name )
            }
        };

    }


    printBoard() {
        let instrumentControlDiv = "<div class='instrumentBoardBlock'>"

        boardElement.innerHTML = instrumentControlDiv + 
        Object.entries(this.instruments).map( (pair) => 
            pair[1].instrumentSetting.shortcut  + "<br />" + pair[1].volumeKnob( pair[0] ) + "<br />" + pair[0]

        ) .join(  "</div>" + instrumentControlDiv) + "</div>"
    }

    toggleInstrumentVolume(instrument) {
        this.instruments[instrument].toggleVolume()
        this.printBoard()
    }

    changeInstrumentVolume(instrument, amount) {
        this.instruments[instrument].changeVolume(amount)
        this.printBoard()
    }

    play(instrument) {
        return !(this.instruments[instrument].master === false)
    }

}


class BoardControl {
    constructor(instrumentSetting) {
        this.instrumentSetting = instrumentSetting
        this.synth = instrumentSetting.instrument
        this.master = instrumentSetting.volume !== undefined ? instrumentSetting.master : false
        this.filter = instrumentSetting.filter !== undefined ? instrumentSetting.filter : false
        this.fx1 = instrumentSetting.fx1 !== undefined ? instrumentSetting.fx1 : false
        this.fx2 = instrumentSetting.fx2 !== undefined ? instrumentSetting.fx2 : false
        this.fx3 = instrumentSetting.fx3 !== undefined ? instrumentSetting.fx3 : false
        this.fx4 = instrumentSetting.fx4 !== undefined ? instrumentSetting.fx4 : false

        this.toggleVolume(); this.toggleVolume();

    }

    volumeKnob(name) {
        let checkbox = "<input onchange='toggleBoardControl(this)' data-name='" + name + "' type='checkbox' " + (this.master === false ? '' : 'checked') + " >" 
        if(this.master !== false) { checkbox += "<div><span>" + this.master + "</span> <input  onchange='changeVolumeControl(this)' data-name='" + name + "'  type='range' class='slider' min='-50' max='50' value=" + this.master + " /></div>" }
        return checkbox 
    }

    toggleVolume() {
        if(this.master === false) { this.master = this.instrumentSetting.volume; this.synth.synth.volume.value = this.master; }
        else { this.master = false; this.synth.synth.volume.value = -500; }
    }


    changeVolume(amount) {
        this.master = amount
        this.instrumentSetting.volume = amount
        this.synth.synth.volume.value = this.master;
    }

}

function toggleBoardControl(event) {
    board.toggleInstrumentVolume(event.getAttribute('data-name'))
}

function changeVolumeControl(event) {
    board.changeInstrumentVolume(event.getAttribute('data-name'), event.value)
}