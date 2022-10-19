import {EditorSnapshot} from "./editor-snapshot.js";

export class Editor {
    constructor() {
        this.words = []
    }

    addWord(word) {
        this.words.push(word)
    }

    getState() {
        return this.words
    }

    getSnapshot() {
        const state = [...this.words]
        return new EditorSnapshot(state)
    }

    restore(snapshot) {
        this.words = snapshot.getState()
    }
}