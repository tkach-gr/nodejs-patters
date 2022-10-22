import {TrafficLightState} from "./traffic-light-state.js";

export class RedLightState extends TrafficLightState {
    constructor(context) {
        super(context)
    }

    getStateInfo() {
        return `can't walk across`
    }

    makeAction() {
        this.context.setState('yellow')
    }
}