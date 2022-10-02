import {Computer} from "./computer.js";

export class ComputerBuilder {
    instance = new Computer()

    addProcessor(processor) {
        this.instance.processor = processor
        return this
    }

    addRam(ram) {
        this.instance.ram = ram
        return this
    }

    addDvdDrive(dvdDrive) {
        this.instance.dvdDrive = dvdDrive
        return this
    }

    addBluetooth(bluetooth) {
        this.instance.bluetooth = bluetooth
        return this
    }

    getResult() {
        const result = this.instance

        this.reset()

        return result
    }

    reset() {
        this.instance = new Computer()
    }
}