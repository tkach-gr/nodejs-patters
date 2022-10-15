import {TransportRealization} from "./transport-realization.js";

export class Airplane extends TransportRealization {
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
                this.speed = 200
                break
            case 2:
                this.speed = 400
                break
            case 3:
                this.speed = 600
                break
            case 4:
                this.speed = 800
                break
            default:
                this.speed = 1000
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