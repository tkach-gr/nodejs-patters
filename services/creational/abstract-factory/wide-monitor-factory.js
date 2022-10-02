import {WideHdMonitor} from "./wide-hd-monitor.js";
import {WideUltraHdMonitor} from "./wide-ultra-hd-monitor.js";

export class WideMonitorFactory {
    createHdMonitor() {
        return new WideHdMonitor()
    }

    createUltraHdMonitor() {
        return new WideUltraHdMonitor()
    }
}