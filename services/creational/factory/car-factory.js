import {Car} from "./car.js";
import {VehicleFactory} from "./vehicle-factory.js";

export class CarFactory extends VehicleFactory {
    create() {
        return new Car()
    }
}