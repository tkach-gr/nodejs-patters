import {Lightning} from "./lightning.js";

export class LightningAdapter {
    constructor() {
        this.lightning = new Lightning()
    }

    chargeByUsb() {
        return this.lightning.chargeByLightning()
    }
}