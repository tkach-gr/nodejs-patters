import {Car} from "./car.js";
import {Bicycle} from "./bicycle.js";

export class VehicleFactory {
    create(vehicleType) {
        if (vehicleType === 'car') {
            return new Car()
        } else if (vehicleType === 'bicycle') {
            return new Bicycle()
        }

        throw new Error('invalid vehicle type')
    }
}