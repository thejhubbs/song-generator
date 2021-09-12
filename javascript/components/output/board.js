import {findInstrumentByName} from '../../files/instruments/instrumentList.js'

export default class Board {
    constructor() {
        this.instruments = {}

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

    changeVolumeControl = (event) => {
        let boardElement = document.getElementById('board')
        this.changeInstrumentVolume(event.target.getAttribute('data-name'), event.target.value, boardElement)
    }

    toggleBoardControl = (event) => {
        let boardElement = document.getElementById('board')
        this.toggleInstrumentVolume(event.target.getAttribute('data-name'), boardElement)
    }

    printBoard() {
        let boardElement = document.getElementById('board')
        let instrumentControlDiv = "<div class='instrumentBoardBlock'>"

        boardElement.innerHTML = instrumentControlDiv + 
        Object.entries(this.instruments).map( (pair) => {
            return pair[1].instrumentSetting.shortcut  + "<br />" + pair[1].volumeKnob( pair[0] ) + "<br />" + pair[0]
        }) .join(  "</div>" + instrumentControlDiv) + "</div>"

        
        document.querySelectorAll('.board-volume-slider').forEach((vs) => vs.addEventListener('change', this.changeVolumeControl ));
        document.querySelectorAll('.board-toggle').forEach((vs) => vs.addEventListener('change', this.toggleBoardControl ));
    }

    updateAndPrint(boardElement, instruments) {
        this.instruments = {}
        instruments.getInstruments().map( (instrument, counter) => {
            this.instruments[instrument.name] = new BoardControl( findInstrumentByName(instrument.name), counter ) 
        })
        this.printBoard(boardElement)
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
    constructor(instrumentSetting, counter) {
        this.instrumentSetting = instrumentSetting
        this.synth = instrumentSetting.outputInstrument
        this.master = instrumentSetting.volume !== undefined ? instrumentSetting.master : false
        this.filter = instrumentSetting.filter !== undefined ? instrumentSetting.filter : false
        this.fx1 = instrumentSetting.fx1 !== undefined ? instrumentSetting.fx1 : false
        this.fx2 = instrumentSetting.fx2 !== undefined ? instrumentSetting.fx2 : false
        this.fx3 = instrumentSetting.fx3 !== undefined ? instrumentSetting.fx3 : false
        this.fx4 = instrumentSetting.fx4 !== undefined ? instrumentSetting.fx4 : false

        this.shortcut = counter
        
        this.toggleVolume(); 
        this.toggleVolume();

    }

    volumeKnob(name) {
        let checkbox = "<input class='board-toggle' data-name='" + name + "' type='checkbox' " + (this.master === false ? '' : 'checked') + " >" 
        if(this.master !== false) { checkbox += "<div><span>" + this.master + "</span> <input data-name='" + name + "'  type='range' class='slider board-volume-slider' min='-50' max='50' value=" + this.master + " /></div>" }
        return checkbox 
    }

    toggleVolume() {
        if(this.master === false) { this.master = this.instrumentSetting.volume; this.synth.synth.volume.value = this.master; }
        else { this.master = false; this.synth.synth.volume.value = -500; }
    }


    changeVolume(amount) {
        if(!amount) { console.log()}
        this.master = amount
        this.instrumentSetting.volume = amount
        if(this.synth) {
            if(this.synth.synth) {
                if (this.synth.synth.volume.value) {
                    this.synth.synth.volume.value = this.master;
                } else {
                    console.log("ERROR components.board.changeVolume- in synth")
                }
            } else {
                console.log("ERROR components.board.changeVolume- in synth")
            }
        } else {
            console.log("ERROR components.board.changeVolume- in synth")
        }

    }

}
