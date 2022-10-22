import {TrafficLightState} from "./traffic-light-state.js";

export class GreenLightState extends TrafficLightState {
    constructor(context) {
        super(context)
    }

    getStateInfo() {
        return `you can go`
    }

    makeAction() {
        this.context.setState('red')
    }
}