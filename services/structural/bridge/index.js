import {Airplane} from "./airplane.js";
import {Transport} from "./transport.js";
import {Car} from "./car.js";

export class BridgeService {
    constructor() {
        const airplaneRealization = new Airplane()
        const airplane = new Transport(airplaneRealization)

        const carRealization = new Car()
        const car = new Transport(carRealization)

        this.transports = {
            airplane,
            car
        }

    }

    getState(transportName) {
        const transport = this.getTransport(transportName)
        return transport.getState()
    }

    increaseSpeed(transportName) {
        const transport = this.getTransport(transportName)
        transport.increaseSpeed()
        return true
    }

    decreaseSpeed(transportName) {
        const transport = this.getTransport(transportName)
        transport.decreaseSpeed()
        return true
    }

    turnOnLights(transportName) {
        const transport = this.getTransport(transportName)
        transport.turnOnLights()
        return true
    }

    turnOffLights(transportName) {
        const transport = this.getTransport(transportName)
        transport.turnOffLights()
        return true
    }

    getTransport(name) {
        const transport = this.transports[name]
        if (!transport) {
            throw new Error('transport is not found')
        }

        return transport
    }
}