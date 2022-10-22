import {TrafficLightState} from "./traffic-light-state.js";

export class YellowLightState extends TrafficLightState {
    constructor(context) {
        super(context)
    }

    getStateInfo() {
        return `just wait few seconds`
    }

    makeAction() {
        this.context.setState('green')
    }
}