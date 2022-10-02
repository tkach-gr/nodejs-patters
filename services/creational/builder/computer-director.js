export class ComputerDirector {
    constructor(builder) {
        this.builder = builder
    }

    buildOldComputer() {
        return this.builder
            .addProcessor('celeron')
            .addRam('1GB')
            .addDvdDrive('common dvd drive')
            .getResult()
    }

    buildModernComputer() {
        return this.builder
            .addProcessor('intel i5')
            .addRam('8GB')
            .getResult()
    }

    buildProComputer() {
        return this.builder
            .addProcessor('intel i7')
            .addRam('16GB')
            .addBluetooth('Bluetooth 5.2')
            .getResult()
    }
}