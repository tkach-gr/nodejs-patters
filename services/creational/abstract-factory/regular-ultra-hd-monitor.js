import {UltraHdMonitor} from "./ultra-hd-monitor.js";

export class RegularUltraHdMonitor extends UltraHdMonitor{
    constructor() {
        super()

        this.resolution = '3840×2160'
    }

    getResolution() {
        return this.resolution
    }
}