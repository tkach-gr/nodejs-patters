import {Editor} from "./editor.js";
import {HistoryManager} from "./history-manager.js";

export class MementoService {
    constructor() {
        this.editor = new Editor()
        this.historyManager = new HistoryManager(this.editor)
    }

    getState() {
        return this.editor.getState()
    }

    addWord(word) {
        this.historyManager.backup()
        this.editor.addWord(word)
    }

    undo() {
        this.historyManager.undo()
    }
}