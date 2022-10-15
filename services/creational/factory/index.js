import {CarFactory} from "./car-factory.js";
import {BicycleFactory} from "./bicycle-factory.js";

export class FactoryService {
    getEstimateForCar(distanceInKilometers) {
        const factory = new CarFactory()
        const vehicle = factory.create()
        return vehicle.estimateTime(distanceInKilometers)
    }

    getEstimateForBicycle(distanceInKilometers) {
        const factory = new BicycleFactory()
        const vehicle = factory.create()
        return vehicle.estimateTime(distanceInKilometers)
    }
}