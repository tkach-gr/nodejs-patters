import {RedLightState} from "./red-light-state.js";
import {YellowLightState} from "./yellow-light-state.js";
import {GreenLightState} from "./green-light-state.js";

export class TrafficLight {
    constructor() {
        this.states = {
            red: new RedLightState(this),
            yellow: new YellowLightState(this),
            green: new GreenLightState(this),
        }

        this.currentState = this.states['red']
    }

    getStateInfo() {
        return this.currentState.getStateInfo()
    }

    makeAction() {
        this.currentState.makeAction()
    }

    setState(name) {
        this.currentState = this.states[name]
    }
}