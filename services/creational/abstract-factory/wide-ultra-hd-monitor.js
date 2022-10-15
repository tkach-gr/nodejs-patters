import {UltraHdMonitor} from "./ultra-hd-monitor.js";

export class WideUltraHdMonitor extends UltraHdMonitor {
    constructor() {
        super()

        this.resolution = '5120×2160'
    }

    getResolution() {
        return this.resolution
    }
}