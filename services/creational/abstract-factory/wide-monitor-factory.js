import {WideHdMonitor} from "./wide-hd-monitor.js";
import {WideUltraHdMonitor} from "./wide-ultra-hd-monitor.js";
import {MonitorFactory} from "./monitor-factory.js";

export class WideMonitorFactory extends MonitorFactory {
    createHdMonitor() {
        return new WideHdMonitor()
    }

    createUltraHdMonitor() {
        return new WideUltraHdMonitor()
    }
}