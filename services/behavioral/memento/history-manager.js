export class HistoryManager {
    constructor(editor) {
        this.editor = editor
        this.history = []
    }

    backup() {
        const backup = this.editor.getSnapshot()
        this.history.push(backup)
    }

    undo() {
        if (this.history.length === 0) {
            throw new Error('history is empty')
        }

        const lastIndex = this.history.length - 1
        const backup = this.history[lastIndex]
        this.editor.restore(backup)
        this.history.splice(lastIndex)
    }
}