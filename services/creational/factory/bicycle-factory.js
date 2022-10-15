import {Bicycle} from "./bicycle.js";
import {VehicleFactory} from "./vehicle-factory.js";

export class BicycleFactory extends VehicleFactory {
    create() {
        return new Bicycle()
    }
}