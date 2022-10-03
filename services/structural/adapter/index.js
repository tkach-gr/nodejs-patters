import {LightningAdapter} from "./lightning-adapter.js";
import {Usb} from "./usb.js";

export class AdapterService {
    chargeByUsb() {
        const port = this.getPort('usb')
        return port.chargeByUsb()
    }

    chargeByLightning() {
        const port = this.getPort('lightning')
        return port.chargeByUsb()
    }

    getPort(port) {
        if (port === 'lightning') {
            return new LightningAdapter()
        } else if (port === 'usb') {
            return new Usb()
        }

        throw new Error('invalid port')
    }
}