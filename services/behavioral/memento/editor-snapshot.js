export class EditorSnapshot {
    constructor(words) {
        this.words = words
    }

    getState() {
        return this.words
    }
}