import {VehicleFactory} from "./vehicle-factory.js";

export class FactoryService {
    constructor() {
        this.factory = new VehicleFactory()
    }

    getEstimateForCar(distanceInKilometers) {
        const vehicle = this.factory.create('car')
        return vehicle.estimateTime(distanceInKilometers)
    }

    getEstimateForBicycle(distanceInKilometers) {
        const vehicle = this.factory.create('bicycle')
        return vehicle.estimateTime(distanceInKilometers)
    }
}