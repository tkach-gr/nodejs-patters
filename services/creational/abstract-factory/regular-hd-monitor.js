import {HdMonitor} from "./hd-monitor.js";

export class RegularHdMonitor extends HdMonitor {
    constructor() {
        super()

        this.resolution = '1920×1080'
    }

    getResolution() {
        return this.resolution
    }
}