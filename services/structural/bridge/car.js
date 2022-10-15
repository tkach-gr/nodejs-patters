import {TransportRealization} from "./transport-realization.js";

export class Car extends TransportRealization {
    constructor() {
        super()

        this.speed = 0
        this.isLightsTurnedOn = false
    }

    getSpeed() {
        return this.speed
    }

    setSpeedLevel(value) {
        switch (value) {
            case 0:
                this.speed = 0
                break
            case 1:
                this.speed = 20
                break
            case 2:
                this.speed = 40
                break
            case 3:
                this.speed = 70
                break
            case 4:
                this.speed = 100
                break
            default:
                this.speed = 140
                break
        }
    }

    getLightsMode() {
        return this.isLightsTurnedOn
    }

    setLightsMode(value) {
        this.isLightsTurnedOn = value
    }
}