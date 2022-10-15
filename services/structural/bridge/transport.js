export class Transport {
    constructor(realization) {
        this.speedLevel = 0
        this.realization = realization
    }

    increaseSpeed() {
        this.speedLevel = this.speedLevel + 1 <= 5
            ? this.speedLevel + 1
            : 5

        this.realization.setSpeedLevel(this.speedLevel)
    }

    decreaseSpeed() {
        this.speedLevel = this.speedLevel - 1 >= 0
            ? this.speedLevel - 1
            : 0

        this.realization.setSpeedLevel(this.speedLevel)
    }

    turnOnLights() {
        this.realization.setLightsMode(true)
    }

    turnOffLights() {
        this.realization.setLightsMode(false)
    }

    getState() {
        return {
            speed: this.realization.getSpeed(),
            isLightsTurnedOn: this.realization.getLightsMode()
        }
    }
}