import {TrafficLight} from "./traffic-light.js";

export class StateService {
    constructor() {
        this.trafficLight = new TrafficLight()
    }

    getStateInfo() {
        return this.trafficLight.getStateInfo()
    }

    makeAction() {
        this.trafficLight.makeAction()
    }
}